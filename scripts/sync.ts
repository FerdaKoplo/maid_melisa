import type { ComponentSchema } from "@maid_melisa/templates/types";
import { validateSchema } from "@maid_melisa/templates/validators";
import { generateIvyComponent } from "@maid_melisa/templates/generators";
import { SugarCubeSchema } from "@maid_melisa/templates/schemas/sugar-cube.schema";
import { SteeperSchema } from "@maid_melisa/templates/schemas/steeper.schema";
import { EnvelopeSchema } from "@maid_melisa/templates/schemas/envelope.schema";
import { TrolleySchema } from "@maid_melisa/templates/schemas/trolley.schema";

const registry: ComponentSchema[] = [
  SugarCubeSchema,
  SteeperSchema,
  EnvelopeSchema,
  TrolleySchema,
];

const sync = (): void => {
  console.log("syncing maid melisa components...\n");

  let passed = 0;
  let failed = 0;

  for (const schema of registry) {
    try {
      generateIvyComponent(schema);
      passed++;
    } catch (err) {
      console.error(`✗ Failed: ${schema.name} — ${(err as Error).message}`);
      failed++;
    }
  }

  console.log(`\ndone. ${passed} generated, ${failed} failed`);
};

sync();
