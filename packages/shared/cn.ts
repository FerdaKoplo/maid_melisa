import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge, twMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  extend: {
    theme: {
      color: [
        "primary",
        "surface",
        "secondary",
        "text",
        "muted",
        "border",
        "accent",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
