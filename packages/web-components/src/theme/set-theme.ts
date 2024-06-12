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
    let registered = false;

    if ('registerProperty' in CSS) {
      try {
        CSS.registerProperty({
          name: `--${t}`,
          inherits: true,
          initialValue: theme[t] as string,
        });
        registered = true;
      } catch {
        // Do nothing.
      }
    }

    if (!registered) {
      // TODO: Find a better way to update the values. Current approach adds
      // lots of code to the `style` attribute on `<body>`. Maybe look into
      // `document.adoptedStyleSheets`.
      setThemeFor(document.body, theme);
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
