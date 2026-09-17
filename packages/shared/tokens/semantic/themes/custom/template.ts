export interface MaidMelisaTheme {
  color: {
    surface: string;
    primary: string;
    secondary: string;
    text: string;
    muted: string;
    border: string;
    accent: string;
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
  };
  spacing: {
    component: string;
    section: string;
  };
  typography: {
    fontFamily: string;
    weight: {
      normal: number;
      medium: number;
      bold: number;
    };
  };
}
