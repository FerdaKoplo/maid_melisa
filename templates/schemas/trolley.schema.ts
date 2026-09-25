import { ComponentSchema } from "../types/schema.type";

export const TrolleySchema: ComponentSchema = {
  name: "Trolley",
  themeKey: "trolley",
  props: [
    {
      name: "variant",
      type: "string",
      options: ["stacked", "flat", "floating"],
      default: "stacked",
    },
    {
      name: "size",
      type: "string",
      options: ["demi", "standard", "grand"],
      default: "standard",
    },
    {
      name: "navigationMode",
      type: "string",
      options: ["swipe", "arrows", "both"],
      default: "swipe",
    },
    { name: "infinite", type: "boolean", default: false },
    { name: "children", type: "node", default: null },
    { name: "onSwipeLeft", type: "function", default: null },
    { name: "onSwipeRight", type: "function", default: null },
    { name: "onNext", type: "function", default: null },
    { name: "onPrev", type: "function", default: null },
    { name: "onEmpty", type: "function", default: null },
    { name: "dragThreshold", type: "string", default: "100" },
    { name: "disabled", type: "boolean", default: false },
    { name: "className", type: "string", default: "" },
  ],
  accessibility: {
    role: "region",
    keyboardEvents: ["ArrowLeft", "ArrowRight"],
    ariaAttributes: ["aria-label", "aria-roledescription", "aria-disabled"],
  },
  variants: {
    stacked: {
      base: "relative bg-surface rounded-2xl shadow-xl border border-border overflow-hidden touch-none",
      hover: "shadow-2xl",
      active: "cursor-grabbing",
      disabled: "opacity-50 cursor-not-allowed shadow-none",
    },
    flat: {
      base: "relative bg-transparent rounded-xl border-2 border-border overflow-hidden touch-none",
      hover: "border-primary",
      active: "cursor-grabbing border-primary",
      disabled: "opacity-50 cursor-not-allowed",
    },
    floating: {
      base: "relative bg-surface rounded-3xl drop-shadow-2xl overflow-hidden touch-none",
      hover: "scale-[1.02]",
      active: "cursor-grabbing scale-100",
      disabled: "opacity-50 cursor-not-allowed drop-shadow-none",
    },
  },
  sizes: {
    demi: {
      padding: "16px",
      fontSize: "14px",
    },
    standard: {
      padding: "24px",
      fontSize: "16px",
    },
    grand: {
      padding: "32px",
      fontSize: "20px",
    },
  },
};
