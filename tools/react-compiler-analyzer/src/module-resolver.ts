import { existsSync, statSync } from 'node:fs';
import { dirname, resolve, isAbsolute, join } from 'node:path';

/** A single tsconfig-style path alias: a prefix (minus any trailing `*`) → candidate base dirs. */
export interface PathAlias {
  /** The alias prefix, e.g. `@app/` (the `*` is stripped). Empty string matches exact, non-`*` aliases. */
  prefix: string;
  /** Absolute candidate directories the alias maps to (the `*` target dirs). */
  targets: string[];
  /** Whether the original alias ended in `*` (a wildcard prefix match) vs. an exact specifier. */
  wildcard: boolean;
}

export interface ResolverOptions {
  /**
   * tsconfig `compilerOptions.paths`, already resolved to absolute target directories.
   * Build with {@link compilePathAliases}. Used to resolve workspace aliases like `@app/foo`.
   */
  aliases?: PathAlias[];
  /** File extensions to try, in order. Defaults to `.ts`, `.tsx`. */
  extensions?: string[];
}

const DEFAULT_EXTENSIONS = ['.ts', '.tsx'];

/**
 * Turn a raw tsconfig `paths` map + its `baseUrl` into absolute {@link PathAlias} entries.
 *
 * Example: `{ "@app/*": ["src/app/*"] }` with baseUrl `/repo` →
 * `{ prefix: "@app/", targets: ["/repo/src/app"], wildcard: true }`.
 */
export function compilePathAliases(paths: Record<string, string[]>, baseUrl: string): PathAlias[] {
  const aliases: PathAlias[] = [];
  for (const [pattern, targets] of Object.entries(paths)) {
    const wildcard = pattern.endsWith('/*') || pattern.endsWith('*');
    const prefix = pattern.replace(/\*$/, '');
    const absTargets = targets.map(t => resolve(baseUrl, t.replace(/\*$/, '').replace(/\/$/, '')));
    aliases.push({ prefix, targets: absTargets, wildcard });
  }
  // Longest prefix first so the most specific alias wins.
  return aliases.sort((a, b) => b.prefix.length - a.prefix.length);
}

/**
 * A focused, synchronous, dependency-free module resolver for **first-party** TypeScript.
 *
 * Resolves relative specifiers (`./`, `../`) and configured tsconfig path aliases to an
 * absolute `.ts`/`.tsx` file, trying extension and `/index` candidates. Bare/package
 * specifiers (`react`, `@scope/pkg`) deliberately return `null` — their implementations live
 * in `node_modules` (often `.d.ts`-only or minified), which the call-graph cannot analyze.
 *
 * This is intentionally narrower than TypeScript's resolver (no `node_modules` walking, no
 * conditional `exports`, no symlink realpath): the call-graph only needs to reach source it
 * can actually parse, and stopping at the package boundary is the correct, honest behavior.
 */
export function createModuleResolver(options: ResolverOptions = {}) {
  const extensions = options.extensions ?? DEFAULT_EXTENSIONS;
  const aliases = options.aliases ?? [];

  /** Try `base` itself (if it has an extension), then `base + ext`, then `base/index + ext`. */
  function resolveFileCandidate(base: string): string | null {
    if (/\.(ts|tsx)$/.test(base) && isFile(base)) {
      return base;
    }
    for (const ext of extensions) {
      const withExt = base + ext;
      if (isFile(withExt)) {
        return withExt;
      }
    }
    for (const ext of extensions) {
      const indexFile = join(base, `index${ext}`);
      if (isFile(indexFile)) {
        return indexFile;
      }
    }
    return null;
  }

  function resolveAlias(specifier: string): string | null {
    for (const alias of aliases) {
      if (alias.wildcard) {
        if (!specifier.startsWith(alias.prefix)) {
          continue;
        }
        const rest = specifier.slice(alias.prefix.length);
        for (const target of alias.targets) {
          const hit = resolveFileCandidate(rest ? join(target, rest) : target);
          if (hit) {
            return hit;
          }
        }
      } else if (specifier === alias.prefix) {
        for (const target of alias.targets) {
          const hit = resolveFileCandidate(target);
          if (hit) {
            return hit;
          }
        }
      }
    }
    return null;
  }

  /**
   * Resolve `specifier` imported from `fromFile` to an absolute first-party source path,
   * or `null` when it can't be resolved to analyzable source (package import, missing file, etc.).
   */
  return function resolveModule(specifier: string, fromFile: string): string | null {
    if (specifier.startsWith('.')) {
      return resolveFileCandidate(resolve(dirname(fromFile), specifier));
    }
    if (isAbsolute(specifier)) {
      return resolveFileCandidate(specifier);
    }
    // Bare specifier: try aliases; otherwise it's a package boundary — stop here.
    return resolveAlias(specifier);
  };
}

export type ModuleResolver = ReturnType<typeof createModuleResolver>;

function isFile(p: string): boolean {
  try {
    return existsSync(p) && statSync(p).isFile();
  } catch {
    return false;
  }
}
