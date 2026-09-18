export const validateSchema = (schema: any): void => {
  const required = [
    "name",
    "themeKey",
    "props",
    "accessibility",
    "variants",
    "sizes",
  ];

  for (const field of required) {
    if (!schema[field]) {
      throw new Error(`Schema missing required field: ${field}`);
    }
  }

  const requiredA11y = ["role", "keyboardEvents", "ariaAttributes"];
  for (const field of requiredA11y) {
    if (!schema.accessibility[field]) {
      throw new Error(`Schema accessibility missing: ${field}`);
    }
  }

  console.log(`Schema valid: ${schema.name}`);
};
