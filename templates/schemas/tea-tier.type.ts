import { ComponentSchema } from "../types/schema.type";

export const TeaTierSchema: ComponentSchema = {
  name: "TeaTier",
  themeKey: "teaTier",
  props: [
    {
      name: "variant",
      type: "string",
      options: ["silver", "gold", "porcelain"],
      default: "silver",
    },
    {
      name: "size",
      type: "string",
      options: ["demi", "standard", "grand"],
      default: "standard",
    },
    { name: "separator", type: "node", default: null },
    { name: "children", type: "node", default: null },
    { name: "className", type: "string", default: "" },
  ],
  accessibility: {
    role: "navigation",
    keyboardEvents: ["Tab", "Enter"],
    ariaAttributes: [
      'aria-label="breadcrumb"',
      'aria-current="page"',
      'aria-hidden="true"',
    ],
  },
  variants: {
    silver: {
      base: "text-muted-foreground",
      hover: "hover:text-primary transition-colors",
      active: "text-primary font-medium",
      disabled: "opacity-50 cursor-not-allowed",
    },
    gold: {
      base: "text-amber-700/70",
      hover: "hover:text-amber-600 transition-colors",
      active: "text-amber-700 font-semibold",
      disabled: "opacity-50 cursor-not-allowed",
    },
    porcelain: {
      base: "text-slate-500",
      hover: "hover:text-slate-800 transition-colors",
      active: "text-slate-900 font-medium",
      disabled: "opacity-50 cursor-not-allowed",
    },
  },
  sizes: {
    demi: {
      padding: "0px",
      fontSize: "12px",
    },
    standard: {
      padding: "0px",
      fontSize: "14px",
    },
    grand: {
      padding: "0px",
      fontSize: "16px",
    },
  },
};
