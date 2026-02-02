import type { PartialTheme } from '@fluentui/react-theme';

/**
 * Pattern to sanitize CSS values and prevent XSS attacks during SSR.
 * Removes characters that could break out of CSS/HTML context: < > " '
 */
const CSS_SANITIZE_PATTERN = /[<>"']/g;

function sanitizeCSSDeclaration(value: string) {
  return value.replace(CSS_SANITIZE_PATTERN, '');
}

/**
 * Creates a CSS rule from a theme object.
 *
 * Useful for scenarios when you want to apply theming statically to a top level elements like `body`.
 */
export function createCSSRuleFromTheme(selector: string, theme: PartialTheme | undefined): string {
  if (theme) {
    const cssVarsAsString = (Object.keys(theme) as (keyof typeof theme)[]).reduce((cssVarRule, cssVar) => {
      return `${cssVarRule}--${cssVar}: ${theme[cssVar]}; `;
    }, '');

    return `${selector} { ${sanitizeCSSDeclaration(cssVarsAsString)} }`;
  }

  return `${selector} {}`;
}
