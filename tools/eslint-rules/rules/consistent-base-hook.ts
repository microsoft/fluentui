import type { TSESTree, TSESLint, ParserServicesWithTypeInformation } from '@typescript-eslint/utils';
import { ESLintUtils, AST_NODE_TYPES } from '@typescript-eslint/utils';
import * as ts from 'typescript';
import * as fs from 'node:fs';
import * as path from 'node:path';

// NOTE: The rule will be available in ESLint configs as "@nx/workspace-consistent-base-hook"
export const RULE_NAME = 'consistent-base-hook';

const BASE_HOOK_NAME_PATTERN = /^use[A-Z]\w*Base_unstable$/;
// State hook candidates are any `_unstable` hook NOT ending in `Base_unstable`. They are only
// subjected to the signature contract when they are paired with a sibling base hook (Option C —
// pair detection). See `hasPairedBaseHook`.
const STATE_HOOK_NAME_PATTERN = /^use[A-Z]\w*_unstable$/;
const BASE_SUFFIX = 'Base_unstable';
const UNSTABLE_SUFFIX = '_unstable';
const SIBLING_EXTENSIONS: ReadonlyArray<string> = ['.ts', '.tsx'];
const EXPECTED_PARAM_NAMES = ['props', 'ref'] as const;
const MIN_PARAM_COUNT = 1;
const MAX_PARAM_COUNT = 2;

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

type MessageIds =
  | 'invalidParamCount'
  | 'invalidParamName'
  | 'invalidRefType'
  | 'forbiddenRuntimeDirect'
  | 'forbiddenRuntimeReach'
  | 'typedServicesUnavailable';

type ImportSpecifierNode =
  | TSESTree.ImportSpecifier
  | TSESTree.ImportDefaultSpecifier
  | TSESTree.ImportNamespaceSpecifier;

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

type BaseHookFunction = TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression;

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
        'Enforce the API contract for v9 "base" hooks (`use<Name>Base_unstable`) and their paired wrapping state hooks (`use<Name>_unstable` declared in the same file or sibling component-folder file): a required `props` parameter and an optional `ref` parameter typed as `React.Ref<...>`. Additionally, disallow inside base hooks any binding whose defining module transitively pulls a forbidden runtime package (default `tabster`) \u2014 both at value positions (runtime coupling) and at type positions (API surface coupling).',
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
      invalidParamCount:
        'Hook `{{hookName}}` must take 1 or 2 positional parameters (`props`, optional `ref`), got {{actual}}.',
      invalidParamName:
        'Hook `{{hookName}}` parameter #{{index}} must be named `{{expected}}` (Identifier), got `{{actual}}`.',
      invalidRefType: 'Hook `{{hookName}}` parameter `ref` must be typed as `React.Ref<...>`, got `{{actual}}`.',
      forbiddenRuntimeDirect:
        'Base hook `{{hookName}}` cannot reference `{{importedName}}` from forbidden runtime package `{{package}}`. Move logic that depends on `{{package}}` to the wrapping `*_unstable` hook instead.',
      forbiddenRuntimeReach:
        'Base hook `{{hookName}}` cannot reference `{{importedName}}` from `{{package}}` because its defining module transitively imports forbidden runtime `{{runtime}}` (via `{{viaFile}}`). Move logic that depends on `{{runtime}}` to the wrapping `*_unstable` hook instead.',
      typedServicesUnavailable:
        'consistent-base-hook: transitive runtime analysis was skipped because TypeScript type information is unavailable. Enable typescript-eslint type-aware linting (set `parserOptions.projectService: true` or `parserOptions.project`) so references through watched packages (e.g. `{{watchedPackages}}`) can be verified against forbidden runtimes (e.g. `{{forbiddenRuntimes}}`).',
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

    // Names of base hooks (`use<Name>Base_unstable`) declared at the top level of the current file.
    // Populated on `Program` enter so the state-hook visitor can synchronously decide pairing for
    // the same-file (82 / 85) case without re-scanning.
    const baseHooksInCurrentFile = new Set<string>();

    // Caches sibling-file existence checks (`./useXBase.ts` / `./useXBase.tsx`) for the lifetime of
    // this rule instance. The keys are absolute candidate paths; values are `true` if the file exists
    // on disk. Used to cover the 3 outliers where the base hook and wrapping hook live in sibling
    // files within the same component folder (Tooltip, Field, MenuItem).
    const siblingFileExistsCache = new Map<string, boolean>();

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
     * Entry point invoked for every function matching the base-hook naming pattern. Runs the
     * signature check first (cheap, AST-only) and then walks the body for forbidden references.
     */
    function checkBaseHook(hookName: string, hookFn: BaseHookFunction, reportNode: TSESTree.Node): void {
      checkParameters(hookName, hookFn, reportNode);
      checkBodyReferences(hookName, hookFn);
    }

    /**
     * Returns `true` when `stateHookName` (e.g. `useFoo_unstable`) is paired with a base hook
     * `useFooBase_unstable` declared either in the current file or in a sibling file within the
     * same directory (component folder convention `components/<Name>/useXBase.ts(x)`).
     *
     * The base hook is the structural marker for the `(props, ref)` contract. When found, the
     * wrapping state hook is required to honor the same contract; otherwise it is left alone,
     * which avoids false positives on unrelated `_unstable` hooks such as
     * `useFooContextValues_unstable`, `useFooStyles_unstable`, etc.
     */
    function hasPairedBaseHook(stateHookName: string): boolean {
      const baseHookName = stateHookName.slice(0, -UNSTABLE_SUFFIX.length) + BASE_SUFFIX;
      if (baseHooksInCurrentFile.has(baseHookName)) {
        return true;
      }
      const filename = context.filename;
      // ESLint passes synthetic filenames like `<input>` for inline code; nothing to check.
      if (!filename || !path.isAbsolute(filename)) {
        return false;
      }
      const dir = path.dirname(filename);
      // Sibling base-hook file (the wrapping hook lives in `useFoo.tsx`, the base in `useFooBase.tsx`).
      const siblingBasename = baseHookName.slice(0, -UNSTABLE_SUFFIX.length); // e.g. `useFooBase`
      for (const ext of SIBLING_EXTENSIONS) {
        const candidate = path.join(dir, siblingBasename + ext);
        if (candidate === filename) {
          continue;
        }
        let exists = siblingFileExistsCache.get(candidate);
        if (exists === undefined) {
          try {
            exists = fs.statSync(candidate).isFile();
          } catch {
            exists = false;
          }
          siblingFileExistsCache.set(candidate, exists);
        }
        if (exists) {
          return true;
        }
      }
      return false;
    }

    /**
     * Validates the base-hook signature: 1 or 2 positional params, first must be Identifier `props`,
     * optional second must be Identifier `ref` typed as `React.Ref<...>` (verified to originate from
     * the `react` package so collisions with same-named locals don't pass).
     */
    function checkParameters(hookName: string, hookFn: BaseHookFunction, reportNode: TSESTree.Node): void {
      if (hookFn.params.length < MIN_PARAM_COUNT || hookFn.params.length > MAX_PARAM_COUNT) {
        context.report({
          node: reportNode,
          messageId: 'invalidParamCount',
          data: { hookName, actual: hookFn.params.length },
        });
        return;
      }

      hookFn.params.forEach((param, index) => {
        const expected = EXPECTED_PARAM_NAMES[index];
        if (param.type !== AST_NODE_TYPES.Identifier || param.name !== expected) {
          context.report({
            node: reportNode,
            messageId: 'invalidParamName',
            data: { hookName, index: index + 1, expected, actual: describeParam(param) },
          });
          return;
        }
        if (index === 1 && !isReactRefTypeAnnotation(param.typeAnnotation, sourceCode.getScope(param))) {
          context.report({
            node: reportNode,
            messageId: 'invalidRefType',
            data: { hookName, actual: describeRefType(param.typeAnnotation) },
          });
        }
      });
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
    function computeSymbolReach(
      origin: TrackedImport,
    ): { value: ReadonlySet<string>; all: ReadonlySet<string>; viaFile: string } | null {
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

      // For an ImportSpecifier we want the imported (right-hand) identifier so the symbol resolves to
      // the exported name on the source module, not the local alias.
      let nameNode: ts.Node | undefined;
      if (ts.isImportSpecifier(tsNode)) {
        nameNode = tsNode.propertyName ?? tsNode.name;
      } else if (ts.isImportClause(tsNode) || ts.isNamespaceImport(tsNode)) {
        nameNode = tsNode.name;
      } else {
        nameNode = tsNode;
      }
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

    /**
     * Returns the function literal initializer of a `VariableDeclarator` when the declarator is a
     * plain Identifier bound to an inline arrow/function expression; otherwise `undefined`. Skips
     * destructuring patterns (no inspectable function literal) and non-function initializers
     * (call expressions, identifier aliases, missing initializer for ambients).
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

    return {
      // Populate `baseHooksInCurrentFile` from top-level declarations so the state-hook visitor can
      // synchronously decide pairing for the same-file case (82 / 85 occurrences across react-components).
      Program(node: TSESTree.Program): void {
        for (const stmt of node.body) {
          collectBaseHookNames(stmt, baseHooksInCurrentFile);
        }
      },

      ImportDeclaration: trackImportDeclaration,

      // Broader selector matches both base hooks and state-hook candidates; the handler dispatches
      // by name. State hooks only get the signature check when paired with a sibling base hook.
      [`FunctionDeclaration[id.name=/${STATE_HOOK_NAME_PATTERN.source}/]`]: (node: TSESTree.FunctionDeclaration) => {
        // `export default function () {}` produces an anonymous FunctionDeclaration (id === null).
        // The esquery selector above requires `id.name`, so this branch should be unreachable in
        // practice — kept as a type-narrowing guard so TS treats `node.id` as non-null below.
        if (!node.id) {
          return;
        }
        const name = node.id.name;
        if (BASE_HOOK_NAME_PATTERN.test(name)) {
          checkBaseHook(name, node, node.id);
        } else if (hasPairedBaseHook(name)) {
          checkParameters(name, node, node.id);
        }
      },

      [`VariableDeclarator[id.name=/${STATE_HOOK_NAME_PATTERN.source}/]`]: (node: TSESTree.VariableDeclarator) => {
        const init = getFunctionInit(node);
        if (!init || node.id.type !== AST_NODE_TYPES.Identifier) {
          return;
        }
        const name = node.id.name;
        if (BASE_HOOK_NAME_PATTERN.test(name)) {
          checkBaseHook(name, init, node.id);
        } else if (hasPairedBaseHook(name)) {
          checkParameters(name, init, node.id);
        }
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
// Transitive import-graph analysis
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
 * each resolved source file. Uses `inProgress` to break cycles (cycle hits return empty sets
 * without caching, so the originating call still commits the complete result).
 */
function computeReach(
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

const EMPTY_REACH: Reach = { value: new Set(), all: new Set() };

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

/**
 * Resolves `specifier` (as used in `sourceFile`) to an absolute file path using the same algorithm
 * the host TS Program uses. Prefers the (faster) `program.getResolvedModule` API exposed in TS ≥ 5.3
 * and falls back to `ts.resolveModuleName` for older toolchains. Returns `undefined` if the module
 * cannot be resolved (e.g. ambient declarations, broken paths).
 */
function resolveModule(
  program: ts.Program,
  sourceFile: ts.SourceFile,
  specifier: string,
  literal: ts.StringLiteralLike,
): string | undefined {
  // TS ≥ 5.3 exposes program.getResolvedModule
  const getResolvedModule = (
    program as unknown as {
      getResolvedModule?: (
        file: ts.SourceFile,
        moduleName: string,
        mode?: ts.ResolutionMode,
      ) => { resolvedModule?: ts.ResolvedModuleFull } | undefined;
    }
  ).getResolvedModule;
  const mode = (
    ts as unknown as {
      getModeForUsageLocation?: (file: ts.SourceFile, usage: ts.StringLiteralLike) => ts.ResolutionMode;
    }
  ).getModeForUsageLocation?.(sourceFile, literal);

  if (typeof getResolvedModule === 'function') {
    const resolutionResult = getResolvedModule.call(program, sourceFile, specifier, mode);
    if (resolutionResult?.resolvedModule) {
      return resolutionResult.resolvedModule.resolvedFileName;
    }
  }

  // Fallback for older TS: use ts.resolveModuleName against the compiler host.
  const compilerOptions = program.getCompilerOptions();
  const host =
    (program as unknown as { getCompilerHost?: () => ts.ModuleResolutionHost }).getCompilerHost?.() ?? ts.sys;
  const result = ts.resolveModuleName(
    specifier,
    sourceFile.fileName,
    compilerOptions,
    host as ts.ModuleResolutionHost,
    undefined,
    undefined,
    mode,
  );
  return result.resolvedModule?.resolvedFileName;
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
  const marker = '/node_modules/';
  const idx = absolute.lastIndexOf(marker);
  if (idx !== -1) {
    return absolute.slice(idx + marker.length);
  }
  const cwd = process.cwd();
  if (absolute.startsWith(cwd)) {
    return absolute.slice(cwd.length + 1);
  }
  return absolute;
}

// ---------------------------------------------------------------------------
// AST helpers (unchanged from previous version)
// ---------------------------------------------------------------------------

/**
 * Collects names of top-level declarations matching `BASE_HOOK_NAME_PATTERN` into `out`.
 * Handles both `export const useFooBase_unstable = ...` (incl. `export const` chains) and
 * `export function useFooBase_unstable() {}`, plus the unexported / `export { ... }` forms.
 */
function collectBaseHookNames(stmt: TSESTree.Node, out: Set<string>): void {
  // `export const useFooBase_unstable = ...` / `export function useFooBase_unstable() {}`
  if (stmt.type === AST_NODE_TYPES.ExportNamedDeclaration && stmt.declaration) {
    collectBaseHookNames(stmt.declaration, out);
    return;
  }
  // `function useFooBase_unstable() {}`
  if (stmt.type === AST_NODE_TYPES.FunctionDeclaration) {
    if (stmt.id && BASE_HOOK_NAME_PATTERN.test(stmt.id.name)) {
      out.add(stmt.id.name);
    }
    return;
  }
  // `const useFooBase_unstable = ...` (incl. multi-declarator forms)
  if (stmt.type === AST_NODE_TYPES.VariableDeclaration) {
    for (const decl of stmt.declarations) {
      if (decl.id.type === AST_NODE_TYPES.Identifier && BASE_HOOK_NAME_PATTERN.test(decl.id.name)) {
        out.add(decl.id.name);
      }
    }
  }
}

/**
 * Resolves the original (imported) name from an import specifier.
 * Returns `'default'` for default imports, `'*'` for namespace imports,
 * and the imported identifier/string-literal name for named imports.
 */
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

/**
 * Returns a human-readable label for a function parameter, used in `invalidParamName` diagnostics
 * so the user sees what they actually wrote (destructuring, rest, default value, …) instead of
 * just `Identifier`.
 */
function describeParam(param: TSESTree.Parameter): string {
  switch (param.type) {
    case AST_NODE_TYPES.Identifier:
      return param.name;
    case AST_NODE_TYPES.ObjectPattern:
      return '{ ... }';
    case AST_NODE_TYPES.ArrayPattern:
      return '[ ... ]';
    case AST_NODE_TYPES.RestElement:
      return '...rest';
    case AST_NODE_TYPES.AssignmentPattern:
      return param.left.type === AST_NODE_TYPES.Identifier ? `${param.left.name} = …` : '… = …';
    default:
      return param.type;
  }
}

/**
 * Returns `true` when `annotation` is `React.Ref<...>` (qualified) or `Ref<...>` (named) AND the
 * referenced identifier was imported from the `react` package in the surrounding scope. The scope
 * check guards against false positives when a local `Ref` shadows the React import.
 */
function isReactRefTypeAnnotation(
  annotation: TSESTree.TSTypeAnnotation | undefined,
  scope: TSESLint.Scope.Scope,
): boolean {
  if (!annotation) {
    return false;
  }
  const type = annotation.typeAnnotation;
  if (type.type !== AST_NODE_TYPES.TSTypeReference) {
    return false;
  }
  const { typeName } = type;
  if (typeName.type === AST_NODE_TYPES.Identifier) {
    return typeName.name === 'Ref' && isReactImportedIdentifier(typeName, scope, 'Ref');
  }
  if (typeName.type === AST_NODE_TYPES.TSQualifiedName) {
    return (
      typeName.left.type === AST_NODE_TYPES.Identifier &&
      typeName.left.name === 'React' &&
      typeName.right.name === 'Ref' &&
      isReactImportedIdentifier(typeName.left, scope, '*')
    );
  }
  return false;
}

/**
 * Resolves the given identifier in `scope` and verifies it was imported from the `react`
 * package. `expectedImportedName` is matched against the original import name:
 *   - a named-import specifier (e.g. `import { Ref } from 'react'`) must match the name,
 *   - a namespace/default import (e.g. `import * as React from 'react'`) matches `'*'`/`'default'`.
 *
 * Untyped fallback (scope-only): does not require ParserServices, so the rule still works
 * without TypeScript type information.
 */
function isReactImportedIdentifier(
  identifier: TSESTree.Identifier,
  scope: TSESLint.Scope.Scope,
  expectedImportedName: string,
): boolean {
  const variable = findVariableInScope(scope, identifier.name);
  if (!variable) {
    return false;
  }
  return variable.defs.some(def => {
    if (def.type !== 'ImportBinding') {
      return false;
    }
    const importDecl = def.parent;
    if (!importDecl || importDecl.type !== AST_NODE_TYPES.ImportDeclaration) {
      return false;
    }
    if (importDecl.source.value !== 'react') {
      return false;
    }
    const specifier = def.node;
    switch (specifier.type) {
      case AST_NODE_TYPES.ImportSpecifier: {
        const importedName =
          specifier.imported.type === AST_NODE_TYPES.Identifier
            ? specifier.imported.name
            : String(specifier.imported.value);
        return importedName === expectedImportedName;
      }
      case AST_NODE_TYPES.ImportNamespaceSpecifier:
        return expectedImportedName === '*';
      case AST_NODE_TYPES.ImportDefaultSpecifier:
        // `import React from 'react'` is also a valid way to access `React.Ref`.
        return expectedImportedName === '*' || expectedImportedName === 'default';
      default:
        return false;
    }
  });
}

/**
 * Walks the scope chain looking for a variable with the given name. Plain `scope.set.get` only
 * inspects the local scope, so this helper enables identifier resolution that matches JavaScript's
 * lookup semantics.
 */
function findVariableInScope(scope: TSESLint.Scope.Scope, name: string): TSESLint.Scope.Variable | undefined {
  let current: TSESLint.Scope.Scope | null = scope;
  while (current) {
    const variable = current.set.get(name);
    if (variable) {
      return variable;
    }
    current = current.upper;
  }
  return undefined;
}

/**
 * Renders the actual ref type annotation as a string for `invalidRefType` diagnostics, so users
 * see what they wrote (`HTMLAttributes`, `Ref`, `MyType`…) instead of bare AST node types.
 */
function describeRefType(annotation: TSESTree.TSTypeAnnotation | undefined): string {
  if (!annotation) {
    return '<missing type annotation>';
  }
  const type = annotation.typeAnnotation;
  if (type.type !== AST_NODE_TYPES.TSTypeReference) {
    return type.type;
  }
  const { typeName } = type;
  if (typeName.type === AST_NODE_TYPES.Identifier) {
    return typeName.name;
  }
  if (typeName.type === AST_NODE_TYPES.TSQualifiedName) {
    const left = typeName.left.type === AST_NODE_TYPES.Identifier ? typeName.left.name : '…';
    return `${left}.${typeName.right.name}`;
  }
  return type.type;
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
