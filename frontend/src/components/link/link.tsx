import { HTMLAttributeAnchorTarget, ReactNode } from "react";

interface LinkProps {
  href: string;
  download?: string;
  target?: HTMLAttributeAnchorTarget;
  rel?: string;
  children: ReactNode;
}

export const Link = ({
  href,
  download,
  target = "_blank",
  rel = "noopener noreferrer",
  children,
}: LinkProps) => {
  return (
    <a href={href} download={download} target={target} rel={rel}>
      {children}
    </a>
  );
};
