import { ComponentSchema } from "../types/schema.type";

export const buildSizes = (schema: ComponentSchema): string =>
  `const sizes = ${JSON.stringify(schema.sizes, null, 2)} as const`;
