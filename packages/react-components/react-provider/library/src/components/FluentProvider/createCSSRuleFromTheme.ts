import type { PartialTheme } from '@fluentui/react-theme';

const TOKEN_NAME_PATTERN = /^[-_a-z0-9\u0080-\uFFFF]+(?![\s\S])/i;
const LITERAL_PATTERN = /[-_a-z0-9\u0080-\uFFFF.#%,+ \t\n\r\f]/;
const STRING_PATTERN = /"[^"\\\u0000-\u001F\u007F]*"|'[^'\\\u0000-\u001F\u007F]*'/;
const FUNCTION_PATTERN =
  /(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color(?:-mix)?|cubic-bezier|steps|calc|clamp|min|max|var|env)\((?:[-_a-z0-9\u0080-\uFFFF.#%,+* \t\n\r\f]|\/(?!\*))*\)/;
// A conservative subset, not a CSS parser: strings have no escapes and functions cannot nest or contain comments.
const TOKEN_VALUE_PATTERN = new RegExp(
  `^(?:${LITERAL_PATTERN.source}|${STRING_PATTERN.source}|${FUNCTION_PATTERN.source})*(?![\\s\\S])`,
  'i',
);

function escapeCharacter(character: string): string {
  return `\\${character.charCodeAt(0).toString(16).toUpperCase()} `;
}

function escapeForStyleTag(value: string, isSelector = false): string {
  const characters = isSelector ? '<{}' : '<>{};';
  // Consume whole backslash runs so escaping preserves their parity and does not retry overlapping suffixes.
  return value.replace(/\\+[<>{};]?|[<>{};]/g, match => {
    const character = match[match.length - 1];
    if (!characters.includes(character)) {
      return match;
    }

    const backslashes = match.length - 1;
    return match.slice(0, backslashes - (backslashes % 2)) + escapeCharacter(character);
  });
}

function warnThemeToken(name: string, reason: string): void {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn(`@fluentui/react-provider: ${reason} for theme token ${JSON.stringify(name)}.`);
  }
}

/**
 * Creates a CSS rule from a theme object.
 *
 * Useful for scenarios when you want to apply theming statically to a top level elements like `body`.
 * Theme values must use supported literals, unescaped strings, or non-nested theme functions.
 * Unsupported entries are omitted rather than repaired. Validate dynamic data against an application-specific schema.
 */
export function createCSSRuleFromTheme(selector: string, theme: PartialTheme | undefined): string {
  const escapedSelector = escapeForStyleTag(selector, true);

  if (theme) {
    const cssVarsAsString = (Object.keys(theme) as (keyof typeof theme)[]).reduce((cssVarRule, cssVar) => {
      const tokenValue: unknown = theme[cssVar];
      if (!TOKEN_NAME_PATTERN.test(cssVar)) {
        warnThemeToken(cssVar, 'Ignoring an unsupported CSS custom property name');
        return cssVarRule;
      }
      if (
        (typeof tokenValue !== 'string' && (typeof tokenValue !== 'number' || !Number.isFinite(tokenValue))) ||
        !TOKEN_VALUE_PATTERN.test(String(tokenValue))
      ) {
        warnThemeToken(cssVar, 'Ignoring an unsupported CSS custom property value');
        return cssVarRule;
      }

      return `${cssVarRule}--${cssVar}: ${escapeForStyleTag(String(tokenValue))}; `;
    }, '');

    return `${escapedSelector} { ${cssVarsAsString} }`;
  }

  return `${escapedSelector} {}`;
}
