import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export function PostTitle({ children }: Props) {
  return (
    <h1 className="font-warm text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight md:leading-none mb-10 text-center md:text-left text-morandi-ink">
      {children}
    </h1>
  );
}
