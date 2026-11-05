/**
 * A small, linear JavaScript/TSX tokenizer used to find module references (`require()` calls, `import`/`export`
 * statements) without matching text inside strings, comments, template text, regular expression literals or JSX text.
 * It is not a parser: it only tracks enough context (brace, parenthesis and JSX nesting) to tell where a regular
 * expression literal may start and which characters are code.
 *
 * The Docs decorator uses `getModuleReferences` to check source imports before offering the playground action.
 * The preview runner uses `scanTokens` and `getRequireSpecifier` to preload transpiled CommonJS dependencies.
 * The sandbox's require shim independently enforces the runtime allowlist.
 */

export type ScannedToken =
  | { type: 'word'; value: string }
  | { type: 'punct'; value: string }
  /** `value` is the decoded content; `valid` is false for unterminated or multi-line literals. */
  | { type: 'string'; value: string; valid: boolean }
  | { type: 'other' };

export interface ScanOptions {
  /** Treat `<Tag …>` in expression position as JSX and skip its text. */
  jsx?: boolean;
}

/** After these keywords an expression starts, so `/` begins a regular expression and `{` an object literal. */
const EXPRESSION_KEYWORDS = new Set([
  'async',
  'await',
  'case',
  'default',
  'delete',
  'do',
  'else',
  'in',
  'instanceof',
  'new',
  'of',
  'return',
  'throw',
  'typeof',
  'void',
  'yield',
]);
/** Statement keywords whose `{` starts a block although an expression could follow them. */
const BLOCK_KEYWORDS = new Set(['do', 'else']);
/** A `)` closing these headers ends a statement head, so `/` after it begins a regular expression. */
const CONTROL_KEYWORDS = new Set(['if', 'while', 'for', 'with']);
const MULTI_CHARACTER_PUNCTUATORS = ['...', '=>', '++', '--', '?.'];

type BraceFrame = 'block' | 'object' | 'template' | 'jsxAttribute' | 'jsxChild';
type Frame = BraceFrame | { jsxDepth: number };
type Mode = 'code' | 'template' | 'jsxTag' | 'jsxChildren';

function isIdentifierCharacter(character: string | undefined): boolean {
  return character !== undefined && (/[\w$]/.test(character) || character.charCodeAt(0) > 127);
}

function isIdentifierStart(character: string | undefined): boolean {
  return isIdentifierCharacter(character) && !/\d/.test(character!);
}

function isWhitespace(character: string | undefined): boolean {
  return character !== undefined && /\s/.test(character);
}

/** Returns the index after a comment starting at `start`, or `start` when there is none. */
function skipComment(code: string, start: number): number {
  if (code.startsWith('//', start)) {
    const end = code.indexOf('\n', start + 2);
    return end === -1 ? code.length : end;
  }
  if (code.startsWith('/*', start)) {
    const end = code.indexOf('*/', start + 2);
    return end === -1 ? code.length : end + 2;
  }
  return start;
}

/**
 * Returns the index after a regular expression literal starting at `start`. `closed` is false when it does not close
 * on this line; `end` is then the line end.
 */
function skipRegex(code: string, start: number): { end: number; closed: boolean } {
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
      while (isIdentifierCharacter(code[index])) {
        index += 1;
      }
      return { end: index, closed: true };
    } else if (character === '\n' || character === '\r') {
      return { end: index, closed: false };
    }
  }
  return { end: code.length, closed: false };
}

function readString(code: string, start: number): { end: number; value: string; valid: boolean } {
  const quote = code[start];
  let value = '';
  for (let index = start + 1; index < code.length; index += 1) {
    const character = code[index];
    if (character === '\\') {
      value += code[index + 1] ?? '';
      index += 1;
    } else if (character === quote) {
      return { end: index + 1, value, valid: true };
    } else if (character === '\n' || character === '\r') {
      return { end: index, value, valid: false };
    } else {
      value += character;
    }
  }
  return { end: code.length, value, valid: false };
}

/** A `<` followed by `T,` or `T extends` is a generic arrow function's type parameter list, not JSX. */
function isTypeParameterList(code: string, start: number): boolean {
  let index = start + 1;
  while (isIdentifierCharacter(code[index])) {
    index += 1;
  }
  while (isWhitespace(code[index])) {
    index += 1;
  }
  return code[index] === ',' || (code.startsWith('extends', index) && isWhitespace(code[index + 'extends'.length]));
}

/**
 * Splits `code` into significant tokens. Runs in time linear in the input length and never recurses.
 */
export function scanTokens(code: string, options: ScanOptions = {}): ScannedToken[] {
  const tokens: ScannedToken[] = [];
  const frames: Frame[] = [];
  const parens: boolean[] = [];
  let mode: Mode = 'code';
  let exprAllowed = true;
  let closingTag = false;
  // A regex that failed to close makes the rest of its line invalid; don't retry it from every later `/`.
  let noRegexBefore = -1;

  const previous = () => tokens[tokens.length - 1] as ScannedToken | undefined;
  const isPropertyName = () => {
    const token = tokens[tokens.length - 2];
    return token?.type === 'punct' && (token.value === '.' || token.value === '?.');
  };
  const isKeyword = (token: ScannedToken | undefined, keywords: Set<string>) =>
    token?.type === 'word' && keywords.has(token.value) && !isPropertyName();
  const startsBlock = () => {
    const token = previous();
    if (!token) {
      return true;
    }
    if (token.type === 'punct') {
      return [')', '=>', ';', '{', '}'].includes(token.value);
    }
    return token.type === 'word' && (isKeyword(token, BLOCK_KEYWORDS) || !isKeyword(token, EXPRESSION_KEYWORDS));
  };
  const finishJsxElement = (frame: { jsxDepth: number }) => {
    if (frame.jsxDepth > 0) {
      mode = 'jsxChildren';
      return;
    }
    frames.pop();
    mode = 'code';
    exprAllowed = false;
  };

  let index = 0;
  while (index < code.length) {
    const character = code[index];

    if (mode === 'template') {
      if (character === '\\') {
        index += 2;
      } else if (character === '`') {
        index += 1;
        mode = 'code';
        exprAllowed = false;
      } else if (character === '$' && code[index + 1] === '{') {
        index += 2;
        frames.push('template');
        tokens.push({ type: 'punct', value: '${' });
        mode = 'code';
        exprAllowed = true;
      } else {
        index += 1;
      }
      continue;
    }

    if (mode === 'jsxChildren') {
      if (character === '{') {
        index += 1;
        frames.push('jsxChild');
        mode = 'code';
        exprAllowed = true;
      } else if (character === '<') {
        closingTag = code[index + 1] === '/';
        index += closingTag ? 2 : 1;
        mode = 'jsxTag';
      } else {
        index += 1;
      }
      continue;
    }

    if (mode === 'jsxTag') {
      const frame = frames[frames.length - 1] as { jsxDepth: number };
      const afterComment = skipComment(code, index);
      if (afterComment !== index) {
        index = afterComment;
      } else if (character === '"' || character === "'") {
        const end = code.indexOf(character, index + 1);
        index = end === -1 ? code.length : end + 1;
      } else if (character === '{') {
        index += 1;
        frames.push('jsxAttribute');
        mode = 'code';
        exprAllowed = true;
      } else if (character === '/' && code[index + 1] === '>') {
        index += 2;
        finishJsxElement(frame);
      } else if (character === '>') {
        index += 1;
        frame.jsxDepth += closingTag ? -1 : 1;
        closingTag = false;
        finishJsxElement(frame);
      } else {
        index += 1;
      }
      continue;
    }

    // code
    if (isWhitespace(character)) {
      index += 1;
      continue;
    }
    const afterComment = skipComment(code, index);
    if (afterComment !== index) {
      index = afterComment;
      continue;
    }

    if (character === '"' || character === "'") {
      const { end, value, valid } = readString(code, index);
      tokens.push({ type: 'string', value, valid });
      index = end;
      exprAllowed = false;
    } else if (character === '`') {
      tokens.push({ type: 'other' });
      index += 1;
      mode = 'template';
    } else if (isIdentifierStart(character)) {
      const start = index;
      while (isIdentifierCharacter(code[index])) {
        index += 1;
      }
      const token: ScannedToken = { type: 'word', value: code.slice(start, index) };
      tokens.push(token);
      exprAllowed = isKeyword(token, EXPRESSION_KEYWORDS);
    } else if (/\d/.test(character)) {
      while (isIdentifierCharacter(code[index]) || code[index] === '.') {
        index += 1;
      }
      tokens.push({ type: 'other' });
      exprAllowed = false;
    } else if (character === '/' && exprAllowed && index > noRegexBefore) {
      const { end, closed } = skipRegex(code, index);
      if (!closed) {
        noRegexBefore = end;
        tokens.push({ type: 'punct', value: '/' });
        index += 1;
      } else {
        tokens.push({ type: 'other' });
        index = end;
        exprAllowed = false;
      }
    } else if (
      options.jsx &&
      character === '<' &&
      exprAllowed &&
      (code[index + 1] === '>' || isIdentifierStart(code[index + 1])) &&
      !isTypeParameterList(code, index)
    ) {
      tokens.push({ type: 'other' });
      frames.push({ jsxDepth: 0 });
      closingTag = false;
      index += 1;
      mode = 'jsxTag';
    } else if (character === '{') {
      frames.push(startsBlock() ? 'block' : 'object');
      tokens.push({ type: 'punct', value: '{' });
      index += 1;
      exprAllowed = true;
    } else if (character === '}') {
      tokens.push({ type: 'punct', value: '}' });
      index += 1;
      const frame = typeof frames[frames.length - 1] === 'string' ? (frames.pop() as BraceFrame) : undefined;
      if (frame === 'template') {
        mode = 'template';
      } else if (frame === 'jsxAttribute') {
        mode = 'jsxTag';
        closingTag = false;
      } else if (frame === 'jsxChild') {
        mode = 'jsxChildren';
      } else {
        exprAllowed = frame === 'block';
      }
    } else if (character === '(') {
      parens.push(isKeyword(previous(), CONTROL_KEYWORDS));
      tokens.push({ type: 'punct', value: '(' });
      index += 1;
      exprAllowed = true;
    } else if (character === ')') {
      tokens.push({ type: 'punct', value: ')' });
      index += 1;
      exprAllowed = parens.pop() ?? false;
    } else {
      const value = MULTI_CHARACTER_PUNCTUATORS.find(punctuator => code.startsWith(punctuator, index)) ?? character;
      tokens.push({ type: 'punct', value });
      index += value.length;
      if (value === ']') {
        exprAllowed = false;
      } else if (value !== '++' && value !== '--') {
        exprAllowed = true;
      }
    }
  }

  return tokens;
}

const isPunct = (token: ScannedToken | undefined, value: string) => token?.type === 'punct' && token.value === value;
const isWord = (token: ScannedToken | undefined, value: string) => token?.type === 'word' && token.value === value;

/** Whether `tokens[index]` starts a `require("…")` call (not a method like `object.require`). */
export function getRequireSpecifier(tokens: readonly ScannedToken[], index: number): string | undefined {
  const argument = tokens[index + 2];
  if (
    isWord(tokens[index], 'require') &&
    !isPunct(tokens[index - 1], '.') &&
    !isPunct(tokens[index - 1], '?.') &&
    isPunct(tokens[index + 1], '(') &&
    argument?.type === 'string' &&
    argument.valid &&
    isPunct(tokens[index + 3], ')')
  ) {
    return argument.value;
  }
  return undefined;
}

export interface ModuleReference {
  specifier: string;
  /** `import type …` / `export type …`, erased before running. */
  typeOnly: boolean;
}

/**
 * Module references of TSX source: static and dynamic `import`s, `export … from` re-exports and `require()` calls.
 */
export function getModuleReferences(source: string): ModuleReference[] {
  const tokens = scanTokens(source, { jsx: true });
  const references: ModuleReference[] = [];
  const isPropertyAccess = (index: number) => isPunct(tokens[index - 1], '.') || isPunct(tokens[index - 1], '?.');
  const add = (token: ScannedToken | undefined, typeOnly: boolean) => {
    if (token?.type === 'string' && token.valid && token.value) {
      references.push({ specifier: token.value, typeOnly });
    }
  };

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    const required = getRequireSpecifier(tokens, index);
    if (required !== undefined) {
      add(tokens[index + 2], false);
      index += 3;
      continue;
    }
    if (token.type !== 'word' || (token.value !== 'import' && token.value !== 'export') || isPropertyAccess(index)) {
      continue;
    }

    const next = tokens[index + 1];
    if (token.value === 'import' && next?.type === 'string') {
      add(next, false);
      index += 1;
      continue;
    }
    if (token.value === 'import' && isPunct(next, '(') && isPunct(tokens[index + 3], ')')) {
      add(tokens[index + 2], false);
      index += 3;
      continue;
    }

    // The clause before `from` only contains names, braces, commas and `*`.
    let end = index + 1;
    while (
      tokens[end]?.type === 'word' ||
      isPunct(tokens[end], '{') ||
      isPunct(tokens[end], '}') ||
      isPunct(tokens[end], ',') ||
      isPunct(tokens[end], '*')
    ) {
      end += 1;
    }
    if (end - 1 > index && isWord(tokens[end - 1], 'from') && tokens[end]?.type === 'string') {
      const afterType = tokens[index + 2];
      const typeOnly =
        isWord(next, 'type') && !isPunct(afterType, ',') && !(isWord(afterType, 'from') && end === index + 3);
      add(tokens[end], typeOnly);
    }
    // Words inside the clause cannot start another reference; skipping it keeps the scan linear.
    index = Math.max(index, end - 1);
  }

  return references;
}
