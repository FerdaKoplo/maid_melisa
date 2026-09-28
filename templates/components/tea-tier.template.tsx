import React, { Children } from "react";
import { cn } from "@maid_melisa/shared";
import { Croissant } from "lucide-react";
import type {
  TierItemProps,
  SizeTeaTier,
  TeaTierProps,
} from "../types/tea-tier.type";
import { TeaTierSchema } from "../schemas/tea-tier.type";

const { variants, sizes } = TeaTierSchema;

const iconSizes: Record<SizeTeaTier, string> = {
  demi: "w-3 h-3",
  standard: "w-4 h-4",
  grand: "w-5 h-5",
};

export const TeaTier = ({
  variant = "silver",
  size = "standard",
  separator,
  children,
  className,
  "aria-label": ariaLabel = "breadcrumb",
}: TeaTierProps) => {
  const childrenArray = Children.toArray(children);
  const totalItems = childrenArray.length;

  return (
    <nav aria-label={ariaLabel} className={cn("flex", className)}>
      <ol className="flex flex-wrap items-center gap-2">
        {childrenArray.map((child, index) => {
          const isLast = index === totalItems - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              {React.isValidElement(child)
                ? React.cloneElement(child as React.ReactElement<any>, {
                    isLast,
                    variant,
                    size,
                  })
                : child}

              {!isLast && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex items-center justify-center  text-[#2c4a3e] opacity-30",
                    variants[variant].base,
                    sizes[size].fontSize,
                  )}
                >
                  {separator ? (
                    separator
                  ) : (
                    <Croissant className={iconSizes[size]} />
                  )}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export const TierItem = ({
  href,
  isLast = false,
  variant = "silver",
  size = "standard",
  children,
  className,
  onClick,
}: TierItemProps) => {
  const stateClass = isLast
    ? variants[variant].active
    : cn(variants[variant].base, variants[variant].hover);

  const Component = href && !isLast ? "a" : "span";

  return (
    <Component
      href={href && !isLast ? href : undefined}
      onClick={onClick}
      aria-current={isLast ? "page" : undefined}
      style={{
        fontSize: sizes[size].fontSize,
        fontFamily: "var(--mm-font-family)",
      }}
      className={cn(
        "inline-flex items-center outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm",
        stateClass,
        className,
      )}
    >
      {children}
    </Component>
  );
};
