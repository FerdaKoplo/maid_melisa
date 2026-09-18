import { existsSync, readFileSync } from "fs";
import { join } from "path";

import type { ComponentSchema } from "@maid_melisa/templates/types";
import { SugarCubeSchema } from "@maid_melisa/templates/schemas/sugar-cube.schema";

const registry: ComponentSchema[] = [SugarCubeSchema];

const diff = (): void => {
  console.log("checking drift between schemas and servings...\n");

  for (const schema of registry) {
    const servingPath = join(
      process.cwd(),
      "servings",
      "ivy",
      `${schema.name}.tsx`,
    );

    if (!existsSync(servingPath)) {
      console.warn(
        `⚠ Missing:    servings/ivy/${schema.name}.tsx — run pnpm generate`,
      );
      continue;
    }

    const content = readFileSync(servingPath, "utf-8");
    const hasCorrectExport = content.includes(`export { ${schema.name} }`);
    const hasCorrectTypes = content.includes(
      `export type { ${schema.name}Props }`,
    );

    if (!hasCorrectExport || !hasCorrectTypes) {
      console.warn(
        `⚠ Drifted:    servings/ivy/${schema.name}.tsx — run pnpm sync`,
      );
      continue;
    }

    console.log(`✓ In sync:    servings/ivy/${schema.name}.tsx`);
  }
};

diff();
