import { ComponentSchema } from "../types/schema.type";

export const SteeperSchema: ComponentSchema = {
  name: "Steeper",
  themeKey: "steeper",
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
    {
      name: "type",
      type: "string",
      options: ["text", "email", "password", "number", "search", "textarea"],
      default: "text",
    },
    { name: "value", type: "string", default: undefined },
    { name: "defaultValue", type: "string", default: undefined },
    { name: "placeholder", type: "string", default: "" },
    { name: "disabled", type: "boolean", default: false },
    { name: "readOnly", type: "boolean", default: false },
    { name: "error", type: "string", default: undefined },
    { name: "label", type: "string", default: undefined },
    { name: "onClear", type: "function", default: null },
    { name: "onChange", type: "function", default: null },
  ],
  accessibility: {
    role: "textbox",
    keyboardEvents: ["Escape"],
    ariaAttributes: ["aria-label", "aria-invalid", "aria-describedby"],
  },
  variants: {
    steeped: {
      base: "bg-surface text-text border-border",
      hover: "border-primary",
      active: "ring-2 ring-primary ring-offset-0",
      disabled: "opacity-40 cursor-not-allowed bg-muted",
    },
    plain: {
      base: "bg-transparent text-text border-border",
      hover: "border-primary",
      active: "ring-2 ring-primary ring-offset-0",
      disabled: "opacity-40 cursor-not-allowed",
    },
    glazed: {
      base: "bg-transparent text-text border-transparent border-b-border",
      hover: "border-b-primary",
      active: "border-b-2 border-b-primary",
      disabled: "opacity-40 cursor-not-allowed",
    },
  },
  sizes: {
    demi: { padding: "6px 10px", fontSize: "12px" },
    standard: { padding: "10px 14px", fontSize: "14px" },
    grand: { padding: "14px 18px", fontSize: "16px" },
  },
};
