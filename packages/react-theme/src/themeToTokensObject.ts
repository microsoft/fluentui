import { Theme } from './types';

export function themeToTokensObject<TTheme extends Theme>(theme: TTheme): Record<keyof TTheme, string> {
  const tokens = {} as Record<keyof TTheme, string>;
  const keys = Object.keys(theme) as (keyof TTheme)[];
  for (const key of keys) {
    tokens[key] = `var(--${key})`;
  }
  return tokens;
}
