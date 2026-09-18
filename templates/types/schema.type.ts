export interface PropSchema {
  name: string;
  type: "string" | "boolean" | "function" | "node";
  options?: string[];
  default: unknown;
}

export interface VariantStyle {
  base: string;
  hover: string;
  active: string;
  disabled: string;
}

export interface SizeStyle {
  padding: string;
  fontSize: string;
}

export interface AccessibilitySchema {
  role: string;
  keyboardEvents: string[];
  ariaAttributes: string[];
}

export interface ComponentSchema {
  name: string;
  themeKey: string;
  props: PropSchema[];
  accessibility: AccessibilitySchema;
  variants: Record<string, VariantStyle>;
  sizes: Record<string, SizeStyle>;
}
