import { Theme } from './types';
import { createTheme } from '@uifabric/styling';
import { getTokens } from './tokens/getTokens';

/**
 * Creates default theme (Fluent theme).
 */
export const createDefaultTheme = (): Theme => {
  const defaultTheme: Theme = createTheme({});
  defaultTheme.tokens = getTokens(defaultTheme);

  return defaultTheme;
};
