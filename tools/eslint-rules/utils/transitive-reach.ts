import * as ts from 'typescript';
import { isBareSpecifier, packageNameOf, resolveModule } from './module-resolver';

/**
 * Result of a single transitive-reach DFS over a source file's import graph.
 *  - `value` — packages reachable via value (non type-only) imports only. Used to decide
 *    whether a runtime reference can pull a forbidden runtime at execution time.
 *  - `all`   — packages reachable via value OR type imports. Used to decide whether a
 *    type reference can leak a forbidden runtime through the public API surface.
 * `value` is always a subset of `all`.
 */
export interface Reach {
  value: ReadonlySet<string>;
  all: ReadonlySet<string>;
}

export const EMPTY_REACH: Reach = { value: new Set(), all: new Set() };

/**
 * Per-Program cache: source file path → reach sets transitively computed from that file.
 * Both `value` and `all` sets are filled in a single DFS pass to share resolution work.
 *
 * Keyed by `ts.Program` identity so the cache is invalidated whenever
 * typescript-eslint rebuilds the Program.
 */
const programCache = new WeakMap<ts.Program, Map<string, Reach>>();

/**
 * Returns the bare package specifiers transitively reachable from `sourceFile`, computed in two
 * granularities in a single DFS pass:
 *   - `value` — only value (non type-only) imports are followed. Used to decide whether a runtime
 *     reference can pull a forbidden runtime at execution time.
 *   - `all`   — both value and type imports are followed. Used to decide whether a type reference
 *     can leak a forbidden runtime through the public API surface of a base hook.
 *
 * Memoized per Program × file. Cycle-safe.
 */
export function transitiveReach(program: ts.Program, sourceFile: ts.SourceFile): Reach {
  let cache = programCache.get(program);
  if (!cache) {
    cache = new Map();
    programCache.set(program, cache);
  }
  return computeReach(program, sourceFile, cache, new Set());
}

/**
 * Recursive worker for `transitiveReach`. Walks the import graph DFS, recording every bare
 * specifier encountered (separately for value-only vs value+type follow modes) and recursing into
 * each resolved source file. Uses `inProgress` to break cycles (cycle hits return empty sets
 * without caching, so the originating call still commits the complete result).
 */
export function computeReach(
  program: ts.Program,
  sourceFile: ts.SourceFile,
  cache: Map<string, Reach>,
  inProgress: Set<string>,
): Reach {
  const cached = cache.get(sourceFile.fileName);
  if (cached) {
    return cached;
  }
  if (inProgress.has(sourceFile.fileName)) {
    // Cycle: return empty sets without caching so the eventual full result is committed by the originator.
    return EMPTY_REACH;
  }
  inProgress.add(sourceFile.fileName);

  const value = new Set<string>();
  const all = new Set<string>();
  for (const imp of collectImports(sourceFile)) {
    if (isBareSpecifier(imp.specifier)) {
      const pkg = packageNameOf(imp.specifier);
      all.add(pkg);
      if (!imp.typeOnly) {
        value.add(pkg);
      }
    }
    const resolved = resolveModule(program, sourceFile, imp.specifier, imp.literal);
    if (!resolved) {
      continue;
    }
    const childSourceFile = program.getSourceFile(resolved);
    if (!childSourceFile) {
      continue;
    }
    const childReach = computeReach(program, childSourceFile, cache, inProgress);
    for (const pkg of childReach.all) {
      all.add(pkg);
    }
    if (!imp.typeOnly) {
      // A type-only edge does not propagate runtime reach: it can only widen the `all` set.
      for (const pkg of childReach.value) {
        value.add(pkg);
      }
    }
  }

  inProgress.delete(sourceFile.fileName);
  const result: Reach = { value, all };
  cache.set(sourceFile.fileName, result);
  return result;
}

export interface ImportEdge {
  specifier: string;
  literal: ts.StringLiteralLike;
  /** `true` when this edge only carries type information (no runtime side-effect). */
  typeOnly: boolean;
}

/**
 * Enumerates every module specifier in `sourceFile`, tagging each edge as value (`typeOnly: false`)
 * or type-only (`typeOnly: true`). `import type` / `export type`, fully type-only named import or
 * export clauses, and `import type =` are emitted with `typeOnly: true`. Side-effect imports
 * (no clause) are emitted as value edges.
 */
export function collectImports(sourceFile: ts.SourceFile): ImportEdge[] {
  const result: ImportEdge[] = [];
  for (const stmt of sourceFile.statements) {
    if (ts.isImportDeclaration(stmt)) {
      let typeOnly = false;
      if (stmt.importClause?.isTypeOnly) {
        typeOnly = true;
      } else if (
        stmt.importClause &&
        stmt.importClause.namedBindings &&
        ts.isNamedImports(stmt.importClause.namedBindings)
      ) {
        const named = stmt.importClause.namedBindings;
        const hasValue = !!stmt.importClause.name || named.elements.some(element => !element.isTypeOnly);
        typeOnly = !hasValue;
      }
      if (ts.isStringLiteralLike(stmt.moduleSpecifier)) {
        result.push({ specifier: stmt.moduleSpecifier.text, literal: stmt.moduleSpecifier, typeOnly });
      }
      continue;
    }
    if (ts.isExportDeclaration(stmt) && stmt.moduleSpecifier && ts.isStringLiteralLike(stmt.moduleSpecifier)) {
      let typeOnly = stmt.isTypeOnly;
      if (!typeOnly && stmt.exportClause && ts.isNamedExports(stmt.exportClause)) {
        typeOnly = stmt.exportClause.elements.every(element => element.isTypeOnly);
      }
      result.push({ specifier: stmt.moduleSpecifier.text, literal: stmt.moduleSpecifier, typeOnly });
      continue;
    }
    if (
      ts.isImportEqualsDeclaration(stmt) &&
      ts.isExternalModuleReference(stmt.moduleReference) &&
      ts.isStringLiteralLike(stmt.moduleReference.expression)
    ) {
      result.push({
        specifier: stmt.moduleReference.expression.text,
        literal: stmt.moduleReference.expression,
        typeOnly: stmt.isTypeOnly,
      });
    }
  }
  return result;
}
