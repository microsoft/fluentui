import type { TSESTree, TSESLint, ParserServicesWithTypeInformation } from '@typescript-eslint/utils';
import { ESLintUtils, AST_NODE_TYPES } from '@typescript-eslint/utils';
import * as path from 'node:path';
import * as ts from 'typescript';

// NOTE: The rule will be available in ESLint configs as "@nx/workspace-base-hook-no-forbidden-runtime"
export const RULE_NAME = 'base-hook-no-forbidden-runtime';

/**
 * Names of v9 "base hooks": the implementation-only half of a `useFoo` / `useFooBase_unstable`
 * pair, kept free of focus/keyboard runtime so it can be composed by callers that may opt out
 * of those concerns.
 */
const BASE_HOOK_NAME_PATTERN = /^use[A-Z]\w*Base_unstable$/;

/**
 * Any function-literal form a base hook can take: top-level function declaration, inline arrow
 * function, or function expression bound to a variable / export.
 */
type BaseHookFunction = TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression;

const DEFAULT_WATCHED_PACKAGES: ReadonlyArray<string> = ['@fluentui/react-tabster'];
const DEFAULT_FORBIDDEN_RUNTIMES: ReadonlyArray<string> = ['tabster'];

type Options = [
  {
    /**
     * Packages whose imported symbols must be analyzed transitively.
     * A symbol imported from one of these packages is allowed inside a base
     * hook only if its defining source file does not reach any
     * `forbiddenRuntimes` package via value imports.
     */
    watchedPackages?: string[];
    /**
     * Runtime packages whose presence in the transitive value-import graph of
     * a referenced symbol is forbidden inside base hooks. Direct imports from
     * these packages are also forbidden.
     */
    forbiddenRuntimes?: string[];
    /**
     * When `true`, type-only imports (both from `forbiddenRuntimes` packages directly and
     * from `watchedPackages` whose defining module reaches a forbidden runtime) are permitted
     * inside base hooks. Type-only imports emit no runtime code, so this option trades API
     * decoupling for ergonomics.
     *
     * Defaults to `false` — type-only imports are checked the same way as value imports, to
     * keep the base hook's public API fully decoupled from forbidden runtimes.
     */
    allowTypeImports?: boolean;
  }?,
];

type MessageIds = 'forbiddenRuntimeDirect' | 'forbiddenRuntimeReach' | 'typedServicesUnavailable';

/**
 * The original (imported) name of an import specifier, used for diagnostics and for matching
 * against a forbidden/watched package's exports.
 *
 *  - named import         (`import { Foo }`)        → `'Foo'`
 *  - aliased named import (`import { Foo as Bar }`) → `'Foo'` (the original, not the alias)
 *  - default import       (`import X from 'pkg'`)   → `'default'`
 *  - namespace import     (`import * as X`)         → `'*'`
 */
type ImportSpecifierNode =
  | TSESTree.ImportSpecifier
  | TSESTree.ImportDefaultSpecifier
  | TSESTree.ImportNamespaceSpecifier;

/**
 * A locally-declared binding originating from a tracked import (a watched or forbidden-runtime
 * package). Built when walking `ImportDeclaration` nodes so body references can be matched in
 * O(1) via a `Map<Variable, TrackedImport>`.
 */
interface TrackedImport {
  /** The package the binding came from (a watched OR forbidden-runtime package). */
  package: string;
  /** Original imported name (not the local alias). `default` or `*` for default / namespace. */
  importedName: string;
  /** Kind of package — controls how the reference is checked. */
  kind: 'watched' | 'forbidden';
  /**
   * `true` when the binding is type-only (either the declaration is `import type ...`
   * or the specifier is `import { type Foo }`). Used to gate whether direct usage in a
   * value position is even possible (type-only bindings only surface in type positions).
   */
  isTypeOnly: boolean;
  /** The specifier node (used for symbol lookup via ParserServices). */
  specifier: ImportSpecifierNode;
}

/**
 * Result of a single transitive-reach DFS over a source file's import graph.
 *  - `value` — packages reachable via value (non type-only) imports only. Used to decide
 *    whether a runtime reference can pull a forbidden runtime at execution time.
 *  - `all`   — packages reachable via value OR type imports. Used to decide whether a
 *    type reference can leak a forbidden runtime through the public API surface.
 * `value` is always a subset of `all`.
 */
interface Reach {
  value: ReadonlySet<string>;
  all: ReadonlySet<string>;
}

type SymbolReach = Reach & { viaFile: string };

/**
 * Per-Program cache: source file path → reach sets transitively computed from that file.
 * Both `value` and `all` sets are filled in a single DFS pass to share resolution work.
 *
 * Keyed by `ts.Program` identity so the cache is invalidated whenever
 * typescript-eslint rebuilds the Program.
 */
const programCache = new WeakMap<ts.Program, Map<string, Reach>>();

export const rule = ESLintUtils.RuleCreator(() => __filename)<Options, MessageIds>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow inside v9 base hooks (`use<Name>Base_unstable`) any binding whose defining module transitively pulls a forbidden runtime package (default `tabster`) — both at value positions (runtime coupling) and at type positions (API surface coupling).',
    },
    schema: [
      {
        type: 'object',
        properties: {
          watchedPackages: {
            type: 'array',
            items: { type: 'string' },
            uniqueItems: true,
          },
          forbiddenRuntimes: {
            type: 'array',
            items: { type: 'string' },
            uniqueItems: true,
          },
          allowTypeImports: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      forbiddenRuntimeDirect:
        'Base hook `{{hookName}}` cannot reference `{{importedName}}` from forbidden runtime package `{{package}}`. Move logic that depends on `{{package}}` to the wrapping `*_unstable` hook instead.',
      forbiddenRuntimeReach:
        'Base hook `{{hookName}}` cannot reference `{{importedName}}` from `{{package}}` because its defining module transitively imports forbidden runtime `{{runtime}}` (via `{{viaFile}}`). Move logic that depends on `{{runtime}}` to the wrapping `*_unstable` hook instead.',
      typedServicesUnavailable:
        'base-hook-no-forbidden-runtime: transitive runtime analysis was skipped because TypeScript type information is unavailable. Enable typescript-eslint type-aware linting (set `parserOptions.projectService: true` or `parserOptions.project`) so references through watched packages (e.g. `{{watchedPackages}}`) can be verified against forbidden runtimes (e.g. `{{forbiddenRuntimes}}`).',
    },
  },
  defaultOptions: [{}],
  create(context) {
    const sourceCode = context.sourceCode;
    const options = context.options[0] ?? {};
    const watchedPackages = new Set(options.watchedPackages ?? DEFAULT_WATCHED_PACKAGES);
    const forbiddenRuntimes = new Set(options.forbiddenRuntimes ?? DEFAULT_FORBIDDEN_RUNTIMES);
    const allowTypeImports = options.allowTypeImports ?? false;
    // `forbidden` takes precedence: if the same name appears in both lists, treat the binding as forbidden.
    const trackedPackages = new Set<string>([...watchedPackages, ...forbiddenRuntimes]);

    // Map of locally-declared variable identity → original import origin metadata. Keyed by Variable
    // identity (not name) so re-declarations / shadowing inside the base hook resolve correctly.
    const trackedImports = new Map<TSESLint.Scope.Variable, TrackedImport>();

    // Tracks whether `computeSymbolReach` was invoked while typed services were unavailable. When set,
    // we emit a single diagnostic on `Program:exit` so the user knows transitive analysis was skipped.
    let typedServicesNeededButMissing = false;

    // Lazily-acquired typed services. Resolved once per file, cached in `typedServices` (undefined =
    // not yet attempted, null = attempted and unavailable, value = available).
    let typedServices: ParserServicesWithTypeInformation | null | undefined;

    /**
     * Returns typed services (TS Program + checker) for the current file, or `null` if untyped
     * lint is in effect. Result is memoized for the lifetime of the per-file rule instance.
     */
    function getTypedServices(): ParserServicesWithTypeInformation | null {
      if (typedServices !== undefined) {
        return typedServices;
      }
      try {
        typedServices = ESLintUtils.getParserServices(context);
      } catch {
        typedServices = null;
      }
      return typedServices;
    }

    /**
     * Walks the base hook's scope graph looking for references to any tracked import. Bails out
     * early if nothing is tracked, so the typical case (no watched/forbidden imports in the file)
     * stays free.
     */
    function checkBodyReferences(hookName: string, hookFn: BaseHookFunction): void {
      if (trackedImports.size === 0) {
        return;
      }
      const hookScope = sourceCode.getScope(hookFn);
      visitScope(hookScope, hookFn, hookName);
    }

    /**
     * Recursively visits `scope` and all its descendants that are still inside the base hook body.
     * For every resolved reference whose declaration is a tracked import, either flag the direct
     * usage or delegate to `computeSymbolReach` for the transitive check.
     *
     * The chosen reach set depends on the reference position:
     *  - value reference → `value` reach (runtime coupling)
     *  - type  reference → `all`   reach (API coupling — a type alias can still tie the public
     *                                      API to a forbidden runtime via its defining module)
     */
    function visitScope(scope: TSESLint.Scope.Scope, hookFn: BaseHookFunction, hookName: string): void {
      if (!isScopeWithinFunction(scope, hookFn)) {
        return;
      }

      scope.references.forEach(reference => {
        const resolved = reference.resolved;
        if (!resolved) {
          return;
        }
        const origin = trackedImports.get(resolved);
        if (!origin) {
          return;
        }

        const isTypeRef = reference.isTypeReference === true;
        // A type-only binding can only legally appear in type positions; ignore the (invalid)
        // value reference — TS will flag it independently.
        if (origin.isTypeOnly && !isTypeRef) {
          return;
        }

        if (origin.kind === 'forbidden') {
          context.report({
            node: reference.identifier,
            messageId: 'forbiddenRuntimeDirect',
            data: {
              hookName,
              importedName: origin.importedName,
              package: origin.package,
            },
          });
          return;
        }

        // Watched package: only flag if the defining module transitively reaches a forbidden runtime.
        const reach = computeSymbolReach(origin);
        if (!reach) {
          return; // untyped lint or unresolvable — silently skip
        }
        const reached = isTypeRef ? reach.all : reach.value;

        for (const runtime of forbiddenRuntimes) {
          if (reached.has(runtime)) {
            context.report({
              node: reference.identifier,
              messageId: 'forbiddenRuntimeReach',
              data: {
                hookName,
                importedName: origin.importedName,
                package: origin.package,
                runtime,
                viaFile: reach.viaFile,
              },
            });
            return;
          }
        }
      });

      scope.childScopes.forEach(child => visitScope(child, hookFn, hookName));
    }

    /**
     * Resolves the watched-package import to its defining module via TS `Program`, then queries the
     * transitive import graph for forbidden runtimes (both value-only and value+type sets).
     * Returns `null` (and flips the `typedServicesNeededButMissing` flag) when typed services
     * aren't available, so the caller can silently skip and we can warn once on `Program:exit`.
     */
    function computeSymbolReach(origin: TrackedImport): SymbolReach | null {
      const services = getTypedServices();
      if (!services) {
        typedServicesNeededButMissing = true;
        return null;
      }
      const checker = services.program.getTypeChecker();
      const tsNode = services.esTreeNodeToTSNodeMap.get(origin.specifier);
      if (!tsNode) {
        return null;
      }

      const nameNode = getImportSymbolNameNode(tsNode);
      if (!nameNode) {
        return null;
      }

      let symbol = checker.getSymbolAtLocation(nameNode);
      if (!symbol) {
        return null;
      }
      // eslint-disable-next-line no-bitwise -- ts.SymbolFlags is a bitfield enum
      if ((symbol.flags & ts.SymbolFlags.Alias) !== 0) {
        try {
          symbol = checker.getAliasedSymbol(symbol);
        } catch {
          return null;
        }
      }
      const declaration = symbol.declarations?.[0];
      const definingFile = declaration?.getSourceFile();
      if (!definingFile) {
        return null;
      }

      const reach = transitiveReach(services.program, definingFile);
      return { value: reach.value, all: reach.all, viaFile: shortenPath(definingFile.fileName) };
    }

    /**
     * `ImportDeclaration` visitor: records every named/default/namespace specifier coming from a
     * watched or forbidden-runtime package so body references can later be resolved via
     * `sourceCode.getDeclaredVariables`. Tracks both value AND type-only specifiers — type refs
     * are still inspected at the hook signature because a type from a watched package can
     * transitively expose a forbidden runtime through its defining module.
     */
    function trackImportDeclaration(node: TSESTree.ImportDeclaration): void {
      const source = node.source.value;
      if (typeof source !== 'string' || !trackedPackages.has(source)) {
        return;
      }
      const isForbiddenPkg = forbiddenRuntimes.has(source);
      const stmtTypeOnly = node.importKind === 'type';
      // Symmetric semantics: when `allowTypeImports` is true, type-only imports are exempt from
      // both direct forbidden-runtime checks AND transitive watched-package reach checks (a type
      // can never pull runtime code at execution time).
      if (stmtTypeOnly && allowTypeImports) {
        return;
      }
      const kind: TrackedImport['kind'] = isForbiddenPkg ? 'forbidden' : 'watched';

      node.specifiers.forEach(specifier => {
        const specTypeOnly =
          stmtTypeOnly || (specifier.type === AST_NODE_TYPES.ImportSpecifier && specifier.importKind === 'type');
        if (specTypeOnly && allowTypeImports) {
          return;
        }
        const importedName = getImportedName(specifier);
        if (importedName === undefined) {
          return;
        }
        for (const variable of sourceCode.getDeclaredVariables(specifier)) {
          trackedImports.set(variable, {
            package: source,
            importedName,
            kind,
            isTypeOnly: specTypeOnly,
            specifier,
          });
        }
      });
    }

    return {
      ImportDeclaration: trackImportDeclaration,

      // Match only base hooks — wrapping state hook signature is enforced by the sibling
      // `base-hook-signature` rule (which also handles pair detection).
      [`FunctionDeclaration[id.name=/${BASE_HOOK_NAME_PATTERN.source}/]`]: (node: TSESTree.FunctionDeclaration) => {
        if (!node.id) {
          return;
        }
        checkBodyReferences(node.id.name, node);
      },

      [`VariableDeclarator[id.name=/${BASE_HOOK_NAME_PATTERN.source}/]`]: (node: TSESTree.VariableDeclarator) => {
        const init = getFunctionInit(node);
        if (!init || node.id.type !== AST_NODE_TYPES.Identifier) {
          return;
        }
        checkBodyReferences(node.id.name, init);
      },

      /**
       * One-shot diagnostic so the user is informed (rather than silently degraded) when the
       * transitive runtime check was needed but skipped due to missing typed services.
       */
      'Program:exit'(programNode) {
        if (!typedServicesNeededButMissing) {
          return;
        }
        context.report({
          node: programNode,
          messageId: 'typedServicesUnavailable',
          data: {
            watchedPackages: [...watchedPackages].join(', '),
            forbiddenRuntimes: [...forbiddenRuntimes].join(', '),
          },
        });
      },
    };
  },
});

// ---------------------------------------------------------------------------
// Import-specifier helpers
// ---------------------------------------------------------------------------

/**
 * Resolves the identifier node that should be used for symbol lookup from a TS import node.
 * For named imports, this returns the imported name (right-hand side), not the local alias.
 */
function getImportSymbolNameNode(tsNode: ts.Node): ts.Node | undefined {
  if (ts.isImportSpecifier(tsNode)) {
    return tsNode.propertyName ?? tsNode.name;
  }
  if (ts.isImportClause(tsNode) || ts.isNamespaceImport(tsNode)) {
    return tsNode.name;
  }
  return tsNode;
}

function getImportedName(specifier: ImportSpecifierNode): string | undefined {
  switch (specifier.type) {
    case AST_NODE_TYPES.ImportSpecifier:
      return specifier.imported.type === AST_NODE_TYPES.Identifier
        ? specifier.imported.name
        : String(specifier.imported.value);
    case AST_NODE_TYPES.ImportDefaultSpecifier:
      return 'default';
    case AST_NODE_TYPES.ImportNamespaceSpecifier:
      return '*';
    default:
      return undefined;
  }
}

// ---------------------------------------------------------------------------
// Scope helpers
// ---------------------------------------------------------------------------

/**
 * Returns the function literal initializer of a `VariableDeclarator` when the declarator is a
 * plain Identifier bound to an inline arrow/function expression; otherwise `undefined`.
 */
function getFunctionInit(node: TSESTree.VariableDeclarator): BaseHookFunction | undefined {
  if (node.id.type !== AST_NODE_TYPES.Identifier) {
    return undefined;
  }
  const init = node.init;
  if (
    !init ||
    (init.type !== AST_NODE_TYPES.ArrowFunctionExpression && init.type !== AST_NODE_TYPES.FunctionExpression)
  ) {
    return undefined;
  }
  return init;
}

/**
 * `true` when `scope` (or any of its ancestor scopes) is the function scope of `hookFn`. Used to
 * confine the body-reference walk to the base hook itself — references in sibling functions are
 * out of scope for this rule.
 */
function isScopeWithinFunction(scope: TSESLint.Scope.Scope, hookFn: BaseHookFunction): boolean {
  let current: TSESLint.Scope.Scope | null = scope;
  while (current) {
    if (current.block === hookFn) {
      return true;
    }
    current = current.upper;
  }
  return false;
}

// ---------------------------------------------------------------------------
// Transitive value/type reach analysis
// ---------------------------------------------------------------------------

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
function transitiveReach(program: ts.Program, sourceFile: ts.SourceFile): Reach {
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
 * each resolved source file. Uses `inProgress` to break cycles by returning the already-cached,
 * in-progress reach object for the cycle participant.
 */
function computeReach(
  program: ts.Program,
  sourceFile: ts.SourceFile,
  cache: Map<string, Reach>,
  inProgress: Set<string>,
): Reach {
  const fileName = sourceFile.fileName;
  const cached = cache.get(fileName);
  if (cached) {
    return cached;
  }
  const value = new Set<string>();
  const all = new Set<string>();
  const result: Reach = { value, all };
  cache.set(fileName, result);
  if (inProgress.has(fileName)) {
    return result;
  }
  inProgress.add(fileName);

  try {
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
  } finally {
    inProgress.delete(fileName);
  }
  return result;
}

interface ImportEdge {
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
function collectImports(sourceFile: ts.SourceFile): ImportEdge[] {
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

// ---------------------------------------------------------------------------
// Module resolution helpers
// ---------------------------------------------------------------------------

/**
 * Resolves `specifier` (as used in `sourceFile`) to an absolute file path using TS Program module
 * resolution APIs available in TypeScript >= 5.3. Returns `undefined` if the module cannot be
 * resolved (e.g. ambient declarations, broken paths).
 */
function resolveModule(
  program: ts.Program,
  sourceFile: ts.SourceFile,
  specifier: string,
  literal: ts.StringLiteralLike,
): string | undefined {
  const getResolvedModule = (
    program as unknown as {
      getResolvedModule?: (
        file: ts.SourceFile,
        moduleName: string,
        mode?: ts.ResolutionMode,
      ) => { resolvedModule?: ts.ResolvedModuleFull } | undefined;
    }
  ).getResolvedModule;
  if (typeof getResolvedModule !== 'function') {
    return undefined;
  }

  const mode = (
    ts as unknown as {
      getModeForUsageLocation?: (file: ts.SourceFile, usage: ts.StringLiteralLike) => ts.ResolutionMode;
    }
  ).getModeForUsageLocation?.(sourceFile, literal);

  const resolutionResult = getResolvedModule.call(program, sourceFile, specifier, mode);
  return resolutionResult?.resolvedModule?.resolvedFileName;
}

/**
 * `true` when the import specifier refers to a package (e.g. `react`, `@scope/pkg`, `pkg/sub`)
 * rather than a relative or absolute path.
 */
function isBareSpecifier(specifier: string): boolean {
  return !specifier.startsWith('.') && !specifier.startsWith('/');
}

/**
 * Extracts the npm package name from a bare specifier. Handles both unscoped (`pkg/sub` → `pkg`)
 * and scoped (`@scope/pkg/sub` → `@scope/pkg`) forms.
 */
function packageNameOf(specifier: string): string {
  if (specifier.startsWith('@')) {
    const [scope, name] = specifier.split('/', 2);
    return name ? `${scope}/${name}` : scope;
  }
  const slash = specifier.indexOf('/');
  return slash === -1 ? specifier : specifier.slice(0, slash);
}

/**
 * Shortens an absolute file path for display in diagnostics: returns the part after the last
 * `node_modules/` segment when present (so users see e.g. `tabster/dist/index.js`), or makes the
 * path workspace-relative when inside the current working directory.
 */
function shortenPath(absolute: string): string {
  const resolvedAbsolute = path.resolve(absolute);
  const normalizedAbsolute = toPosixPath(resolvedAbsolute);
  const segments = normalizedAbsolute.split('/');
  const nodeModulesIdx = segments.lastIndexOf('node_modules');
  if (nodeModulesIdx !== -1 && nodeModulesIdx + 1 < segments.length) {
    return segments.slice(nodeModulesIdx + 1).join('/');
  }

  const relative = path.relative(path.resolve(process.cwd()), resolvedAbsolute);
  if (relative.length > 0 && !relative.startsWith('..') && !path.isAbsolute(relative)) {
    return toPosixPath(relative);
  }

  return normalizedAbsolute;
}

function toPosixPath(value: string): string {
  return value.replace(/\\/g, '/');
}
