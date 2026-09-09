import type { PartialTheme } from '@fluentui/react-theme';

const CSS_ESCAPE_MAP = {
  '<': '\\3C ',
  '>': '\\3E ',
  ';': '\\3B ',
  '{': '\\7B ',
  '}': '\\7D ',
};
const THEME_TOKEN_NAME_PATTERN =
  /^(?:[-_a-z0-9\u0080-\uFFFF]|\\(?:[0-9a-f]{1,6}(?:\r\n|[ \t\n\r\f])?|[^0-9a-f\n\r\f]))+$/i;
const NAME_CHARACTER_PATTERN = /^[-_a-z0-9\u0080-\uFFFF]$/i;
const ESCAPE_AT_START_PATTERN = /^\\(?:[0-9a-f]{1,6}(?:\r\n|[ \t\n\r\f])?|[^\n\r\f])/i;
const URL_FUNCTION_PATTERN =
  /^(?:u|\\(?:u|0{0,4}[57]5(?:\r\n|[ \t\n\r\f])?))(?:r|\\(?:r|0{0,4}[57]2(?:\r\n|[ \t\n\r\f])?))(?:l|\\(?:l|0{0,4}[46]c(?:\r\n|[ \t\n\r\f])?))$/i;

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

    return bracket === '\\' ? match : match.slice(runLength % 2, runLength) + CSS_ESCAPE_MAP[bracket];
  });
}

function containThemeTokenValue(value: string): string {
  const result = value.split('');
  const blocks: string[] = [];
  const blockIndexes: Record<string, number[]> = { ')': [], ']': [], '}': [] };
  let identifier = '';
  let quote = '';
  let comment = false;
  let urlState = 0;

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

    if (quote) {
      if (character === '\\') {
        const escape = value.slice(i).match(ESCAPE_AT_START_PATTERN)?.[0];
        if (escape) {
          i += escape.length - 1;
        } else if (nextCharacter === undefined) {
          result[i] = '\\\n';
        } else {
          i += nextCharacter === '\r' && value[i + 2] === '\n' ? 2 : 1;
        }
      } else if (character === quote) {
        quote = '';
      } else if (/[\n\r\f]/.test(character)) {
        result[i] = quote + character;
        quote = '';
      }
      continue;
    }

    if (urlState) {
      if (urlState === 1 && /[ \t\n\r\f]/.test(character)) {
        continue;
      }
      if (urlState === 1 && (character === '"' || character === "'")) {
        urlState = 0;
        quote = character;
        continue;
      }
      if (character === ')') {
        const closingBlock = blocks.pop()!;
        blockIndexes[closingBlock].pop();
        urlState = 0;
        continue;
      }
      if (character === '"' || character === "'") {
        result[i] = character === '"' ? '\\22 ' : '\\27 ';
      }
      if (character === '\\') {
        const escape = value.slice(i).match(ESCAPE_AT_START_PATTERN)?.[0];
        if (escape) {
          i += escape.length - 1;
        } else if (nextCharacter === undefined) {
          result[i] = '\\\n';
        }
      }
      urlState = 2;
      continue;
    }

    if (NAME_CHARACTER_PATTERN.test(character)) {
      identifier += character;
      continue;
    }

    if (character === '\\') {
      const escape = value.slice(i).match(ESCAPE_AT_START_PATTERN)?.[0];
      if (escape) {
        identifier += escape;
        i += escape.length - 1;
      } else {
        identifier = '';
        if (nextCharacter === undefined) {
          result[i] = '\\\n';
        }
      }
      continue;
    }

    const functionNameIsUrl = URL_FUNCTION_PATTERN.test(identifier);
    identifier = character === '#' || character === '@' ? character : '';

    if (character === '/' && nextCharacter === '*') {
      comment = true;
      i++;
    } else if (character === '"' || character === "'") {
      quote = character;
    } else if (character === '(' || character === '[' || character === '{') {
      const closingBlock = character === '(' ? ')' : character === '[' ? ']' : '}';
      blockIndexes[closingBlock].push(blocks.push(closingBlock) - 1);
      if (character === '(' && functionNameIsUrl) {
        urlState = 1;
      }
    } else if (character === ')' || character === ']' || character === '}') {
      const blockIndex = blockIndexes[character].pop();
      if (blockIndex !== undefined) {
        const repairedBlocks = blocks.splice(blockIndex + 1).reverse();
        for (const closingBlock of repairedBlocks) {
          blockIndexes[closingBlock].pop();
        }
        blocks.pop();
        result[i] = repairedBlocks.join('') + character;
      } else if (character === '}') {
        result[i] = CSS_ESCAPE_MAP[character];
      }
    } else if (character === ';' && blocks.length === 0) {
      result[i] = CSS_ESCAPE_MAP[character];
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
      const tokenName = String(cssVar);
      const tokenValue: unknown = theme[cssVar];

      if (!THEME_TOKEN_NAME_PATTERN.test(tokenName)) {
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
