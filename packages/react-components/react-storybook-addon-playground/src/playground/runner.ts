import { getRequireSpecifier, scanTokens } from '../moduleScanner';

export interface PlaygroundErrorDiagnostic {
  message: string;
  line?: number;
  column?: number;
}

export class PlaygroundError extends Error {
  public kind: 'compile' | 'import' | 'runtime' | 'export';
  /** Source locations of compile errors. */
  public diagnostics?: PlaygroundErrorDiagnostic[];

  constructor(kind: PlaygroundError['kind'], message: string, diagnostics?: PlaygroundErrorDiagnostic[]) {
    super(message);
    this.name = 'PlaygroundError';
    this.kind = kind;
    this.diagnostics = diagnostics;
  }
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
 * Unlike tools/collect-typings.js, this scans executable JavaScript instead of declarations, so it skips strings,
 * comments, and regex literals before preloading modules for the iframe runtime.
 * This is an early preload list; the sandboxed `require` shim also enforces the allowlist at execution time.
 */
export function getRequiredModules(code: string): string[] {
  const tokens = scanTokens(code);
  const modules = new Set<string>();
  for (let index = 0; index < tokens.length; index += 1) {
    const specifier = getRequireSpecifier(tokens, index);
    if (specifier !== undefined) {
      modules.add(specifier);
    }
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
