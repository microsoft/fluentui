import type { Theme } from '@fluentui/tokens';
import * as tokens from './design-tokens.js';

const tokenNames = Object.keys(tokens) as (keyof Theme)[];

/**
 * Sets the theme tokens on defaultNode.
 * @param theme Flat object of theme token values.
 */
export const setTheme = (theme: Theme) => {
  for (const t of tokenNames) {
    document.body.style.setProperty(tokens[t] as string, theme[t] as string);
  }
};

export const setThemeFor = (element: HTMLElement, theme: Theme) => {
  for (const t of tokenNames) {
    element.style.setProperty(tokens[t] as string, theme[t] as string);
  }
};
