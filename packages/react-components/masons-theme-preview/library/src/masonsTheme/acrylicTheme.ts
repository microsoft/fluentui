import { Theme, tokens } from '../../../../react-components/src/index';

export type AcrylicTheme = Theme & {
  materialAcrylicBackground: string;
  materialAcrylicStroke: string;
  materialAcrylicBlur: string;
};

export const acrylicTokens: Record<keyof AcrylicTheme, string> = {
  ...tokens,
  materialAcrylicBackground: `var(--materialAcrylicBackground)`,
  materialAcrylicStroke: `var(--materialAcrylicStroke)`,
  materialAcrylicBlur: `var(--materialAcrylicBlur)`,
};
