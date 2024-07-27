/**
 * Not using the `Theme` type from `@fluentui/tokens` package to allow custom
 * tokens to be added.
 * @internal
 */
export type Theme = Record<string, string | number>;

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

    for (const [tokenName, tokenValue] of Object.entries(theme)) {
      if (SUPPORTS_REGISTER_PROPERTY) {
        try {
          CSS.registerProperty({
            name: `--${tokenName}`,
            inherits: true,
            initialValue: tokenValue as string,
          });
        } catch {}
      }
      tokenDeclarations.push(`--${tokenName}: ${tokenValue};`);
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
  for (const [tokenName, tokenValue] of Object.entries(theme)) {
    element.style.setProperty(`--${tokenName}`, tokenValue.toString());
  }
};
