import type { Theme } from '@fluentui/tokens';
import * as tokens from './design-tokens.js';

const tokenNames = Object.keys(tokens);

/**
 * Sets the theme tokens on defaultNode.
 * @param theme Flat object of theme token values.
 */
export const setTheme = (theme: Theme) => {
  for (const t of tokenNames) {
    tokens[t].withDefault(theme[t]);
  }
};
