export type VariantTrolley = "stacked" | "flat" | "floating";
export type SizeTrolley = "demi" | "standard" | "grand";
export type NavigationMode = "swipe" | "arrows" | "both";

export interface TrolleyItem {
  id: string | number;
  content: React.ReactNode;
}

export interface TrolleyTypeProps {
  infinite?: boolean;
  variant?: VariantTrolley;
  size?: SizeTrolley;
  navigationMode?: NavigationMode;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  dragThreshold?: number;
  children: React.ReactNode;
  onSwipeLeft?: (index: number) => void;
  onSwipeRight?: (index: number) => void;
  onNext?: (index: number) => void;
  onPrev?: (index: number) => void;
  onEmpty?: () => void;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}

export interface TrolleyCardProps extends Pick<
  TrolleyTypeProps,
  "variant" | "size" | "disabled"
> {
  child: React.ReactNode;
  isFront: boolean;
  allowSwipe: boolean;
  threshold: number;
  onAction: (direction: "left" | "right") => void;
  stackOffset: number;
}
