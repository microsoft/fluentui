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
 * Sets the theme tokens as CSS Custom Properties. The Custom Properties are
 * set in a constructed stylesheet on `document.adoptedStyleSheets` if
 * supported, and on `document.documentElement.style` as a fallback.
 *
 * @param theme - Flat object of theme tokens. Each object entry’s key is the
 *     name of the token (usually in camel case) and used as the CSS Custom
 *     Property’s name. Note that this argument is not limited to existing
 *     theme objects (from `@fluentui/tokens`), you can pass in an arbitrary
 *     theme object as long as each entry’s value is either a string or a number.
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
      if (typeof tokenValue !== 'string' && Number.isNaN(tokenValue)) {
        throw new Error(
          `"${tokenName}" must be a string or a number.`,
        );
      }

      if (SUPPORTS_REGISTER_PROPERTY) {
        try {
          CSS.registerProperty({
            name: `--${tokenName}`,
            inherits: true,
            initialValue: tokenValue.toString(),
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
