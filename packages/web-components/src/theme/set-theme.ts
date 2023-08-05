import type { Theme } from '@fluentui/tokens';
import { FASTElement } from '@microsoft/fast-element';
import * as tokens from './design-tokens.js';

const tokenNames = Object.keys(tokens) as (keyof Theme)[];

/**
 * Sets the theme tokens on defaultNode.
 * @param theme Flat object of theme token values.
 */
export const setTheme = (theme: Theme) => {
  for (const t of tokenNames) {
    tokens[t].withDefault(theme[t] as string);
  }
};

export const setThemeFor = (element: FASTElement, theme: Theme) => {
  for (const t of tokenNames) {
    tokens[t].setValueFor(element, theme[t] as string);
  }
};
