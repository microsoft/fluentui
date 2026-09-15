export class PlaygroundError extends Error {
  public kind: 'compile' | 'import' | 'runtime' | 'export';

  constructor(kind: PlaygroundError['kind'], message: string) {
    super(message);
    this.name = 'PlaygroundError';
    this.kind = kind;
  }
}

const REQUIRE_REGEX = /\brequire\(\s*(["'])([^"']+)\1\s*\)/g;

/**
 * CSS imports are executed from story CSS modules encoded in the playground URL.
 * Other CSS files cannot be imported.
 */
export function isCssSpecifier(name: string): boolean {
  return /\.css$/i.test(name);
}

/**
 * Collects module specifiers from `require()` calls in transpiled CommonJS code.
 */
export function getRequiredModules(code: string): string[] {
  const modules = new Set<string>();

  for (const match of code.matchAll(REQUIRE_REGEX)) {
    modules.add(match[2]);
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
