export class PlaygroundError extends Error {
  public kind: 'compile' | 'import' | 'runtime' | 'export';

  constructor(kind: PlaygroundError['kind'], message: string) {
    super(message);
    this.name = 'PlaygroundError';
    this.kind = kind;
  }
}

function skipQuoted(code: string, start: number, quote: string): number {
  for (let index = start + 1; index < code.length; index += 1) {
    if (code[index] === '\\') {
      index += 1;
    } else if (code[index] === quote) {
      return index + 1;
    }
  }

  return code.length;
}

function skipTrivia(code: string, start: number): number {
  let index = start;
  while (index < code.length) {
    if (/\s/.test(code[index])) {
      index += 1;
    } else if (code.startsWith('//', index)) {
      index = code.indexOf('\n', index + 2);
      if (index === -1) {
        return code.length;
      }
    } else if (code.startsWith('/*', index)) {
      const end = code.indexOf('*/', index + 2);
      index = end === -1 ? code.length : end + 2;
    } else {
      break;
    }
  }

  return index;
}

function isRegexLiteralStart(code: string, start: number): boolean {
  if (code[start] !== '/' || code.startsWith('//', start) || code.startsWith('/*', start)) {
    return false;
  }

  let previous = start - 1;
  while (previous >= 0 && /\s/.test(code[previous])) {
    previous -= 1;
  }

  if (previous < 0) {
    return true;
  }

  const previousCharacter = code[previous];
  if ('([{!?:;,=+-*%&|^~<>'.includes(previousCharacter)) {
    return true;
  }

  const token = code.slice(0, previous + 1).match(/[$\w]+$/)?.[0];
  return Boolean(
    token && /^(?:async|await|case|delete|do|else|in|instanceof|new|of|return|throw|typeof|void|yield)$/.test(token),
  );
}

function skipRegexLiteral(code: string, start: number): number {
  let inCharacterClass = false;

  for (let index = start + 1; index < code.length; index += 1) {
    const character = code[index];
    if (character === '\\') {
      index += 1;
    } else if (character === '[') {
      inCharacterClass = true;
    } else if (character === ']') {
      inCharacterClass = false;
    } else if (character === '/' && !inCharacterClass) {
      index += 1;
      while (/[$\w]/.test(code[index] ?? '')) {
        index += 1;
      }
      return index;
    } else if ((character === '\n' || character === '\r') && !inCharacterClass) {
      return start + 1;
    }
  }

  return code.length;
}

function readString(code: string, start: number): { end: number; value: string } | undefined {
  const quote = code[start];
  if (quote !== '"' && quote !== "'") {
    return undefined;
  }

  let value = '';
  for (let index = start + 1; index < code.length; index += 1) {
    const character = code[index];
    if (character === '\\') {
      if (index + 1 >= code.length) {
        return undefined;
      }
      value += code[index + 1];
      index += 1;
    } else if (character === quote) {
      return { end: index + 1, value };
    } else {
      value += character;
    }
  }

  return undefined;
}

/**
 * CSS imports are executed from story CSS modules encoded in the playground URL.
 * Other CSS files cannot be imported.
 */
export function isCssSpecifier(name: string): boolean {
  return /\.css$/i.test(name);
}

/**
 * Collects module specifiers from real `require()` calls in transpiled CommonJS code.
 * This is an early preload list; the sandboxed `require` shim also enforces the allowlist at execution time.
 */
export function getRequiredModules(code: string): string[] {
  const modules = new Set<string>();

  for (let index = 0; index < code.length; ) {
    const character = code[index];
    if (character === '"' || character === "'" || character === '`') {
      index = skipQuoted(code, index, character);
      continue;
    }
    if (code.startsWith('//', index) || code.startsWith('/*', index)) {
      index = skipTrivia(code, index);
      continue;
    }
    if (isRegexLiteralStart(code, index)) {
      index = skipRegexLiteral(code, index);
      continue;
    }
    if (
      code.startsWith('require', index) &&
      !/[\w$]/.test(code[index - 1] ?? '') &&
      code[index - 1] !== '.' &&
      !/[\w$]/.test(code[index + 'require'.length] ?? '')
    ) {
      const openParen = skipTrivia(code, index + 'require'.length);
      if (code[openParen] === '(') {
        const argumentStart = skipTrivia(code, openParen + 1);
        const argument = readString(code, argumentStart);
        if (argument && code[skipTrivia(code, argument.end)] === ')') {
          modules.add(argument.value);
          index = argument.end;
          continue;
        }
      }
    }

    index += 1;
  }

  return Array.from(modules);
}

/**
 * Throws when code imports anything that isn't part of the allowlist.
 */
export function assertAllowedModules(requested: string[], allowed: string[]): void {
  const notAllowed = requested.filter(name => !allowed.includes(name) && !isCssSpecifier(name));

  if (notAllowed.length === 0) {
    return;
  }

  const list = notAllowed.map(name => `"${name}"`).join(', ');
  throw new PlaygroundError(
    'import',
    `Cannot import ${list}. Only pre-installed dependencies are available in the playground:\n${allowed
      .map(name => `  - ${name}`)
      .join('\n')}`,
  );
}
