import type { PartialTheme } from '@fluentui/react-theme';

const ESCAPE_AT_START_PATTERN = /^\\(?:[0-9a-f]{1,6}(?:\r\n|[ \t\n\r\f])?|[^\n\r\f])/i;
// Disjoint escapes consume all available hex digits (up to six), preventing backtracking between token characters.
const TOKEN_NAME_PATTERN =
  /^(?:[-_a-z0-9\u0080-\uFFFF]|\\(?:(?:[0-9a-f]{6}|[0-9a-f]{1,5}(?![0-9a-f]))(?:\r\n|[ \t\n\r\f])?|[^0-9a-f\n\r\f]))+(?![\s\S])/i;

function advanceUrlName(length: number, characterCode: number): number {
  const expected = 'url'.charCodeAt(length);
  return characterCode === expected || characterCode + 32 === expected ? length + 1 : -1;
}

function escapeCharacter(character: string): string {
  return `\\${character.charCodeAt(0).toString(16).toUpperCase()} `;
}

/**
 * Escapes characters that could break out of a <style> tag during SSR.
 *
 * IMPORTANT: Do not strip quotes. Theme values legitimately include quoted font families and other CSS.
 * We only need to ensure the generated text cannot terminate the style tag and inject HTML.
 */
function escapeForStyleTag(value: string): string {
  // Consume each backslash run once so matching does not retry overlapping suffixes.
  return value.replace(/\\+[<>]?|[<>]/g, match => {
    const bracket = match[match.length - 1] as '<' | '>' | '\\';
    const runLength = bracket === '\\' ? match.length : match.length - 1;

    return bracket === '\\' ? match : match.slice(runLength % 2, runLength) + escapeCharacter(bracket);
  });
}

function containThemeTokenValue(value: string): string {
  // CSS preprocessing replaces NUL before tokenization, including in identifiers.
  value = value.replace(/\0/g, '\uFFFD');
  const result = value.split('');
  const blocks: string[] = [];
  const blockIndexes: Record<string, number[]> = { ')': [], ']': [], '}': [] };
  // -1 keeps a non-URL identifier invalid until its boundary, without accumulating its text.
  let urlNameLength = 0;
  let quote = '';
  let comment = false;
  let unquotedUrl = false;

  for (let i = 0; i < value.length; i++) {
    const character = value[i];
    const nextCharacter = value[i + 1];

    if (comment) {
      if (character === '*' && nextCharacter === '/') {
        comment = false;
        i++;
      }
      continue;
    }

    if (character === '\\') {
      const escape = value.slice(i, i + 9).match(ESCAPE_AT_START_PATTERN)?.[0];
      if (!quote && !unquotedUrl) {
        urlNameLength = escape
          ? advanceUrlName(urlNameLength, parseInt(escape.slice(1), 16) || escape.charCodeAt(1))
          : 0;
      }
      if (escape) {
        i += escape.length - 1;
      } else if (nextCharacter === undefined) {
        result[i] = '\\\n';
      } else if (quote) {
        i += nextCharacter === '\r' && value[i + 2] === '\n' ? 2 : 1;
      }
      continue;
    }

    if (quote) {
      if (character === quote) {
        quote = '';
      } else if (/[\n\r\f]/.test(character)) {
        result[i] = quote + character;
        quote = '';
      }
      continue;
    }

    if (unquotedUrl) {
      if (character === ')') {
        blocks.pop();
        blockIndexes[')'].pop();
        unquotedUrl = false;
        continue;
      }
      if (character === '"' || character === "'") {
        result[i] = escapeCharacter(character);
      }
      continue;
    }

    if (TOKEN_NAME_PATTERN.test(character)) {
      urlNameLength = advanceUrlName(urlNameLength, character.charCodeAt(0));
      continue;
    }

    const functionNameIsUrl = urlNameLength === 3;
    urlNameLength = character === '#' || character === '@' ? -1 : 0;
    const closingBlock = ')]}'['([{'.indexOf(character)];

    if (character === '/' && nextCharacter === '*') {
      comment = true;
      i++;
    } else if (character === '"' || character === "'") {
      quote = character;
    } else if (closingBlock) {
      blockIndexes[closingBlock].push(blocks.push(closingBlock) - 1);
      if (character === '(' && functionNameIsUrl) {
        // Quoted URLs use normal string/block handling; only unquoted URLs consume delimiters as URL content.
        unquotedUrl = !/^[ \t\n\r\f]*["']/.test(value.slice(i + 1));
      }
    } else if (character in blockIndexes) {
      const blockIndex = blockIndexes[character].pop();
      if (blockIndex !== undefined) {
        const repairedBlocks = blocks.splice(blockIndex + 1).reverse();
        for (const repairedBlock of repairedBlocks) {
          blockIndexes[repairedBlock].pop();
        }
        blocks.pop();
        result[i] = repairedBlocks.join('') + character;
      } else if (character === '}') {
        result[i] = escapeCharacter(character) + ' ';
      }
    } else if (character === ';' && blocks.length === 0) {
      // The escape consumes its terminator; keep a separate whitespace token before the following identifier.
      result[i] = escapeCharacter(character) + ' ';
    }
  }

  return result.join('') + quote + (comment ? '*/' : '') + blocks.reverse().join('');
}

function warnInvalidThemeToken(tokenName: string, reason: 'name' | 'value'): void {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn(
      `@fluentui/react-provider: Ignoring theme token ${JSON.stringify(
        tokenName,
      )} because its ${reason} is not valid for CSS custom property serialization.`,
    );
  }
}

/**
 * Creates a CSS rule from a theme object.
 *
 * Useful for scenarios when you want to apply theming statically to a top level elements like `body`.
 * Theme names, values, and the selector are developer-authored CSS and must not be populated directly from untrusted
 * data. This function structurally contains theme declarations, but does not validate whether CSS values are
 * appropriate for a particular application.
 */
export function createCSSRuleFromTheme(selector: string, theme: PartialTheme | undefined): string {
  const escapedSelector = escapeForStyleTag(selector);

  if (theme) {
    const cssVarsAsString = (Object.keys(theme) as (keyof typeof theme)[]).reduce((cssVarRule, cssVar) => {
      const tokenName = cssVar;
      const tokenValue: unknown = theme[cssVar];

      if (!TOKEN_NAME_PATTERN.test(tokenName)) {
        warnInvalidThemeToken(tokenName, 'name');
        return cssVarRule;
      }

      if (typeof tokenValue !== 'string' && (typeof tokenValue !== 'number' || !Number.isFinite(tokenValue))) {
        warnInvalidThemeToken(tokenName, 'value');
        return cssVarRule;
      }

      return `${cssVarRule}--${tokenName}: ${containThemeTokenValue(String(tokenValue))}; `;
    }, '');

    return `${escapedSelector} { ${escapeForStyleTag(cssVarsAsString)} }`;
  }

  return `${escapedSelector} {}`;
}
