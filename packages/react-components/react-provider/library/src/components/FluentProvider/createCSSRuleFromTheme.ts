import type { PartialTheme } from '@fluentui/react-theme';

const CSS_ESCAPE_MAP = {
  '<': '\\3C ',
  '>': '\\3E ',
};
const THEME_TOKEN_NAME_PATTERN = /^[-_a-zA-Z0-9\u0080-\uFFFF]+$/;
const OPENING_DELIMITERS: Record<string, string> = {
  '(': ')',
  '[': ']',
  '{': '}',
};
const CLOSING_DELIMITERS = new Set(Object.values(OPENING_DELIMITERS));
type DelimiterFrame = {
  closingDelimiter: string;
  urlState?: 'leading' | 'value' | 'trailing';
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

function isNewline(character: string): boolean {
  return character === '\n' || character === '\r' || character === '\f';
}

function isWhitespace(character: string): boolean {
  return character === ' ' || character === '\t' || isNewline(character);
}

function isNameCodePoint(character: string): boolean {
  return /^[-_a-zA-Z0-9\u0080-\uFFFF]$/.test(character);
}

function consumeEscape(value: string, escapeIndex: number): number | undefined {
  const nextCharacter = value[escapeIndex + 1];
  if (nextCharacter === undefined || isNewline(nextCharacter)) {
    return undefined;
  }

  if (/^[0-9a-fA-F]$/.test(nextCharacter)) {
    let index = escapeIndex + 1;
    let hexDigits = 0;

    while (hexDigits < 6 && /^[0-9a-fA-F]$/.test(value[index])) {
      index++;
      hexDigits++;
    }

    if (isWhitespace(value[index])) {
      if (value[index] === '\r' && value[index + 1] === '\n') {
        index++;
      }

      return index;
    }

    return index - 1;
  }

  return escapeIndex + 1;
}

function decodeIdentifier(value: string): string | undefined {
  let decodedValue = '';

  for (let i = 0; i < value.length; i++) {
    const character = value[i];

    if (character === '\\') {
      const nextCharacter = value[i + 1];
      if (nextCharacter === undefined || isNewline(nextCharacter)) {
        return undefined;
      }

      if (/^[0-9a-fA-F]$/.test(nextCharacter)) {
        let escapeEndIndex = i + 1;
        let hexDigits = 0;

        while (hexDigits < 6 && /^[0-9a-fA-F]$/.test(value[escapeEndIndex])) {
          escapeEndIndex++;
          hexDigits++;
        }

        const codePoint = Number.parseInt(value.slice(i + 1, escapeEndIndex), 16);
        decodedValue +=
          codePoint === 0 || codePoint > 0x10ffff || (codePoint >= 0xd800 && codePoint <= 0xdfff)
            ? '\uFFFD'
            : String.fromCodePoint(codePoint);

        if (isWhitespace(value[escapeEndIndex])) {
          if (value[escapeEndIndex] === '\r' && value[escapeEndIndex + 1] === '\n') {
            escapeEndIndex++;
          }

          i = escapeEndIndex;
        } else {
          i = escapeEndIndex - 1;
        }
      } else {
        decodedValue += nextCharacter;
        i++;
      }

      continue;
    }

    if (!isNameCodePoint(character)) {
      return undefined;
    }

    decodedValue += character;
  }

  return decodedValue;
}

function findUrlFunctionParentheses(value: string): Set<number> {
  const openingParentheses = new Set<number>();
  let identifierStart: number | undefined;

  for (let i = 0; i < value.length; i++) {
    const character = value[i];

    if (isNameCodePoint(character)) {
      identifierStart ??= i;
      continue;
    }

    if (character === '\\') {
      const escapeEndIndex = consumeEscape(value, i);
      if (escapeEndIndex !== undefined) {
        identifierStart ??= i;
        i = escapeEndIndex;
        continue;
      }
    }

    if (
      character === '(' &&
      identifierStart !== undefined &&
      decodeIdentifier(value.slice(identifierStart, i))?.toLowerCase() === 'url'
    ) {
      openingParentheses.add(i);
    }

    identifierStart = undefined;
  }

  return openingParentheses;
}

function isNonPrintable(character: string): boolean {
  const codePoint = character.charCodeAt(0);
  return (
    (codePoint >= 0 && codePoint <= 8) || codePoint === 11 || (codePoint >= 14 && codePoint <= 31) || codePoint === 127
  );
}

/**
 * Checks only the CSS structure needed to keep a value within its custom property declaration.
 * Semantic validation belongs to the application because custom tokens can represent any CSS property.
 */
function isValidThemeTokenValue(value: string): boolean {
  const delimiterFrames: DelimiterFrame[] = [];
  const urlFunctionParentheses = findUrlFunctionParentheses(value);
  let quote: '"' | "'" | undefined;
  let inComment = false;

  for (let i = 0; i < value.length; i++) {
    const character = value[i];
    const nextCharacter = value[i + 1];

    if (inComment) {
      if (character === '*' && nextCharacter === '/') {
        inComment = false;
        i++;
      }

      continue;
    }

    if (quote) {
      if (character === '\\') {
        if (nextCharacter === undefined) {
          return false;
        }

        if (nextCharacter === '\r' && value[i + 2] === '\n') {
          i++;
        }

        i++;
      } else if (character === quote) {
        quote = undefined;
      } else if (isNewline(character)) {
        return false;
      }

      continue;
    }

    const currentFrame = delimiterFrames[delimiterFrames.length - 1];
    if (currentFrame?.urlState) {
      if (currentFrame.urlState === 'leading') {
        if (isWhitespace(character)) {
          continue;
        }

        if (character === '"' || character === "'") {
          currentFrame.urlState = undefined;
        } else {
          currentFrame.urlState = 'value';
        }
      }

      if (currentFrame.urlState === 'value') {
        if (character === ')') {
          delimiterFrames.pop();
          continue;
        }

        if (isWhitespace(character)) {
          currentFrame.urlState = 'trailing';
          continue;
        }

        if (character === '\\') {
          const escapeEndIndex = consumeEscape(value, i);
          if (escapeEndIndex === undefined) {
            return false;
          }

          i = escapeEndIndex;
          continue;
        }

        if (character === '"' || character === "'" || character === '(' || isNonPrintable(character)) {
          return false;
        }

        continue;
      }

      if (currentFrame.urlState === 'trailing') {
        if (isWhitespace(character)) {
          continue;
        }

        if (character === ')') {
          delimiterFrames.pop();
          continue;
        }

        return false;
      }
    }

    if (character === '/' && nextCharacter === '*') {
      inComment = true;
      i++;
      continue;
    }

    if (character === '"' || character === "'") {
      quote = character;
      continue;
    }

    if (character === '\\') {
      if (nextCharacter !== undefined && isNewline(nextCharacter)) {
        continue;
      }

      const escapeEndIndex = consumeEscape(value, i);
      if (escapeEndIndex === undefined) {
        return false;
      }

      i = escapeEndIndex;
      continue;
    }

    const closingDelimiter = OPENING_DELIMITERS[character];
    if (closingDelimiter) {
      delimiterFrames.push({
        closingDelimiter,
        urlState: character === '(' && urlFunctionParentheses.has(i) ? 'leading' : undefined,
      });
      continue;
    }

    if (CLOSING_DELIMITERS.has(character)) {
      if (delimiterFrames.pop()?.closingDelimiter !== character) {
        return false;
      }

      continue;
    }

    if (character === ';' && delimiterFrames.length === 0) {
      return false;
    }
  }

  return quote === undefined && !inComment && delimiterFrames.length === 0;
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

      if (
        (typeof tokenValue !== 'string' && (typeof tokenValue !== 'number' || !Number.isFinite(tokenValue))) ||
        !isValidThemeTokenValue(String(tokenValue))
      ) {
        warnInvalidThemeToken(tokenName, 'value');
        return cssVarRule;
      }

      return `${cssVarRule}--${tokenName}: ${tokenValue}; `;
    }, '');

    return `${escapedSelector} { ${escapeForStyleTag(cssVarsAsString)} }`;
  }

  return `${escapedSelector} {}`;
}
