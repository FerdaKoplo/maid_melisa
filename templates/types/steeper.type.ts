import { LucideIcon } from "lucide-react";

export type SteepVariant = "steeped" | "plain" | "glazed";
export type SteepSize = "demi" | "standard" | "grand";
export type SteepType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "search"
  | "textarea";

export interface SteepperProps {
  variant?: SteepVariant;
  size?: SteepSize;
  type?: SteepType;
  icon?: LucideIcon;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
  label?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  className?: string;
  "aria-label"?: string;
}
