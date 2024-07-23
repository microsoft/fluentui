import * as tokens from './design-tokens.js';

/**
 * Not using the `Theme` type from `@fluentui/tokens` package to allow custom
 * tokens to be added.
 * @internal
 */
export type Theme = Record<string, string | number>;

const tokenNames = Object.keys(tokens) as (keyof Theme)[];

const SUPPORTS_REGISTER_PROPERTY = 'registerProperty' in CSS;
const SUPPORTS_ADOPTED_STYLE_SHEETS = 'adoptedStyleSheets' in document;
const themeStyleSheet = new CSSStyleSheet();
const themeStyleTextMap = new Map<Theme, string>();

/**
 * Sets the theme tokens on defaultNode.
 * @param theme - Flat object of theme token values.
 * @internal
 */
export const setTheme = (theme: Theme) => {
  // Fallback to setting token custom properties on `<html>` element’s `style`
  // attribute, only checking the support of  `document.adoptedStyleSheets`
  // here because it has broader support than `CSS.registerProperty()`, which
  // is checked later.
  if (!SUPPORTS_ADOPTED_STYLE_SHEETS) {
    setThemeFor(document.documentElement, theme);
    return;
  }

  if (!themeStyleTextMap.has(theme)) {
    const tokenDeclarations: string[] = [];

    for (const t of tokenNames) {
      if (SUPPORTS_REGISTER_PROPERTY) {
        try {
          CSS.registerProperty({
            name: `--${t}`,
            inherits: true,
            initialValue: theme[t] as string,
          });
        } catch {}
      }
      tokenDeclarations.push(`--${t}: ${theme[t] as string};`);
    }

    themeStyleTextMap.set(theme, `html{${tokenDeclarations.join('')}}`);
  }

  // Update the CSSStyleSheet with the new theme
  themeStyleSheet.replaceSync(themeStyleTextMap.get(theme)!);

  // Adopt the updated CSSStyleSheet if it hasn't been adopted yet
  if (!document.adoptedStyleSheets.includes(themeStyleSheet)) {
    document.adoptedStyleSheets.push(themeStyleSheet);
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
