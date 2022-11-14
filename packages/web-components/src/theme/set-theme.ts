import type { Theme } from '@fluentui/react-theme';
import * as tokens from './design-tokens';

/**
 * Sets the theme tokens on defaultNode.
 * @param theme Flat object of theme token values.
 */
export const setTheme = (theme: Theme) => {
  for (const t of Object.keys(tokens)) {
    tokens[t].withDefault(theme[t]);
  }
};
