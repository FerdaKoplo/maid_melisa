import React, { useState, useEffect, Children } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
  PanInfo,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@maid_melisa/shared";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { TrolleyTypeProps } from "../types/trolley.type";

const variants = {
  stacked: {
    base: "bg-surface rounded-2xl shadow-xl border border-border overflow-hidden touch-none",
    active: "active:cursor-grabbing",
    disabled: "opacity-50 cursor-not-allowed shadow-none",
  },
  flat: {
    base: "bg-transparent rounded-xl border-2 border-border overflow-hidden touch-none",
    hover: "hover:border-primary",
    active: "active:cursor-grabbing hover:border-primary",
    disabled: "opacity-50 cursor-not-allowed",
  },
  floating: {
    base: "bg-surface rounded-3xl drop-shadow-2xl overflow-hidden touch-none",
    hover: "hover:scale-[1.02]",
    active: "active:cursor-grabbing active:scale-100",
    disabled: "opacity-50 cursor-not-allowed drop-shadow-none",
  },
} as const;

const sizes = {
  demi: { padding: "16px", fontSize: "14px" },
  standard: { padding: "24px", fontSize: "16px" },
  grand: { padding: "32px", fontSize: "20px" },
} as const;

export const Trolley = ({
  infinite = false,
  variant = "stacked",
  size = "standard",
  navigationMode = "swipe",
  children,
  onSwipeLeft,
  onSwipeRight,
  onNext,
  onPrev,
  onEmpty,
  dragThreshold = "100",
  disabled = false,
  className,
  "aria-label": ariaLabel,
}: TrolleyTypeProps) => {
  const childrenArray = Children.toArray(children);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (
      !infinite &&
      currentIndex >= childrenArray.length &&
      childrenArray.length > 0
    ) {
      onEmpty?.();
    }
  }, [currentIndex, childrenArray.length, onEmpty]);

  const handleAction = (direction: "left" | "right") => {
    if (disabled || childrenArray.length === 0) return;

    if (!infinite && currentIndex >= childrenArray.length) return;

    const actualIndex = currentIndex % childrenArray.length;

    if (direction === "right") {
      onSwipeRight?.(actualIndex);
      onNext?.(actualIndex);
    } else {
      onSwipeLeft?.(actualIndex);
      onPrev?.(actualIndex);
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handleAction("left");
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleAction("right");
    }
  };

  const activeCards = [];
  if (childrenArray.length > 0) {
    const maxVisibleCount = infinite
      ? Math.min(3, childrenArray.length)
      : Math.min(3, childrenArray.length - currentIndex);

    for (let i = 0; i < maxVisibleCount; i++) {
      const globalIndex = currentIndex + i;
      const actualIndex = globalIndex % childrenArray.length;

      activeCards.push({
        child: childrenArray[actualIndex],
        globalIndex: globalIndex,
        stackOffset: i,
      });
    }
  }

  const thresholdNumber = parseInt(String(dragThreshold), 10) || 100;
  const showArrows = navigationMode === "arrows" || navigationMode === "both";
  const allowSwipe = navigationMode === "swipe" || navigationMode === "both";

  return (
    <div
      role="region"
      aria-label={ariaLabel || "Swipeable card stack"}
      aria-roledescription="carousel"
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative flex flex-col items-center justify-center w-full max-w-sm mx-auto",
        className,
      )}
    >
      <div className="relative w-full aspect-[3/4] flex justify-center items-center">
        <AnimatePresence>
          {activeCards.map(({ child, globalIndex, stackOffset }) => {
            const isFront = stackOffset === 0;

            return (
              <TrolleyCard
                key={globalIndex}
                child={child}
                isFront={isFront}
                allowSwipe={allowSwipe}
                disabled={disabled}
                variant={variant}
                size={size}
                threshold={thresholdNumber}
                onAction={handleAction}
                stackOffset={stackOffset}
              />
            );
          })}
        </AnimatePresence>

        {childrenArray.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            No items to display
          </div>
        )}
      </div>

      {showArrows && activeCards.length > 0 && (
        <div className="flex gap-4 mt-6 z-10">
          <button
            onClick={() => handleAction("left")}
            disabled={disabled}
            aria-label="Previous or reject"
            className="p-3 rounded-full bg-surface border border-border shadow-sm hover:bg-muted transition-colors disabled:opacity-50"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => handleAction("right")}
            disabled={disabled}
            aria-label="Next or accept"
            className="p-3 rounded-full bg-surface border border-border shadow-sm hover:bg-muted transition-colors disabled:opacity-50"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

const TrolleyCard = ({
  child,
  isFront,
  allowSwipe,
  disabled,
  variant,
  size,
  threshold,
  onAction,
  stackOffset,
}: {
  child: React.ReactNode;
  isFront: boolean;
  allowSwipe: boolean;
  disabled: boolean;
  variant: keyof typeof variants;
  size: keyof typeof sizes;
  threshold: number;
  onAction: (direction: "left" | "right") => void;
  stackOffset: number;
}) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  const animationControls = useAnimation();

  useEffect(() => {
    animationControls.set({ x: 0, opacity: 1 });
    x.set(0);
  }, [isFront, animationControls, x]);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.x > threshold) {
      animationControls
        .start({ x: 500, opacity: 0, transition: { duration: 0.3 } })
        .then(() => {
          onAction("right");
        });
    } else if (info.offset.x < -threshold) {
      animationControls
        .start({ x: -500, opacity: 0, transition: { duration: 0.3 } })
        .then(() => {
          onAction("left");
        });
    } else {
      animationControls.start({
        x: 0,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      });
    }
  };

  const scale = 1 - stackOffset * 0.05;
  const yOffset = stackOffset * 10;

  return (
    <motion.div
      style={{
        x: isFront ? x : 0,
        rotate: isFront ? rotate : 0,
        opacity: isFront ? 1 : 1 - stackOffset * 0.2,
        zIndex: 10 - stackOffset,
        scale,
        y: yOffset,
        padding: sizes[size].padding,
        fontSize: sizes[size].fontSize,
        fontFamily: "var(--mm-font-family)",
      }}
      className={cn(
        "absolute inset-0 w-full h-full flex flex-col justify-center items-center origin-bottom",
        "transition-colors duration-150",
        variants[variant].base,
        isFront && !disabled && variants[variant],
        isFront && !disabled && variants[variant].active,
        disabled && variants[variant].disabled,
      )}
      drag={isFront && allowSwipe && !disabled ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      animate={animationControls}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
    >
      <div className="w-full h-full pointer-events-none">{child}</div>
    </motion.div>
  );
};
