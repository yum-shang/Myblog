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
    <footer className="bg-morandi-paper border-t border-morandi-card-border">
      <Container>
        <div className="py-12 flex flex-col items-center">
          <div className="flex items-center justify-center gap-10 mb-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 text-morandi-ink-light hover:text-morandi-sage-deep transition-colors duration-200"
              >
                <span className="w-9 h-9 flex items-center justify-center rounded-full bg-morandi-card border border-morandi-card-border hover:border-morandi-sage-wash hover:bg-morandi-card-hover transition-all duration-200">
                  <img
                    src={link.icon}
                    alt={link.name}
                    className="w-5 h-5"
                  />
                </span>
                <span className="text-xs font-medium tracking-wide">
                  {link.name}
                </span>
              </a>
            ))}
          </div>
          <p className="text-xs text-morandi-ink-muted mt-4 tracking-wide">
            © {new Date().getFullYear()} 瑶. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
