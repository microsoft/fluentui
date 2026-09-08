const CSS_ESCAPE_MAP: Record<string, string> = {
  '<': '\\3C ',
  '>': '\\3E ',
};

function escapeCssCharacter(backslashes: string, character: string): string {
  // An odd final backslash already escapes the character, so replace that pair rather than
  // appending another escape. Even runs represent literal backslashes and must be retained.
  const preservedBackslashes = backslashes.length % 2 === 0 ? backslashes : backslashes.slice(1);

  return preservedBackslashes + CSS_ESCAPE_MAP[character];
}

export function escapeForStyleTag(value: string): string {
  return value.replace(/(\\*)([<>])/g, (_match, backslashes: string, character: string) =>
    escapeCssCharacter(backslashes, character),
  );
}

export function escapeStyleTagTerminator(css: string): string {
  return css.replace(/(\\*)<(?=\/style)/gi, (_match, backslashes: string) => escapeCssCharacter(backslashes, '<'));
}
