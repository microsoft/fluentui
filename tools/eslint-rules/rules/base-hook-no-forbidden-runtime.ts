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

// Only the runtime itself is listed. Wrapper packages such as `@fluentui/react-tabster` are
// deliberately absent: the analysis is symbol-level, so a wrapper export that bottoms out in
// `keyborg` or plain DOM is legitimately allowed, while one that reaches `tabster` is not.
const DEFAULT_FORBIDDEN_RUNTIMES: ReadonlyArray<string> = ['tabster'];

type Options = [
  {
    /**
     * Runtime packages whose presence in the transitive import graph of a referenced symbol is
     * forbidden inside base hooks. Direct imports from these packages are also forbidden.
     */
    forbiddenRuntimes?: string[];
    /**
     * When `true`, type-only imports (both from `forbiddenRuntimes` packages directly and from
     * modules whose import graph reaches a forbidden runtime) are permitted inside base hooks.
     * Type-only imports emit no runtime code, so this option trades API decoupling for ergonomics.
     *
     * Defaults to `false` — type-only imports are checked the same way as value imports, to
     * keep the base hook's public API fully decoupled from forbidden runtimes.
     */
    allowTypeImports?: boolean;
  }?,
];

type MessageIds = 'forbiddenRuntimeDirect' | 'forbiddenRuntimeReach' | 'typedServicesUnavailable';

/**
 * The original (imported) name of an import specifier, used for diagnostics.
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
 * A locally-declared binding originating from any import declaration. Built when walking
 * `ImportDeclaration` nodes so body references can be matched in O(1) via a
 * `Map<Variable, TrackedImport>`.
 */
interface TrackedImport {
  /** Package name for bare specifiers, or the specifier as written for relative imports. */
  package: string;
  /** Original imported name (not the local alias). `default` or `*` for default / namespace. */
  importedName: string;
  /**
   * `forbidden` when the import comes straight from a forbidden-runtime package, `transitive`
   * for everything else — which is then resolved through the module graph on demand.
   */
  kind: 'forbidden' | 'transitive';
  /**
   * `true` when the binding is type-only (either the declaration is `import type ...`
   * or the specifier is `import { type Foo }`). Used to gate whether direct usage in a
   * value position is even possible (type-only bindings only surface in type positions).
   */
  isTypeOnly: boolean;
  /** The specifier node (used for symbol lookup via ParserServices). */
  specifier: ImportSpecifierNode;
  /** Memoized analysis result for value references — `undefined` until first resolved. */
  valueHit?: Hit | null;
  /** Memoized analysis result for type references — `undefined` until first resolved. */
  typeHit?: Hit | null;
}

/**
 * A forbidden runtime found while walking what a symbol actually depends on.
 */
interface Hit {
  /** The forbidden runtime package that was reached. */
  runtime: string;
  /** Shortened path of the file where the forbidden dependency enters the graph. */
  via: string;
}

/**
 * Per-Program memo of symbol-level results, split by whether type positions were followed.
 * Keyed by `ts.Program` identity so the cache dies with the Program that produced the symbols.
 */
interface AnalysisCache {
  value: Map<ts.Symbol, Hit | null>;
  all: Map<ts.Symbol, Hit | null>;
}

const programCache = new WeakMap<ts.Program, AnalysisCache>();

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
        'Base hook `{{hookName}}` cannot reference `{{importedName}}` from `{{package}}` because `{{importedName}}` depends on forbidden runtime `{{runtime}}` (entering at `{{viaFile}}`). Move logic that depends on `{{runtime}}` to the wrapping `*_unstable` hook instead.',
      typedServicesUnavailable:
        'base-hook-no-forbidden-runtime: transitive runtime analysis was skipped because TypeScript type information is unavailable. Enable typescript-eslint type-aware linting (set `parserOptions.projectService: true` or `parserOptions.project`) so imported bindings can be verified against forbidden runtimes (e.g. `{{forbiddenRuntimes}}`).',
    },
  },
  defaultOptions: [{}],
  create(context) {
    const sourceCode = context.sourceCode;
    const options = context.options[0] ?? {};
    const forbiddenRuntimes = new Set(options.forbiddenRuntimes ?? DEFAULT_FORBIDDEN_RUNTIMES);
    const allowTypeImports = options.allowTypeImports ?? false;

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
     * Walks the base hook's scope graph looking for references to any imported binding. Bails out
     * early if the file has no imports at all.
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
     * For every resolved reference whose declaration is an import, either flag the direct usage of
     * a forbidden runtime or delegate to `computeSymbolReach` for the transitive check.
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

        // Everything else: only flag if what the symbol actually depends on reaches a forbidden runtime.
        const hit = analyzeOrigin(origin, isTypeRef);
        if (!hit) {
          return; // untyped lint or unresolvable — silently skip
        }

        context.report({
          node: reference.identifier,
          messageId: 'forbiddenRuntimeReach',
          data: {
            hookName,
            importedName: origin.importedName,
            package: origin.package,
            runtime: hit.runtime,
            viaFile: hit.via,
          },
        });
      });

      scope.childScopes.forEach(child => visitScope(child, hookFn, hookName));
    }

    /**
     * Resolves the import binding to its symbol and asks the symbol-level analysis whether what
     * that symbol actually depends on reaches a forbidden runtime.
     * Returns `null` (and flips the `typedServicesNeededButMissing` flag) when typed services
     * aren't available, so the caller can silently skip and we can warn once on `Program:exit`.
     * Memoized per binding × reference kind, since a binding is usually referenced many times.
     */
    function analyzeOrigin(origin: TrackedImport, followTypes: boolean): Hit | null {
      const cached = followTypes ? origin.typeHit : origin.valueHit;
      if (cached !== undefined) {
        return cached;
      }
      const result = resolveOriginHit(origin, followTypes);
      if (followTypes) {
        origin.typeHit = result;
      } else {
        origin.valueHit = result;
      }
      return result;
    }

    function resolveOriginHit(origin: TrackedImport, followTypes: boolean): Hit | null {
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

      const symbol = checker.getSymbolAtLocation(nameNode);
      if (!symbol) {
        return null;
      }

      return findForbiddenRuntime(services.program, checker, symbol, followTypes, forbiddenRuntimes);
    }

    /**
     * `ImportDeclaration` visitor: records every named/default/namespace specifier of every import
     * — bare package specifiers *and* relative ones — so body references can later be resolved via
     * `sourceCode.getDeclaredVariables`. Whether a binding is actually a problem is decided lazily
     * by the transitive reach analysis, because forbidden runtimes are most often reached through
     * an innocuous-looking local module or sibling package rather than a direct import.
     *
     * Type-only specifiers are tracked as well (unless `allowTypeImports`), because a type can
     * still expose a forbidden runtime through the base hook's public API.
     */
    function trackImportDeclaration(node: TSESTree.ImportDeclaration): void {
      const source = node.source.value;
      if (typeof source !== 'string') {
        return;
      }
      const bare = isBareSpecifier(source);
      const packageName = bare ? packageNameOf(source) : source;
      const stmtTypeOnly = node.importKind === 'type';
      // Symmetric semantics: when `allowTypeImports` is true, type-only imports are exempt from
      // both direct forbidden-runtime checks AND transitive reach checks (a type can never pull
      // runtime code at execution time).
      if (stmtTypeOnly && allowTypeImports) {
        return;
      }
      const kind: TrackedImport['kind'] = bare && forbiddenRuntimes.has(packageName) ? 'forbidden' : 'transitive';

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
            package: packageName,
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
// Symbol-level forbidden-runtime analysis
// ---------------------------------------------------------------------------

/**
 * Answers "does `symbol` actually depend on a forbidden runtime?" by walking the symbol's own
 * declaration and only the identifiers that declaration references.
 *
 * Granularity is the whole point. Asking the same question at file granularity conflates every
 * export of a module: `useButtonBase_unstable` would inherit the dependencies of the sibling
 * exports in its `index.ts`, and importing one clean binding from a package barrel would inherit
 * the dependencies of everything else that barrel re-exports. Barrels are therefore walked
 * *through* — an alias hop resolves to the leaf declaration it points at, never to the union of
 * the barrel's contents.
 *
 * `followTypes` selects the reference kind being validated: value references follow value
 * positions only (runtime coupling), type references also follow type positions (API coupling).
 *
 * Memoized per Program × symbol × mode. Cycle-safe.
 */
function findForbiddenRuntime(
  program: ts.Program,
  checker: ts.TypeChecker,
  symbol: ts.Symbol,
  followTypes: boolean,
  forbiddenRuntimes: ReadonlySet<string>,
): Hit | null {
  const caches = getAnalysisCache(program);
  const cache = followTypes ? caches.all : caches.value;
  const inProgress = new Set<ts.Symbol>();

  function visitSymbol(current: ts.Symbol): Hit | null {
    const cached = cache.get(current);
    if (cached !== undefined) {
      return cached;
    }
    if (inProgress.has(current)) {
      return null;
    }
    inProgress.add(current);

    let result: Hit | null = null;
    try {
      for (const declaration of current.declarations ?? []) {
        result = visitDeclaration(current, declaration);
        if (result) {
          break;
        }
      }
    } finally {
      inProgress.delete(current);
    }

    cache.set(current, result);
    return result;
  }

  function visitDeclaration(owner: ts.Symbol, declaration: ts.Declaration): Hit | null {
    const edge = getModuleEdge(declaration);
    if (edge) {
      if (edge.typeOnly && !followTypes) {
        return null;
      }
      if (edge.packageName !== undefined && forbiddenRuntimes.has(edge.packageName)) {
        return { runtime: edge.packageName, via: shortenPath(declaration.getSourceFile().fileName) };
      }
      // A namespace binding stands for the entire module; there is no single symbol to follow,
      // so the specifier check above is as far as the analysis goes.
      return edge.isNamespace ? null : visitAliasTarget(owner);
    }
    // Whole-module symbols (`export = React`, ambient namespaces) bind everything a module
    // exports and have no single declaration to follow.
    if (ts.isSourceFile(declaration) || ts.isModuleDeclaration(declaration)) {
      return null;
    }
    return walkReferences(declaration);
  }

  /**
   * Follows an alias to the leaf symbol it ultimately resolves to. This is what makes re-export
   * barrels transparent. Because the hop skips intermediate specifiers, the leaf's own source
   * file is also checked against the forbidden list to catch `export { x } from 'tabster'` chains.
   */
  function visitAliasTarget(alias: ts.Symbol): Hit | null {
    let target: ts.Symbol;
    try {
      target = checker.getAliasedSymbol(alias);
    } catch {
      return null;
    }
    if (target === alias) {
      return null;
    }
    return owningForbiddenPackage(target, forbiddenRuntimes) ?? visitSymbol(target);
  }

  /**
   * Walks the identifiers `declaration` references, recursing into each referenced symbol.
   * Identifiers that are not references (property names, declaration names, import specifier
   * names) are skipped, as are type positions when only runtime coupling is being validated.
   */
  function walkReferences(declaration: ts.Node): Hit | null {
    let hit: Hit | null = null;

    const visit = (node: ts.Node): void => {
      if (hit) {
        return;
      }
      if (ts.isIdentifier(node) && isReferencePosition(node) && (followTypes || !isInTypePosition(node))) {
        const referenced = checker.getSymbolAtLocation(node);
        if (referenced) {
          hit = visitSymbol(referenced);
          if (hit) {
            return;
          }
        }
      }
      ts.forEachChild(node, visit);
    };

    ts.forEachChild(declaration, visit);
    return hit;
  }

  return visitSymbol(symbol);
}

function getAnalysisCache(program: ts.Program): AnalysisCache {
  let cache = programCache.get(program);
  if (!cache) {
    cache = { value: new Map(), all: new Map() };
    programCache.set(program, cache);
  }
  return cache;
}

/**
 * `true` when the leaf declaration of `symbol` lives inside one of the forbidden packages, which
 * covers re-export chains that `getAliasedSymbol` collapses in a single hop.
 */
function owningForbiddenPackage(symbol: ts.Symbol, forbiddenRuntimes: ReadonlySet<string>): Hit | null {
  for (const declaration of symbol.declarations ?? []) {
    const fileName = declaration.getSourceFile().fileName;
    const owner = packageFromNodeModulesPath(fileName);
    if (owner !== undefined && forbiddenRuntimes.has(owner)) {
      return { runtime: owner, via: shortenPath(fileName) };
    }
  }
  return null;
}

/**
 * The npm package a file belongs to, when the file sits under a `node_modules` directory.
 */
function packageFromNodeModulesPath(fileName: string): string | undefined {
  const segments = toPosixPath(fileName).split('/');
  const index = segments.lastIndexOf('node_modules');
  if (index === -1) {
    return undefined;
  }
  const first = segments[index + 1];
  if (first === undefined) {
    return undefined;
  }
  const second = segments[index + 2];
  return first.startsWith('@') && second !== undefined ? `${first}/${second}` : first;
}

interface ModuleEdge {
  /** Bare package the binding comes from, or `undefined` for relative and local re-exports. */
  packageName: string | undefined;
  /** `true` when the edge only carries type information (no runtime side-effect). */
  typeOnly: boolean;
  /** `true` for `import * as ns` / `export * as ns`, which bind a whole module rather than a symbol. */
  isNamespace: boolean;
}

/**
 * Describes the cross-module edge a declaration represents, or `null` when the declaration is not
 * an import/export binding.
 */
function getModuleEdge(declaration: ts.Declaration): ModuleEdge | null {
  if (ts.isImportSpecifier(declaration)) {
    const importClause = declaration.parent.parent;
    return {
      packageName: barePackageOf(importClause.parent.moduleSpecifier),
      typeOnly: declaration.isTypeOnly || importClause.isTypeOnly,
      isNamespace: false,
    };
  }
  if (ts.isImportClause(declaration)) {
    return {
      packageName: barePackageOf(declaration.parent.moduleSpecifier),
      typeOnly: declaration.isTypeOnly,
      isNamespace: false,
    };
  }
  if (ts.isNamespaceImport(declaration)) {
    const importClause = declaration.parent;
    return {
      packageName: barePackageOf(importClause.parent.moduleSpecifier),
      typeOnly: importClause.isTypeOnly,
      isNamespace: true,
    };
  }
  if (ts.isExportSpecifier(declaration)) {
    const exportDeclaration = declaration.parent.parent;
    return {
      packageName: exportDeclaration.moduleSpecifier
        ? barePackageOf(exportDeclaration.moduleSpecifier)
        : /* local re-export */ undefined,
      typeOnly: declaration.isTypeOnly || exportDeclaration.isTypeOnly,
      isNamespace: false,
    };
  }
  if (ts.isNamespaceExport(declaration)) {
    const exportDeclaration = declaration.parent;
    return {
      packageName: exportDeclaration.moduleSpecifier ? barePackageOf(exportDeclaration.moduleSpecifier) : undefined,
      typeOnly: exportDeclaration.isTypeOnly,
      isNamespace: true,
    };
  }
  if (ts.isImportEqualsDeclaration(declaration)) {
    const reference = declaration.moduleReference;
    return {
      packageName: ts.isExternalModuleReference(reference) ? barePackageOf(reference.expression) : undefined,
      typeOnly: declaration.isTypeOnly,
      isNamespace: true,
    };
  }
  return null;
}

function barePackageOf(moduleSpecifier: ts.Expression): string | undefined {
  if (!ts.isStringLiteralLike(moduleSpecifier) || !isBareSpecifier(moduleSpecifier.text)) {
    return undefined;
  }
  return packageNameOf(moduleSpecifier.text);
}

/**
 * `false` for identifiers that merely name something (property names, declaration names, import
 * and export specifier names) rather than referring to a binding worth following.
 */
function isReferencePosition(node: ts.Identifier): boolean {
  const parent = node.parent;
  if (!parent) {
    return false;
  }
  if (ts.isPropertyAccessExpression(parent) && parent.name === node) {
    return false;
  }
  if (ts.isQualifiedName(parent) && parent.right === node) {
    return false;
  }
  if (ts.isPropertyAssignment(parent) && parent.name === node) {
    return false;
  }
  if (ts.isBindingElement(parent) && parent.propertyName === node) {
    return false;
  }
  if (ts.isImportSpecifier(parent) || ts.isExportSpecifier(parent)) {
    return false;
  }
  if (ts.isImportClause(parent) || ts.isNamespaceImport(parent) || ts.isNamespaceExport(parent)) {
    return false;
  }
  // `{ foo }` binds and references `foo` at once, so it is a reference despite being a `name`.
  if (ts.isShorthandPropertyAssignment(parent)) {
    return true;
  }
  return (parent as ts.Node & { name?: ts.Node }).name !== node;
}

/**
 * `true` when the identifier sits inside a type annotation, type alias body or `typeof` query.
 */
function isInTypePosition(node: ts.Node): boolean {
  let current: ts.Node | undefined = node.parent;
  while (current) {
    if (ts.isTypeNode(current)) {
      return true;
    }
    current = current.parent;
  }
  return false;
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
