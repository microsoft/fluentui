import type { PartialTheme } from '@fluentui/react-theme';

const BLOCKLIST_NAME_PATTERN = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~\u0000-\u0020\u007F]/;
const BLOCKLIST_VALUE_PATTERN = /[!<>{};[\]\\\u0000-\u0008\u000B\u000E-\u001F\u007F]|\/\*/;
const CLOSED_PARTS_PATTERN = /"[^"\u0000-\u001F\u007F]*"|'[^'\u0000-\u001F\u007F]*'|\([^"'()]*\)/g;
const BLOCKLIST_UNMATCHED_DELIMITERS_PATTERN = /["'()]/;

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
 * Values with blocked symbols or unsupported quotes/parentheses are omitted, not repaired.
 * No function-name or value-format allowlist is used. Validate dynamic data against an application-specific schema.
 */
export function createCSSRuleFromTheme(selector: string, theme: PartialTheme | undefined): string {
  const escapedSelector = escapeSelector(selector);

  if (theme) {
    const cssVarsAsString = (Object.keys(theme) as (keyof typeof theme)[]).reduce((cssVarRule, cssVar) => {
      const tokenValue: unknown = theme[cssVar];
      if (!cssVar || BLOCKLIST_NAME_PATTERN.test(cssVar)) {
        warnThemeToken(cssVar, 'Ignoring an unsupported CSS custom property name');
        return cssVarRule;
      }
      if (typeof tokenValue !== 'string' && (typeof tokenValue !== 'number' || !Number.isFinite(tokenValue))) {
        warnThemeToken(cssVar, 'Ignoring an unsupported CSS custom property value');
        return cssVarRule;
      }

      const value = String(tokenValue);
      // Ignore complete strings and flat parentheses only while looking for leftover syntax; never rewrite the value.
      if (
        BLOCKLIST_VALUE_PATTERN.test(value) ||
        BLOCKLIST_UNMATCHED_DELIMITERS_PATTERN.test(value.replace(CLOSED_PARTS_PATTERN, ''))
      ) {
        warnThemeToken(cssVar, 'Ignoring an unsupported CSS custom property value');
        return cssVarRule;
      }

      return `${cssVarRule}--${cssVar}: ${value}; `;
    }, '');

    return `${escapedSelector} { ${cssVarsAsString} }`;
  }

  return `${escapedSelector} {}`;
}
