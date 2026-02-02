import type { PartialTheme } from '@fluentui/react-theme';

/**
 * Pattern to sanitize CSS values and prevent XSS attacks during SSR.
 * Removes characters that could break out of CSS/HTML context: < > " '
 */
const CSS_SANITIZE_PATTERN = /[<>"']/g;

function sanitizeCSSValue(value: unknown) {
  return typeof value === 'string' ? value.replace(CSS_SANITIZE_PATTERN, '') : value;
}

/**
 * Creates a CSS rule from a theme object.
 *
 * Useful for scenarios when you want to apply theming statically to a top level elements like `body`.
 */
export function createCSSRuleFromTheme(selector: string, theme: PartialTheme | undefined): string {
  if (theme) {
    const cssVarsAsString = (Object.keys(theme) as (keyof typeof theme)[]).reduce((cssVarRule, cssVar) => {
      return `${cssVarRule}--${cssVar}: ${sanitizeCSSValue(theme[cssVar])}; `;
    }, '');

    return `${selector} { ${cssVarsAsString} }`;
  }

  return `${selector} {}`;
}
