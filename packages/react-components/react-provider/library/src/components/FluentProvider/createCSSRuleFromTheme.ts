import type { PartialTheme } from '@fluentui/react-theme';

const CSS_ESCAPE_MAP = {
  '<': '\\3C ',
  '>': '\\3E ',
};
/**
 * Escapes characters that could break out of a <style> tag during SSR.
 *
 * IMPORTANT: Do not strip quotes. Theme values legitimately include quoted font families and other CSS.
 * We only need to ensure the generated text cannot terminate the style tag and inject HTML.
 */
function escapeForStyleTag(value: string): string {
  // Escape as CSS code points so the resulting CSS still represents the same characters.
  // Using CSS escapes prevents the HTML parser from seeing a literal '<' / '>' and closing <style>.
  return value.replace(/[<>]/g, match => CSS_ESCAPE_MAP[match as keyof typeof CSS_ESCAPE_MAP]);
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

    return `${selector} { ${escapeForStyleTag(cssVarsAsString)} }`;
  }

  return `${selector} {}`;
}
