export function Intro() {
  return (
    <section className="flex flex-col md:flex-row items-center md:justify-between mt-20 mb-20 md:mb-24">
      <div className="flex flex-col items-center md:items-start w-full">
        <h1 className="font-warm text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 text-morandi-ink">
          Blog<span className="text-morandi-sage">.</span>
        </h1>
        <p className="mt-4 text-lg text-morandi-ink-light font-warm italic tracking-wide">
           项目学习技术笔记 by 瑶
        </p>
      </div>
    </section>
  );
}
