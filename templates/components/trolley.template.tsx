import React, { useState, useEffect, Children, useCallback } from "react";
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
import type { TrolleyCardProps, TrolleyTypeProps } from "../types/trolley.type";

const t = {
  surface: "var(--surface)",
  text: "var(--text)",
  muted: "var(--muted)",
  border: "var(--border)",
  primary: "var(--primary)",
  fontFamily: "var(--mm-font-family)",
} as const;

const variants = {
  stacked: {
    base: "rounded-2xl overflow-hidden touch-none",
    active: "active:cursor-grabbing",
    disabled: "opacity-50 cursor-not-allowed",
  },
  flat: {
    base: "rounded-xl overflow-hidden touch-none",
    active: "active:cursor-grabbing",
    disabled: "opacity-50 cursor-not-allowed",
  },
  floating: {
    base: "rounded-3xl overflow-hidden touch-none",
    active: "active:cursor-grabbing",
    disabled: "opacity-50 cursor-not-allowed",
  },
} as const;

const variantStyles = {
  stacked: (disabled: boolean) => ({
    background: t.surface,
    border: `1px solid ${t.border}`,
    boxShadow: disabled ? "none" : "0 20px 10px rgba(0,0,0,0.09)",
  }),
  flat: (_disabled: boolean) => ({
    background: "transparent",
    border: `2px solid ${t.border}`,
    boxShadow: "none",
  }),
  floating: (disabled: boolean) => ({
    background: t.surface,
    border: "none",
    boxShadow: disabled ? "none" : "0 25px 50px rgba(0,0,0,0.2)",
  }),
} as const;

const sizes = {
  demi: { padding: "16px", fontSize: "14px" },
  standard: { padding: "24px", fontSize: "16px" },
  grand: { padding: "32px", fontSize: "20px" },
} as const;

const iconButtonStyle: React.CSSProperties = {
  background: t.surface,
  border: `1px solid ${t.border}`,
  borderRadius: "50%",
  padding: "12px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: t.text,
  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  transition: "all 0.15s ease",
};

export const Trolley = ({
  infinite = false,
  variant = "stacked",
  size = "standard",
  navigationMode = "swipe",
  autoPlay = false,
  autoPlayInterval = 3000,
  children,
  onSwipeLeft,
  onSwipeRight,
  onNext,
  onPrev,
  onEmpty,
  dragThreshold = 100,
  disabled = false,
  className,

  "aria-label": ariaLabel,
}: TrolleyTypeProps) => {
  const childrenArray = Children.toArray(children);
  const total = childrenArray.length;
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

  useEffect(() => {
    if (!infinite && currentIndex >= total && total > 0) {
      onEmpty?.();
    }
  }, [currentIndex, total, infinite, onEmpty]);

  useEffect(() => {
    if (!autoPlay || disabled || (!infinite && currentIndex >= total)) return;
    const id = setInterval(() => handleAction("right"), autoPlayInterval);
    return () => clearInterval(id);
  }, [
    autoPlay,
    autoPlayInterval,
    disabled,
    infinite,
    currentIndex,
    total,
    handleAction,
  ]);

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

  const showArrows = navigationMode === "arrows" || navigationMode === "both";
  const allowSwipe = navigationMode === "swipe" || navigationMode === "both";
  const isEmpty = !infinite && currentIndex >= total;

  return (
    <div
      role="region"
      aria-label={ariaLabel ?? "Swipeable card stack"}
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
          {activeCards.map(({ child, globalIndex, stackOffset }) => (
            <TrolleyCard
              key={globalIndex}
              child={child}
              isFront={stackOffset === 0}
              allowSwipe={allowSwipe}
              disabled={disabled}
              variant={variant}
              size={size}
              threshold={dragThreshold}
              onAction={handleAction}
              stackOffset={stackOffset}
            />
          ))}
        </AnimatePresence>

        {isEmpty && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2"
            style={{ color: t.muted, fontFamily: t.fontFamily }}
          >
            <span style={{ fontSize: "32px" }}>🫖</span>
            <span style={{ fontSize: sizes[size].fontSize }}>
              All cards seen
            </span>
          </motion.div>
        )}
      </div>

      {showArrows && !isEmpty && (
        <div className="flex gap-4 mt-6 z-10">
          <button
            type="button"
            onClick={() => handleAction("left")}
            disabled={disabled}
            aria-label="Previous"
            style={{ ...iconButtonStyle, opacity: disabled ? 0.4 : 1 }}
          >
            <ArrowLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => handleAction("right")}
            disabled={disabled}
            aria-label="Next"
            style={{ ...iconButtonStyle, opacity: disabled ? 0.4 : 1 }}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      )}

      {total > 1 && (
        <div className="flex gap-1 mt-12">
          {childrenArray.map((_, i) => {
            const actualCurrent = currentIndex % total;
            const isActive = i === actualCurrent && !isEmpty;
            return (
              <div
                key={i}
                style={{
                  width: isActive ? "20px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  background: isActive ? t.primary : t.border,
                  transition: "all 0.2s ease",
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

const TrolleyCard = React.memo(
  ({
    variant = "stacked",
    size = "standard",
    child,
    isFront,
    allowSwipe,
    disabled = false,
    threshold,
    onAction,
    stackOffset,
  }: TrolleyCardProps) => {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-15, 15]);
    // const cardOpacity = useTransform(
    //   x,
    //   [-200, -150, 0, 150, 200],
    //   [1, 1, 1, 1, 1],
    // );
    const animationControls = useAnimation();

    const handleDragEnd = useCallback(
      (_: never, info: PanInfo) => {
        if (info.offset.x > threshold) {
          animationControls
            .start({
              x: 600,
              opacity: 0,
              transition: { duration: 0.5, ease: "easeOut" },
            })
            .then(() => onAction("right"));
        } else if (info.offset.x < -threshold) {
          animationControls
            .start({
              x: -600,
              opacity: 0,
              transition: { duration: 0.5, ease: "easeOut" },
            })
            .then(() => onAction("left"));
        } else {
          animationControls.start({
            x: 0,
            transition: { type: "spring", stiffness: 400, damping: 25 },
          });
        }
      },
      [threshold, onAction, animationControls],
    );

    const scale = 1 - stackOffset * 0.05;
    const yOffset = stackOffset * 10;

    return (
      <motion.div
        initial={{ scale: scale - 0.05, y: yOffset + 20 }}
        animate={{
          opacity: isFront ? 1 : 1 - stackOffset * 0.2,
          scale,
          y: yOffset,
          transition: { duration: 0.35, ease: "easeOut" },
        }}
        exit={{
          opacity: 0,
          scale: 0.85,
          transition: { duration: 0.2 },
        }}
        style={{
          x: isFront ? x : 0,
          rotate: isFront ? rotate : 0,
          // opacity: isFront ? cardOpacity : undefined,
          zIndex: 10 - stackOffset,
          padding: sizes[size].padding,
          fontSize: sizes[size].fontSize,
          fontFamily: t.fontFamily,
          ...variantStyles[variant](disabled),
        }}
        className={cn(
          "absolute inset-0 w-full h-full flex flex-col justify-center items-center origin-bottom",
          variants[variant].base,
          isFront && !disabled && variants[variant].active,
          disabled && variants[variant].disabled,
        )}
        drag={isFront && allowSwipe && !disabled ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragEnd={handleDragEnd}
        whileDrag={{ cursor: "grabbing" }}
        onAnimationStart={() => console.log("anim start", stackOffset)}
        onAnimationComplete={() => console.log("anim complete", stackOffset)}
      >
        <div className="w-full h-full pointer-events-none">{child}</div>
      </motion.div>
    );
  },
);
