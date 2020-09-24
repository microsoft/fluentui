import { Theme, createTheme as legacyCreateTheme, PartialTheme } from '@fluentui/theme';
import { getTokens } from './getTokens';

/**
 * Creates default theme (Fluent theme).
 */
// TODO: move this to `@fluent/theme` package.
export const createTheme = (partialTheme: PartialTheme = {}): Theme => {
  const defaultTheme: Theme = legacyCreateTheme(partialTheme);
  defaultTheme.tokens = getTokens(defaultTheme);

  return defaultTheme;
};
