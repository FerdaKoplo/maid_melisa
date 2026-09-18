import { ComponentSchema } from "../types/schema.type";

export const buildVariants = (schema: ComponentSchema): string =>
  `const variants = ${JSON.stringify(schema.variants, null, 2)} as const`;
