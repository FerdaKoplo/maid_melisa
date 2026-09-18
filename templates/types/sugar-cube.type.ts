export type Variant = "steeped" | "plain" | "glazed";
export type Size = "demi" | "standard" | "grand";

export interface SugarCubeProps {
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
  "aria-pressed"?: boolean;
}
