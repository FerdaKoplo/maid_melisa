import type { ComponentSchema } from "../types/schema.type";

export const EnvelopeSchema: ComponentSchema = {
  name: "Envelope",
  themeKey: "envelope",
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
    { name: "accept", type: "string", default: "*" },
    { name: "multiple", type: "boolean", default: false },
    { name: "maxSize", type: "string", default: undefined },
    { name: "disabled", type: "boolean", default: false },
    { name: "error", type: "string", default: undefined },
    { name: "label", type: "string", default: undefined },
    {
      name: "placeholder",
      type: "string",
      default: "Drop files here or click to upload",
    },
    { name: "onChange", type: "function", default: null },
  ],
  accessibility: {
    role: "button",
    keyboardEvents: ["Enter", "Space"],
    ariaAttributes: ["aria-label", "aria-disabled", "aria-invalid"],
  },
  variants: {
    steeped: {
      base: "bg-surface border-border text-text",
      hover: "hover:border-primary hover:bg-surface",
      active: "border-primary ring-2 ring-primary",
      disabled: "opacity-40 cursor-not-allowed",
    },
    plain: {
      base: "bg-transparent border-border text-text",
      hover: "hover:border-primary",
      active: "border-primary ring-2 ring-primary",
      disabled: "opacity-40 cursor-not-allowed",
    },
    glazed: {
      base: "bg-transparent border-dashed border-border text-text",
      hover: "hover:border-primary hover:bg-surface",
      active: "border-primary ring-2 ring-primary",
      disabled: "opacity-40 cursor-not-allowed",
    },
  },
  sizes: {
    demi: { padding: "16px", fontSize: "12px" },
    standard: { padding: "24px", fontSize: "14px" },
    grand: { padding: "32px", fontSize: "16px" },
  },
};
