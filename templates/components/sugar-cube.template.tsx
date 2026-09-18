import { useState } from "react";
import { cn } from "@maid_melisa/shared";
import type { SugarCubeProps } from "../types/sugar-cube.type";

const variants = {
  steeped: {
    base: "border border-transparent bg-primary text-surface",
    hover: "hover:opacity-90",
    active: "opacity-75",
    disabled: "opacity-40 cursor-not-allowed",
  },
  plain: {
    base: "border border-border bg-transparent text-primary",
    hover: "hover:bg-surface",
    active: "opacity-75",
    disabled: "opacity-40 cursor-not-allowed",
  },
  glazed: {
    base: "border border-transparent bg-transparent text-primary",
    hover: "hover:bg-surface",
    active: "opacity-75",
    disabled: "opacity-40 cursor-not-allowed",
  },
} as const;

const sizes = {
  demi: { padding: "6px 12px", fontSize: "12px" },
  standard: { padding: "10px 20px", fontSize: "14px" },
  grand: { padding: "14px 28px", fontSize: "16px" },
} as const;

export const SugarCube = ({
  variant = "steeped",
  size = "standard",
  disabled = false,
  onClick,
  children,
  className,
  "aria-label": ariaLabel,
  "aria-pressed": ariaPressed,
}: SugarCubeProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (["Enter", "Space"].includes(e.key)) {
      e.preventDefault();
      if (!disabled) onClick?.();
    }
  };

  return (
    <button
      role="button"
      aria-disabled={disabled}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      tabIndex={disabled ? -1 : 0}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      onKeyDown={handleKeyDown}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      style={{
        borderRadius: "var(--mm-radius-sm)",
        fontFamily: "var(--mm-font-family)",
        padding: sizes[size].padding,
        fontSize: sizes[size].fontSize,
      }}
      className={cn(
        "transition-colors duration-150",
        variants[variant].base,
        !disabled && variants[variant].hover,
        isActive && !disabled && variants[variant].active,
        disabled && variants[variant].disabled,
        className,
      )}
    >
      {children}
    </button>
  );
};
