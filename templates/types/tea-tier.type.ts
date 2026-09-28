export type VariantTeaTier = "silver" | "gold" | "porcelain";
export type SizeTeaTier = "demi" | "standard" | "grand";

export interface TeaTierProps {
  variant?: VariantTeaTier;
  size?: SizeTeaTier;
  separator?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}

export interface TierItemProps {
  href?: string;
  isLast?: boolean;
  variant?: VariantTeaTier;
  size?: SizeTeaTier;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLSpanElement>) => void;
}
