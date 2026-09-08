const CSS_ESCAPE_MAP: Record<string, string> = {
  '<': '\\3C ',
  '>': '\\3E ',
};

type ShouldEscape = (value: string, index: number, character: string) => boolean;

function escapeCssCharacters(value: string, shouldEscape: ShouldEscape): string {
  let backslashCount = 0;
  let chunkStart = 0;
  let result: string[] | undefined;

  for (let i = 0; i < value.length; i++) {
    const character = value.charAt(i);

    if (character === '\\') {
      backslashCount++;
      continue;
    }

    if (shouldEscape(value, i, character)) {
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
  return escapeCssCharacters(value, (_value, _index, character) => character === '<' || character === '>');
}

export function escapeStyleTagTerminator(css: string): string {
  return escapeCssCharacters(
    css,
    (value, index, character) => character === '<' && value.slice(index + 1, index + 7).toLowerCase() === '/style',
  );
}
