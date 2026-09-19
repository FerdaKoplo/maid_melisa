import type { LucideIcon } from "lucide-react";

export type EnvelopeVariant = "steeped" | "plain" | "glazed";
export type EnvelopeSize = "demi" | "standard" | "grand";

export interface EnvelopeFile {
  id: string;
  file: File;
  preview?: string;
}

export interface EnvelopeProps {
  variant?: EnvelopeVariant;
  size?: EnvelopeSize;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  disabled?: boolean;
  error?: string;
  label?: string;
  placeholder?: string;
  onChange?: (files: File[]) => void;
  className?: string;
  "aria-label"?: string;
}
