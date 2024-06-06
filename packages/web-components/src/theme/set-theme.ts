import type { Theme } from '@fluentui/tokens';
import * as tokens from './design-tokens.js';

const tokenNames = Object.keys(tokens) as (keyof Theme)[];

/**
 * Sets the theme tokens on defaultNode.
 * @param theme - Flat object of theme token values.
 * @internal
 */
export const setTheme = (theme: Theme) => {
  for (const t of tokenNames) {
    if ('registerProperty' in CSS) {
      CSS.registerProperty({
        name: `--${t}`,
        inherits: true,
        initialValue: theme[t] as string,
      });
    } else {
      document.body.style.setProperty(`--${t}`, theme[t] as string);
    }
  }
};

/**
 * @internal
 */
export const setThemeFor = (element: HTMLElement, theme: Theme) => {
  for (const t of tokenNames) {
    element.style.setProperty(`--${t}`, theme[t] as string);
  }
};
