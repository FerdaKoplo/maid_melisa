export type VariantTrolley = "stacked" | "flat" | "floating";
export type SizeTrolley = "demi" | "standard" | "grand";
export type NavigationMode = "swipe" | "arrows" | "both";

export interface TrolleyItem {
  id: string | number;
  content: React.ReactNode;
}

export interface TrolleyTypeProps {
  infinite?: boolean;
  // items: TrolleyItem[];
  variant?: VariantTrolley;
  size?: SizeTrolley;
  swipeThreshold?: number;
  children: React.ReactNode;
  navigationMode?: NavigationMode;
  onSwipeLeft?: (index: number) => void;
  onSwipeRight?: (index: number) => void;
  dragThreshold?: string | number;
  disabled?: boolean;
  className?: string;
  onNext?: (index: number) => void;
  onPrev?: (index: number) => void;
  onEmpty?: () => void;
  "aria-label"?: string;
}
