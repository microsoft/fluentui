import type { PartialTheme } from '@fluentui/react-theme';

const NAME_CHARACTER_PATTERN = /[-_a-z0-9\u0080-\uFFFF]/i;
const WHITESPACE_PATTERN = /[ \t\n\r\f]/;
const ESCAPE_PATTERN = /^\\(?:[0-9a-f]{1,6}(?:\r\n|[ \t\n\r\f])?|[^\n\r\f])/i;
const QUOTED_URL_PATTERN = /[ \t\n\r\f]*["']/y;

function escapeCharacter(character: string): string {
  return `\\${character.charCodeAt(0).toString(16).toUpperCase()} `;
}

function getEscapeLength(value: string, index: number): number {
  const escape = value.slice(index, index + 9).match(ESCAPE_PATTERN);
  return escape ? escape[0].length : 0;
}

function escapeForStyleTag(value: string, isSelector = false): string {
  const characters = isSelector ? '<{}' : '<>';
  // Consume whole backslash runs so escaping preserves their parity and does not retry overlapping suffixes.
  return value.replace(/\\+[<>{}]?|[<>{}]/g, match => {
    const character = match[match.length - 1];
    if (!characters.includes(character)) {
      return match;
    }

    const backslashes = match.length - 1;
    return match.slice(0, backslashes - (backslashes % 2)) + escapeCharacter(character);
  });
}

function isValidTokenName(name: string): boolean {
  for (let i = 0; i < name.length; i++) {
    if (name[i] === '\\') {
      const escapeLength = getEscapeLength(name, i);
      if (!escapeLength) {
        return false;
      }
      i += escapeLength - 1;
    } else if (!NAME_CHARACTER_PATTERN.test(name[i])) {
      return false;
    }
  }

  return name.length > 0;
}

function advanceUrlName(length: number, code: number): number {
  const expected = 'url'.charCodeAt(length);
  return code === expected || code + 32 === expected ? length + 1 : -1;
}

function containThemeValue(value: string, tokenName: string): string {
  const blocks: string[] = [];
  const chunks: string[] = [];
  let chunkStart = 0;
  let urlNameLength = 0;
  let quote = '';
  let comment = false;
  let url = false;
  let urlContent = false;
  let urlWhitespace = false;
  let malformedUrl = false;

  const escapeAt = (index: number) => {
    chunks.push(value.slice(chunkStart, index), escapeCharacter(value[index]));
    chunkStart = index + 1;
  };

  for (let i = 0; i < value.length; i++) {
    const character = value[i];
    const nextCharacter = value[i + 1];

    if (comment) {
      if (character === '*' && nextCharacter === '/') {
        comment = false;
        urlNameLength = 0;
        i++;
      }
      continue;
    }

    if (character === '\\') {
      const escapeLength = getEscapeLength(value, i);
      if (escapeLength) {
        if (!quote && !url) {
          const hexCode = parseInt(value.slice(i + 1, i + escapeLength), 16);
          urlNameLength = advanceUrlName(urlNameLength, Number.isNaN(hexCode) ? value.charCodeAt(i + 1) : hexCode);
        }
        i += escapeLength - 1;
      } else if (quote && /[\n\r\f]/.test(nextCharacter)) {
        i += nextCharacter === '\r' && value[i + 2] === '\n' ? 2 : 1;
      } else {
        escapeAt(i);
        urlNameLength = -1;
      }
      if (process.env.NODE_ENV !== 'production' && url) {
        malformedUrl ||= urlWhitespace;
        urlContent = true;
      }
      continue;
    }

    if (quote) {
      if (character === quote) {
        quote = '';
        urlNameLength = 0;
      } else if (/[\n\r\f]/.test(character)) {
        escapeAt(i);
      }
      continue;
    }

    // URL and bad-URL tokens consume content up to an unescaped ')', including comment markers and braces.
    if (url) {
      if (character === ')') {
        blocks.pop();
        url = false;
        urlNameLength = 0;
      } else if (process.env.NODE_ENV !== 'production') {
        if (WHITESPACE_PATTERN.test(character)) {
          urlWhitespace ||= urlContent;
        } else {
          malformedUrl ||= urlWhitespace || /["'(\u0000-\u0008\u000B\u000E-\u001F\u007F]/.test(character);
          urlContent = true;
        }
      }
      continue;
    }

    if (NAME_CHARACTER_PATTERN.test(character)) {
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
      if (character === '(' && functionNameIsUrl) {
        QUOTED_URL_PATTERN.lastIndex = i + 1;
        url = !QUOTED_URL_PATTERN.test(value);
        urlContent = false;
        urlWhitespace = false;
      }
      blocks.push(closingBlock);
    } else if (')]}'.includes(character)) {
      if (blocks[blocks.length - 1] === character) {
        blocks.pop();
      } else {
        escapeAt(i);
        urlNameLength = -1;
      }
    } else if (character === ';') {
      if (blocks.length === 0) {
        escapeAt(i);
        // Escaping joins the adjacent identifier, so it must not be mistaken for the function name "url".
        urlNameLength = -1;
      }
    }
  }

  // Complete open lexical contexts before appending the generated declaration delimiter.
  const suffix = (comment ? '*/' : quote) + blocks.reverse().join('');
  chunks.push(value.slice(chunkStart), suffix);
  if (chunkStart > 0 || suffix.length > 0 || malformedUrl) {
    warnThemeToken(tokenName, 'Containing a malformed CSS custom property value');
  }
  return chunks.join('');
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
 * Theme entries and the selector are developer-authored CSS. Boundary escaping is not a substitute for validating
 * dynamic theme data against an application-specific schema.
 */
export function createCSSRuleFromTheme(selector: string, theme: PartialTheme | undefined): string {
  const escapedSelector = escapeForStyleTag(selector, true);

  if (theme) {
    const cssVarsAsString = (Object.keys(theme) as (keyof typeof theme)[]).reduce((cssVarRule, cssVar) => {
      const tokenValue: unknown = theme[cssVar];
      if (!isValidTokenName(cssVar)) {
        warnThemeToken(cssVar, 'Ignoring an unsupported CSS custom property name');
        return cssVarRule;
      }
      if (typeof tokenValue !== 'string' && !Number.isFinite(tokenValue)) {
        warnThemeToken(cssVar, 'Ignoring an unsupported CSS custom property value');
        return cssVarRule;
      }

      // Scan the emitted syntax: an escaped angle bracket can change a URL name into a generic function name.
      const escapedValue = escapeForStyleTag(String(tokenValue).replace(/\0/g, '\uFFFD'));
      return `${cssVarRule}--${escapeForStyleTag(cssVar)}: ${containThemeValue(escapedValue, cssVar)}; `;
    }, '');

    return `${escapedSelector} { ${cssVarsAsString} }`;
  }

  return `${escapedSelector} {}`;
}
