import type { PartialTheme } from '@fluentui/react-theme';

const CSS_ESCAPE_MAP: Record<string, string> = {
  '\\': '\\5C ',
  '<': '\\3C ',
  '>': '\\3E ',
  '{': '\\7B ',
  '}': '\\7D ',
  ';': '\\3B ',
};
const CSS_ESCAPE_PATTERN = /[\\<>{};]/g;

function escapeCharacter(character: string): string {
  return `\\${character.charCodeAt(0).toString(16).toUpperCase()} `;
}

function escapeSelector(value: string): string {
  // Consume whole backslash runs so escaping preserves their parity and does not retry overlapping suffixes.
  return value.replace(/\\+[<{}]?|[<{}]/g, match => {
    const character = match[match.length - 1];
    if (!'<{}'.includes(character)) {
      return match;
    }

    const backslashes = match.length - 1;
    return match.slice(0, backslashes - (backslashes % 2)) + escapeCharacter(character);
  });
}

/**
 * Escapes characters that could end the declaration, the rule or the surrounding <style> tag.
 *
 * Backslashes are escaped too, so a value cannot escape the declaration separator that follows it.
 * Other characters, including quotes and parentheses, are kept as-is: theme values legitimately contain quoted
 * font families and nested CSS functions such as `oklch(from var(--token) l c h / 0.5)`.
 */
function escapeThemeText(value: string): string {
  return value.replace(CSS_ESCAPE_PATTERN, match => CSS_ESCAPE_MAP[match]);
}

/**
 * Creates a CSS rule from a theme object.
 *
 * Useful for scenarios when you want to apply theming statically to a top level elements like `body`.
 */
export function createCSSRuleFromTheme(selector: string, theme: PartialTheme | undefined): string {
  const escapedSelector = escapeSelector(selector);

  if (theme) {
    const cssVarsAsString = (Object.keys(theme) as (keyof typeof theme)[]).reduce((cssVarRule, cssVar) => {
      const tokenValue: unknown = theme[cssVar];
      // Skip unset values (e.g. `undefined` from a nested provider) so they don't shadow inherited tokens.
      if (typeof tokenValue !== 'string' && (typeof tokenValue !== 'number' || !Number.isFinite(tokenValue))) {
        return cssVarRule;
      }

      return `${cssVarRule}--${escapeThemeText(cssVar)}: ${escapeThemeText(String(tokenValue))}; `;
    }, '');

    return `${escapedSelector} { ${cssVarsAsString} }`;
  }

  return `${escapedSelector} {}`;
}
