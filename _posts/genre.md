---
title: "Ssuis_Zoonotic_Predict：基于机器学习的猪链球菌人畜共患风险预测工具"
excerpt: "深入解析 Ssuis_Zoonotic_Predict 的技术架构——从基因存在/缺失矩阵构建、Scoary+LASSO+XGBoost多策略特征筛选，到随机森林模型训练与 StratifiedKFold 交叉验证，全面覆盖命令行工具的工程化实现细节。"
coverImage: "/assets/blog/dynamic-routing/cover.jpg"
date: "2026-05-14T08:00:00.000Z"
author:
  name: 冯新媛、yao 
  picture: "/assets/blog/authors/jj.jpeg"
ogImage:
  url: "/assets/blog/dynamic-routing/cover.jpg"
---

## 背景与概述

猪链球菌（Streptococcus suis）是一种重要的人畜共患病原体，其不同菌株的致病性和人畜共患风险差异显著。传统的风险评估依赖于实验室表型鉴定，耗时长、成本高。**Ssuis_Zoonotic_Predict** 是一套基于 Python 3.6+ 开发的开源命令行工具，利用机器学习方法从菌株的泛基因组数据出发，实现对人畜共患风险的快速、精准预测。

项目的核心技术栈为 `pandas` + `numpy` + `scikit-learn` + `XGBoost`，以 `docopt` 实现命令行交互，并通过 `setuptools` 打包为可直接安装的 Python 包。

## 一、项目工程化结构

整个项目以标准 Python 包的形式组织，入口点注册为控制台脚本 `Ssuis_Zoonotic_Predict`，用户安装后可直接在终端调用：

- **`setup.py`**：包元信息与依赖声明，指定 `console_scripts` 入口为 `core:main`
- **`core.py`**：主调度逻辑，通过 `docopt` 解析 `--type`（normal / test / add）和 `--path` 参数，分发到不同的预测流水线
- **`file_transform.py`**：数据格式转换与模型预测的核心工具模块
- **`feature_select.py`**：多策略特征筛选模块
- **`model_build.py`**：模型构建、交叉验证与持久化模块
- **`MANIFEST.in`**：声明打包时包含的 `.csv`、`.txt`、`.Rtab`、`.pkl` 等数据文件

工具跨平台兼容 Windows 与 Linux，通过 `platform.system()` 动态判断路径分隔符。

## 二、数据预处理：基因存在/缺失矩阵与特征编码

### 2.1 泛基因组数据加载

输入数据采用基因存在/缺失矩阵（gene_presence_absence.Rtab），行为基因名、列为菌株样本名（filename），矩阵值为 0/1 表示该基因在该菌株中的存在与否。`transform_data()` 将矩阵转置为“样本 × 基因”格式，使每行代表一个菌株样本，每列代表一个基因的二元特征：

```
原始格式（Gene × Sample）  →  转置格式（Sample × Gene）
        S1  S2  S3                    geneA geneB geneC
geneA    1   1   0              S1      1     1     0
geneB    1   0   1       →      S2      1     0     1
geneC    0   1   1              S3      0     1     1
```

### 2.2 One-Hot 编码与字典构建

`make_dict()` 遍历转置后的 DataFrame，将每个样本拥有的基因名收集为列表，构建 `{filename: [geneA, geneB, ...]}` 的字典结构。随后 `one_hot()` 遍历所有样本的基因并集，对每个样本生成完整的 one-hot 编码向量。当有新数据加入时，使用 `one_hot1()` 仅基于已有特征列进行编码，保证特征空间一致性。

## 三、特征筛选：Scoary + LASSO + XGBoost 三阶段降维

面对泛基因组中数千个基因特征，直接建模会引入大量噪声并导致过拟合。项目采用**三项互补的特征筛选策略**逐步降维：

### 3.1 Scoary 关联分析

`Scoary_col()` 从 Scoary 的全基因组关联分析结果中，筛选同时满足 **Worst_pairwise_comp_p < 0.05** 和 **Benjamini_H_p < 0.05** 的显著性基因，作为初步候选特征集。Scoary 专门针对细菌泛基因组设计，能有效识别与宿主表型显著关联的基因。

### 3.2 LASSO 回归筛选

`Lasso_col()` 使用带交叉验证的 LassoCV 在 `np.logspace(-5, 2, 200)` 范围内自动搜索最优正则化系数 α，然后以该 α 值训练 Lasso 回归，保留系数非零的特征。L1 正则化天然具备特征稀疏化能力，能剔除冗余基因。

### 3.3 XGBoost 重要性排序

`Xgboost_col()` 利用集成学习中的特征重要性（feature importance）对候选基因进行二次排序与筛选。最终通过 `common_col()` 取 Lasso 与 XGBoost 两个独立筛选路径的**交集**，确保保留的特征同时在统计显著性和模型重要性上得到验证。

## 四、模型构建：随机森林 + 分层交叉验证

### 4.1 统计验证层

在进入最终建模前，`find_SV()` 对每个候选特征计算其在正负样本中的分布差异（`cha` 值 = 阳性样本占比 − 阴性样本占比），初步过滤掉区分能力弱的特征。`best_auc()` 以 `cha` 阈值作为超参数进行网格搜索，在 10 折 **StratifiedKFold** 分层交叉验证下，综合 **AUC + MCC + Accuracy** 三项指标选取最优阈值，最终由 `best_col()` 返回 Top-N 最优特征集。

### 4.2 随机森林训练

分类器使用 `RandomForestClassifier(n_estimators=363, max_depth=38, oob_score=True)`：
- **n_estimators=363**：足够多的决策树保证集成稳定性
- **max_depth=38**：限制树深度防止过拟合
- **oob_score=True**：启用袋外估计作为无偏验证

`save_model()` 完成最终训练后，将模型以 `pickle` 格式持久化为 `random_forest_model.pkl`。

## 五、风险预测与输出

### 5.1 预测流水线

`predict_add()` 加载训练好的模型，调用 `forest.predict_proba()` 获取每个样本属于阳性类别的概率值，并按以下映射输出风险等级：

| 概率区间 | 风险等级 |
|----------|----------|
| prob ≤ 0.5 | Low |
| 0.5 < prob ≤ 0.7 | Medium |
| 0.7 < prob ≤ 0.9 | High |
| prob > 0.9 | Very High |

### 5.2 三种运行模式

- **normal 模式**：调用 `isolation_predict()`，基于预置数据库对用户输入的泛基因组文件进行独立预测
- **test 模式**：调用 `test_predict()`，使用预置的测试数据集快速验证模型表现
- **add 模式**：调用 `add_predict()`，支持增量学习——将新样本的基因数据、宿主表型和 Scoary 结果一并纳入，重新执行完整的特征筛选与模型训练流程，输出更新后的预测结果

所有预测结果均输出为 `output/final_risk.csv`，包含每个样本的编号、风险概率值与风险等级标签。

## 六、技术亮点总结

1. **多策略特征工程**：Scoary 生物学关联 + LASSO 统计稀疏 + XGBoost 模型重要性，三阶段逐级降维，确保特征兼具生物学意义与统计显著性
2. **严格交叉验证**：StratifiedKFold 分层采样保证正负样本比例一致，综合 AUC / MCC / Accuracy 三项指标避免单指标偏倚
3. **增量学习能力**：add 模式支持新数据持续迭代模型，而非仅做静态预测
4. **工程化打包**：标准 `setuptools` + `console_scripts` + `MANIFEST.in`，一条 `pip install` 即可部署
5. **跨平台兼容**：通过 `platform.system()` 自动适配路径分隔符，Windows/Linux/Mac 均可用

## 结语

Ssuis_Zoonotic_Predict 将泛基因组学与机器学习深度结合，提供了一套从基因特征编码、多策略筛选、模型训练到风险输出的完整技术管线。在病原体风险评估日益依赖计算手段的今天，这种“数据驱动”的方法为公共卫生监测与防控提供了高效、可复现的技术支撑。
