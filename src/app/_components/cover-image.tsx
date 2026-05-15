import cn from "classnames";
import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn(
        "rounded-gentle w-full transition-all duration-500",
        slug
          ? "shadow-card hover:shadow-card-hover"
          : "shadow-card"
      )}
      width={1300}
      height={630}
    />
  );
  return (
    <div className="sm:mx-0 overflow-hidden rounded-gentle">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
