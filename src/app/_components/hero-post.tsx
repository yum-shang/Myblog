import Avatar from "@/app/_components/avatar";
import CoverImage from "@/app/_components/cover-image";
import { type Author } from "@/interfaces/author";
import Link from "next/link";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

export function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <section>
      <div className="mb-8 md:mb-12 overflow-hidden rounded-soft shadow-card hover:shadow-card-hover transition-shadow duration-500">
        <CoverImage title={title} src={coverImage} slug={slug} />
      </div>
      <div className="card-layered p-6 md:p-8 mb-20 md:mb-28">
        <div className="flex flex-col">
          <div className="text-center md:text-left">
            <h3 className="mb-6 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              <Link
                href={`/posts/${slug}`}
                className="text-morandi-ink hover:text-morandi-sage-deep transition-colors duration-200"
              >
                {title}
              </Link>
            </h3>
            <div className="mb-8 text-sm text-morandi-ink-muted">
              <DateFormatter dateString={date} />
            </div>
          </div>
          <div className="mt-6">
            <p className="text-base md:text-lg leading-relaxed mb-8 text-morandi-ink-light">
              {excerpt}
            </p>
            <div className="flex justify-end">
              <Avatar name={author.name} picture={author.picture} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
