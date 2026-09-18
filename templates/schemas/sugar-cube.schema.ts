import { ComponentSchema } from "../types/schema.type";

export const SugarCubeSchema: ComponentSchema = {
  name: "SugarCube",
  themeKey: "sugarCube",
  props: [
    {
      name: "variant",
      type: "string",
      options: ["steeped", "plain", "glazed"],
      default: "steeped",
    },
    {
      name: "size",
      type: "string",
      options: ["demi", "standard", "grand"],
      default: "standard",
    },
    { name: "disabled", type: "boolean", default: false },
    { name: "onClick", type: "function", default: null },
    { name: "children", type: "node", default: null },
  ],
  accessibility: {
    role: "button",
    keyboardEvents: ["Enter", "Space"],
    ariaAttributes: ["aria-disabled", "aria-label", "aria-pressed"],
  },
  variants: {
    steeped: {
      base: "bg-primary text-surface border-transparent",
      hover: "opacity-90",
      active: "opacity-75",
      disabled: "opacity-40 cursor-not-allowed",
    },
    plain: {
      base: "bg-transparent text-primary border-border",
      hover: "bg-surface",
      active: "opacity-75",
      disabled: "opacity-40 cursor-not-allowed",
    },
    glazed: {
      base: "bg-transparent text-primary border-transparent",
      hover: "bg-surface",
      active: "opacity-75",
      disabled: "opacity-40 cursor-not-allowed",
    },
  },
  sizes: {
    demi: {
      padding: "6px 12px",
      fontSize: "12px",
    },
    standard: {
      padding: "10px 20px",
      fontSize: "14px",
    },
    grand: {
      padding: "14px 28px",
      fontSize: "16px",
    },
  },
};
