import { ComponentSchema } from "../types/schema.type";
import { validateSchema } from "../validators/schema.validator";
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { buildFile } from "../builders/file.builder";

const SERVINGS_DIR = resolve(__dirname, "../../servings/ivy");

export const generateIvyComponent = (schema: ComponentSchema): void => {
  validateSchema(schema);

  const output = buildFile(schema);

  mkdirSync(SERVINGS_DIR, { recursive: true });
  writeFileSync(join(SERVINGS_DIR, `${schema.name}.tsx`), output);

  console.log(`✓ Generated: servings/ivy/${schema.name}.tsx`);
};
