import { ComponentSchema } from "../types/schema.type";

export const buildTypes = (schema: ComponentSchema): string => {
  const variantOptions =
    schema.props.find((p) => p.name === "variant")?.options ?? [];
  const sizeOptions =
    schema.props.find((p) => p.name === "size")?.options ?? [];

  return `
type Variant = ${variantOptions.map((v) => `"${v}"`).join(" | ")}
type Size    = ${sizeOptions.map((s) => `"${s}"`).join(" | ")}

interface ${schema.name}Props {
  variant?:        Variant
  size?:           Size
  disabled?:       boolean
  onClick?:        () => void
  children?:       React.ReactNode
  className?:      string
  "aria-label"?:   string
  "aria-pressed"?: boolean
}`.trim();
};
