const CSS_ESCAPE_MAP: Record<string, string> = {
  '<': '\\3C ',
  '>': '\\3E ',
};

type EscapeMode = 'all-angle-brackets' | 'style-terminator';

function escapeCssCharacters(value: string, mode: EscapeMode): string {
  let backslashCount = 0;
  let chunkStart = 0;
  let result: string[] | undefined;

  for (let i = 0; i < value.length; i++) {
    const character = value.charAt(i);

    if (character === '\\') {
      backslashCount++;
      continue;
    }

    const shouldEscape =
      mode === 'all-angle-brackets'
        ? character === '<' || character === '>'
        : character === '<' && value.slice(i + 1, i + 7).toLowerCase() === '/style';

    if (shouldEscape) {
      result = result || [];
      // An odd final backslash already escapes this character, so omit that backslash before
      // emitting the equivalent code-point escape. Even runs represent literal backslashes.
      result.push(value.slice(chunkStart, i - (backslashCount % 2)), CSS_ESCAPE_MAP[character]);
      chunkStart = i + 1;
    }

    backslashCount = 0;
  }

  if (!result) {
    return value;
  }

  result.push(value.slice(chunkStart));
  return result.join('');
}

export function escapeForStyleTag(value: string): string {
  return escapeCssCharacters(value, 'all-angle-brackets');
}

export function escapeStyleTagTerminator(css: string): string {
  return escapeCssCharacters(css, 'style-terminator');
}
