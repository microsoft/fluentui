import { Theme } from './types';

/**
 * Programmatically generates a tokens to css variables mapping object from the keys in a theme.
 * This helps with ease of use as a user of a custom theme does not have to manually construct this object, but it could
 * affect tree-shaking since bundlers do not know the shape of the output.
 *
 * @param theme - Theme from which to get the keys to generate the tokens to css variables mapping object
 * @returns Tokens to css variables mapping object corresponding to the passed theme
 */
export function themeToTokensObject<TTheme extends Theme>(theme: TTheme): Record<keyof TTheme, string> {
  const tokens = {} as Record<keyof TTheme, string>;
  const keys = Object.keys(theme) as (keyof TTheme)[];
  for (const key of keys) {
    tokens[key] = `var(--${key})`;
  }
  return tokens;
}
