import { british } from "../tokens/semantic/themes/fixed/british";

type ThemeName = "british" | "french" | "japanese" | "dutch" | "belgian";

const themes: Record<ThemeName, typeof british> = {
  british,
  french: british, // placeholder
  japanese: british, // placeholder
  dutch: british, // placeholder
  belgian: british, // placeholder
};

export const setTheme = (name: ThemeName): void => {
  const theme = themes[name];
  const root = document.documentElement;

  Object.entries(theme.color).forEach(([key, value]) => {
    root.style.setProperty(`--mm-color-${key}`, value);
  });

  Object.entries(theme.radius).forEach(([key, value]) => {
    root.style.setProperty(`--mm-radius-${key}`, value);
  });

  root.style.setProperty("--mm-font-family", theme.typography.fontFamily);
  root.setAttribute("data-theme", name);
};

setTheme("british");
