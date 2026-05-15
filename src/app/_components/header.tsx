import Link from "next/link";

const Header = () => {
  return (
    <h2 className="text-xl md:text-3xl font-semibold tracking-tight leading-tight mb-16 mt-8 flex items-center text-morandi-ink-light">
      <Link
        href="/"
        className="hover:text-morandi-sage-deep transition-colors duration-200"
      >
        ← Blog
      </Link>
    </h2>
  );
};

export default Header;
