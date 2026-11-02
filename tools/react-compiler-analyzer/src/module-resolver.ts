import { existsSync, statSync } from 'node:fs';
import { dirname, resolve, isAbsolute, join } from 'node:path';

/** A tsconfig-style path alias with at most one wildcard in its pattern and each target. */
export interface PathAlias {
  /** Text before `*`, or the entire specifier for an exact alias. */
  prefix: string;
  /** Text after `*`, if any. */
  suffix?: string;
  /** Absolute target patterns, preserving `*` for substitution with the matched text. */
  targets: string[];
  /** Whether the original alias contains a wildcard. */
  wildcard: boolean;
}

export interface ResolverOptions {
  /**
   * tsconfig `compilerOptions.paths`, already resolved to absolute target patterns.
   * Build with {@link compilePathAliases}. Used to resolve workspace aliases like `@app/foo`.
   */
  aliases?: PathAlias[];
  /** File extensions to try, in order. Defaults to `.ts`, `.tsx`. */
  extensions?: string[];
  /**
   * Counters incremented as specifiers are resolved. A run that reports zero risks but also
   * zero resolved bare specifiers means the aliases are misconfigured, not that the code is clean.
   */
  stats?: ResolverStats;
}

/** Tally of what the resolver could and could not reach. */
export interface ResolverStats {
  /** Specifiers resolved to first-party source. */
  resolved: number;
  /** Relative/absolute specifiers that pointed at nothing analyzable. */
  unresolvedRelative: number;
  /** Bare specifiers no alias matched — i.e. stopped at the package boundary. */
  unresolvedBare: number;
  /**
   * Imports matched per alias prefix, seeded with `0` for every configured alias. An alias sitting
   * at zero resolved nothing all run, which is the signature of a misconfigured `pathAliases`.
   * Patterns with a suffix use the full pattern so distinct suffixes do not share a counter.
   */
  aliasHits: Map<string, number>;
}

export function createResolverStats(): ResolverStats {
  return { resolved: 0, unresolvedRelative: 0, unresolvedBare: 0, aliasHits: new Map() };
}

/** Aliases whose static target prefixes are all absent, so they cannot resolve source. */
export function findDeadAliases(aliases: PathAlias[]): PathAlias[] {
  return aliases.filter(alias =>
    alias.targets.every(target => {
      const wildcard = target.indexOf('*');
      if (wildcard !== -1) {
        return !existsSync(dirname(target.slice(0, wildcard + 1)));
      }
      return !existsSync(target) && !DEFAULT_EXTENSIONS.some(extension => isFile(target + extension));
    }),
  );
}

const DEFAULT_EXTENSIONS = ['.ts', '.tsx'];

function aliasStatsKey(alias: PathAlias): string {
  return alias.suffix ? `${alias.prefix}*${alias.suffix}` : alias.prefix;
}

/**
 * Turn a raw tsconfig `paths` map + its `baseUrl` into absolute {@link PathAlias} entries.
 *
 * Example: `{ "@app/*": ["src/app/*"] }` with baseUrl `/repo` →
 * `{ prefix: "@app/", targets: ["/repo/src/app/*"], wildcard: true }`.
 * An interior target wildcard substitutes the match in place, not at the end.
 */
export function compilePathAliases(paths: Record<string, string[]>, baseUrl: string): PathAlias[] {
  const aliases: PathAlias[] = [];
  for (const [pattern, targets] of Object.entries(paths)) {
    const wildcardIndex = pattern.indexOf('*');
    const wildcard = wildcardIndex !== -1;
    const prefix = wildcard ? pattern.slice(0, wildcardIndex) : pattern;
    const suffix = wildcard ? pattern.slice(wildcardIndex + 1) : '';
    aliases.push({
      prefix,
      ...(suffix ? { suffix } : {}),
      targets: targets.map(target => resolve(baseUrl, target)),
      wildcard,
    });
  }
  // TypeScript prefers exact matches, then the longest wildcard prefix (ties keep declaration order).
  return aliases.sort((a, b) => Number(a.wildcard) - Number(b.wildcard) || b.prefix.length - a.prefix.length);
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

  // Seed every alias so one that never matches is reported as 0 rather than being absent.
  for (const alias of aliases) {
    options.stats?.aliasHits.set(aliasStatsKey(alias), 0);
  }

  function recordAliasHit(prefix: string): void {
    const hits = options.stats?.aliasHits;
    if (hits) {
      hits.set(prefix, (hits.get(prefix) ?? 0) + 1);
    }
  }

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
      let match = '';
      if (alias.wildcard) {
        const suffix = alias.suffix ?? '';
        if (
          !specifier.startsWith(alias.prefix) ||
          !specifier.endsWith(suffix) ||
          specifier.length < alias.prefix.length + suffix.length
        ) {
          continue;
        }
        match = specifier.slice(alias.prefix.length, specifier.length - suffix.length);
      } else if (specifier !== alias.prefix) {
        continue;
      }
      for (const target of alias.targets) {
        const candidate = alias.wildcard ? resolve(target.replace(/\*/g, () => match)) : target;
        const hit = resolveFileCandidate(candidate);
        if (hit) {
          recordAliasHit(aliasStatsKey(alias));
          return hit;
        }
      }
      return null;
    }
    return null;
  }

  /**
   * Resolve `specifier` imported from `fromFile` to an absolute first-party source path,
   * or `null` when it can't be resolved to analyzable source (package import, missing file, etc.).
   */
  return function resolveModule(specifier: string, fromFile: string): string | null {
    const stats = options.stats;
    if (specifier.startsWith('.') || isAbsolute(specifier)) {
      const base = specifier.startsWith('.') ? resolve(dirname(fromFile), specifier) : specifier;
      const hit = resolveFileCandidate(base);
      if (stats) {
        hit ? stats.resolved++ : stats.unresolvedRelative++;
      }
      return hit;
    }
    // Bare specifier: try aliases; otherwise it's a package boundary — stop here.
    const hit = resolveAlias(specifier);
    if (stats) {
      hit ? stats.resolved++ : stats.unresolvedBare++;
    }
    return hit;
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
