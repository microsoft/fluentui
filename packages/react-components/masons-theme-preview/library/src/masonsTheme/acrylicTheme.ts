import { Theme, tokens } from '../../../../react-components/src/index';

export type AcrylicTheme = Theme & {
  blurAcrylicBackground: string;
  colorAcrylicBackground: string;
};

export const acrylicTokens: Record<keyof AcrylicTheme, string> = {
  ...tokens,
  blurAcrylicBackground: `var(--blurAcrylicBackground)`,
  colorAcrylicBackground: `var(--colorAcrylicBackground)`,
};
