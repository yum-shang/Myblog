import Container from "@/app/_components/container";

const socialLinks = [
  {
    name: "瑶",
    icon: "/icons/瑶.svg",
    href: "https://github.com/",
  },
  {
    name: "CSDN",
    icon: "/icons/csdn.svg",
    href: "https://blog.csdn.net/2501_90131302?spm=1000.2115.3001.5343",
  },
];

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 dark:bg-slate-800">
      <Container>
        <div className="py-16 flex flex-col items-center">
          <div className="flex items-center justify-center gap-8 mb-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors duration-200"
              >
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-200 dark:bg-slate-700 hover:bg-neutral-300 dark:hover:bg-slate-600 transition-colors duration-200">
                  <img
                    src={link.icon}
                    alt={link.name}
                    className="w-6 h-6"
                  />
                </span>
                <span className="text-sm font-medium">{link.name}</span>
              </a>
            ))}
          </div>
          <p className="text-sm text-neutral-400 dark:text-neutral-500 mt-4">
            © {new Date().getFullYear()}  瑶. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
