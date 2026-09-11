import type * as React from 'react';

import type { ModuleLoader } from './modules';

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
  const notAllowed = requested.filter(name => !allowed.includes(name));

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

/**
 * Loads all requested modules (must be validated first) and returns a synchronous `require` implementation.
 */
export async function createRequire(
  requested: string[],
  loaders: Record<string, ModuleLoader>,
): Promise<(name: string) => unknown> {
  const entries = await Promise.all(
    requested.map(async name => {
      const loader = loaders[name];
      return [name, await loader()] as const;
    }),
  );
  const registry = new Map<string, unknown>(entries);

  return (name: string) => {
    if (!registry.has(name)) {
      throw new PlaygroundError('import', `Module "${name}" is not available in the playground.`);
    }
    return registry.get(name);
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PlaygroundComponent = React.ComponentType<any>;

type ModuleExports = Record<string, unknown> & { default?: unknown };

function isComponentLike(value: unknown): value is PlaygroundComponent {
  if (typeof value === 'function') {
    return true;
  }
  // React.memo / React.forwardRef / React.lazy results are objects with `$$typeof`
  return typeof value === 'object' && value !== null && '$$typeof' in value;
}

/**
 * Picks the component to render from module exports:
 * `default` -> `Default` -> first component-like export (matches story files: `export const Default = () => ...`)
 */
export function pickComponent(exports: ModuleExports): PlaygroundComponent {
  if (isComponentLike(exports.default)) {
    return exports.default;
  }

  if (isComponentLike(exports.Default)) {
    return exports.Default;
  }

  for (const [name, value] of Object.entries(exports)) {
    if (name !== '__esModule' && isComponentLike(value)) {
      return value;
    }
  }

  throw new PlaygroundError(
    'export',
    'Nothing to render. Export a component as default export (`export default function Example() {}`) or as a named export (`export const Default = () => ...`).',
  );
}

/**
 * Evaluates transpiled CommonJS code against the dependency allowlist and returns the component to render.
 */
export async function evaluate(code: string, loaders: Record<string, ModuleLoader>): Promise<PlaygroundComponent> {
  const allowed = Object.keys(loaders);
  const requested = getRequiredModules(code);

  assertAllowedModules(requested, allowed);

  const require = await createRequire(requested, loaders);
  const module = { exports: {} as ModuleExports };

  try {
    // Evaluating user code is the whole point of the playground; imports are restricted to the allowlist above.
    // eslint-disable-next-line no-new-func
    const fn = new Function('require', 'exports', 'module', code);
    fn(require, module.exports, module);
  } catch (error) {
    if (error instanceof PlaygroundError) {
      throw error;
    }
    const message = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
    throw new PlaygroundError('runtime', message);
  }

  return pickComponent(module.exports);
}
