import { type Author } from "@/interfaces/author";
import Link from "next/link";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <div className="card-layered p-5 md:p-6">
      <div className="mb-5 overflow-hidden rounded-gentle -mx-2 md:-mx-3 mt-0">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <h3 className="text-2xl md:text-3xl mb-3 leading-snug font-bold tracking-tight">
        <Link
          href={`/posts/${slug}`}
          className="text-morandi-ink hover:text-morandi-sage-deep transition-colors duration-200"
        >
          {title}
        </Link>
      </h3>
      <div className="text-sm mb-3 text-morandi-ink-muted">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-base leading-relaxed mb-4 text-morandi-ink-light">
        {excerpt}
      </p>
      <Avatar name={author.name} picture={author.picture} />
    </div>
  );
}
