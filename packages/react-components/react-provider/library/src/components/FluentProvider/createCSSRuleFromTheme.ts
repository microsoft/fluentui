import type { PartialTheme } from '@fluentui/react-theme';

const CSS_ESCAPE_MAP = {
  '\\': '\\5C ',
  '<': '\\3C ',
  '>': '\\3E ',
  '{': '\\7B ',
  '}': '\\7D ',
};
/**
 * Escapes characters that could break out of the intended CSS rule (or the surrounding <style> tag) during SSR.
 *
 * IMPORTANT: Do not strip quotes. Theme values legitimately include quoted font families and other CSS.
 * We only need to ensure the generated text cannot terminate the enclosing rule/tag early.
 *
 * Note: backslashes must be escaped too, otherwise a value could smuggle one of the other
 * escape sequences above (e.g. a literal `\7D ` in the input) and have it interpreted by the
 * CSS parser as the character it represents.
 */
function escapeForStyleTag(value: string): string {
  // Escape as CSS code points so the resulting CSS still represents the same characters.
  return value.replace(/[\\<>{}]/g, match => CSS_ESCAPE_MAP[match as keyof typeof CSS_ESCAPE_MAP]);
}

function escapeThemeValue(value: string): string {
  return escapeForStyleTag(value).replace(/;/g, '\\3B ');
}

/**
 * Creates a CSS rule from a theme object.
 *
 * Useful for scenarios when you want to apply theming statically to a top level elements like `body`.
 */
export function createCSSRuleFromTheme(selector: string, theme: PartialTheme | undefined): string {
  const escapedSelector = escapeForStyleTag(selector);

  if (theme) {
    const cssVarsAsString = (Object.keys(theme) as (keyof typeof theme)[]).reduce((cssVarRule, cssVar) => {
      return `${cssVarRule}--${cssVar}: ${escapeThemeValue(`${theme[cssVar]}`)}; `;
    }, '');

    return `${escapedSelector} { ${cssVarsAsString} }`;
  }

  return `${escapedSelector} {}`;
}
