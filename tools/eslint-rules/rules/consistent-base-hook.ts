import {
  ESLintUtils,
  AST_NODE_TYPES,
  TSESTree,
  TSESLint,
  ParserServicesWithTypeInformation,
} from '@typescript-eslint/utils';
import * as ts from 'typescript';

// NOTE: The rule will be available in ESLint configs as "@nx/workspace-consistent-base-hook"
export const RULE_NAME = 'consistent-base-hook';

const BASE_HOOK_NAME_PATTERN = /^use[A-Z]\w*Base_unstable$/;
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
     * When `true`, type-only imports from `forbiddenRuntimes` packages are
     * permitted inside base hooks (they emit no runtime code).
     *
     * Defaults to `false` — type-only imports from forbidden runtimes are
     * disallowed as well, to keep the base hook's public API fully decoupled
     * from those packages.
     */
    allowTypeImports?: boolean;
  }?,
];

type MessageIds =
  | 'invalidParamCount'
  | 'invalidParamName'
  | 'invalidRefType'
  | 'forbiddenRuntimeDirect'
  | 'forbiddenRuntimeReach';

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
  /** The specifier node (used for symbol lookup via ParserServices). */
  specifier: ImportSpecifierNode;
}

type BaseHookFunction = TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression;

/**
 * Per-Program cache: source file path → set of bare package specifiers transitively reached
 * via value (non type-only) imports starting from that file.
 *
 * Keyed by `ts.Program` identity so the cache is invalidated whenever
 * typescript-eslint rebuilds the Program.
 */
const programCache = new WeakMap<ts.Program, Map<string, ReadonlySet<string>>>();

export const rule = ESLintUtils.RuleCreator(() => __filename)<Options, MessageIds>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce the API contract for v9 "base" hooks (`use<Name>Base_unstable`): a required `props` parameter and an optional `ref` parameter typed as `React.Ref<...>`, and disallow referencing any binding whose defining module transitively pulls a forbidden runtime package (default `tabster`).',
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
        'Base hook `{{hookName}}` must take 1 or 2 positional parameters (`props`, optional `ref`), got {{actual}}.',
      invalidParamName:
        'Base hook `{{hookName}}` parameter #{{index}} must be named `{{expected}}` (Identifier), got `{{actual}}`.',
      invalidRefType: 'Base hook `{{hookName}}` parameter `ref` must be typed as `React.Ref<...>`, got `{{actual}}`.',
      forbiddenRuntimeDirect:
        'Base hook `{{hookName}}` cannot reference `{{importedName}}` from forbidden runtime package `{{package}}`. Move logic that depends on `{{package}}` to the wrapping `*_unstable` hook instead.',
      forbiddenRuntimeReach:
        'Base hook `{{hookName}}` cannot reference `{{importedName}}` from `{{package}}` because its defining module transitively imports forbidden runtime `{{runtime}}` (via `{{viaFile}}`). Move logic that depends on `{{runtime}}` to the wrapping `*_unstable` hook instead.',
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

    // Variable → import origin. Keyed by Variable identity so shadowing inside the base hook is handled.
    const trackedImports = new Map<TSESLint.Scope.Variable, TrackedImport>();

    // Lazily-acquired typed services. Untyped lint silently skips transitive analysis.
    let typedServices: ParserServicesWithTypeInformation | null | undefined;
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

    function checkBaseHook(hookName: string, fn: BaseHookFunction, reportNode: TSESTree.Node): void {
      checkParameters(hookName, fn, reportNode);
      checkBodyReferences(hookName, fn);
    }

    function checkParameters(hookName: string, fn: BaseHookFunction, reportNode: TSESTree.Node): void {
      if (fn.params.length < MIN_PARAM_COUNT || fn.params.length > MAX_PARAM_COUNT) {
        context.report({
          node: reportNode,
          messageId: 'invalidParamCount',
          data: { hookName, actual: fn.params.length },
        });
        return;
      }

      fn.params.forEach((param, index) => {
        const expected = EXPECTED_PARAM_NAMES[index];
        if (param.type !== AST_NODE_TYPES.Identifier || param.name !== expected) {
          context.report({
            node: reportNode,
            messageId: 'invalidParamName',
            data: { hookName, index: index + 1, expected, actual: describeParam(param) },
          });
          return;
        }
        if (index === 1 && !isReactRefTypeAnnotation(param.typeAnnotation)) {
          context.report({
            node: reportNode,
            messageId: 'invalidRefType',
            data: { hookName, actual: describeRefType(param.typeAnnotation) },
          });
        }
      });
    }

    function checkBodyReferences(hookName: string, fn: BaseHookFunction): void {
      if (trackedImports.size === 0) {
        return;
      }
      const fnScope = sourceCode.getScope(fn);
      visitScope(fnScope, fn, hookName);
    }

    function visitScope(scope: TSESLint.Scope.Scope, fn: BaseHookFunction, hookName: string): void {
      if (!isScopeWithinFunction(scope, fn)) {
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

        for (const runtime of forbiddenRuntimes) {
          if (reach.reached.has(runtime)) {
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

      scope.childScopes.forEach(child => visitScope(child, fn, hookName));
    }

    function computeSymbolReach(origin: TrackedImport): { reached: ReadonlySet<string>; viaFile: string } | null {
      const services = getTypedServices();
      if (!services) {
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
      if (symbol.flags & ts.SymbolFlags.Alias) {
        try {
          symbol = checker.getAliasedSymbol(symbol);
        } catch {
          return null;
        }
      }
      const decl = symbol.declarations?.[0];
      const sf = decl?.getSourceFile();
      if (!sf) {
        return null;
      }

      const reached = transitiveValuePackages(services.program, sf);
      return { reached, viaFile: shortenPath(sf.fileName) };
    }

    return {
      ImportDeclaration(node) {
        const source = node.source.value;
        if (typeof source !== 'string' || !trackedPackages.has(source)) {
          return;
        }
        const isForbiddenPkg = forbiddenRuntimes.has(source);
        const declTypeOnly = node.importKind === 'type';
        // Type-only imports from a watched package can never pull runtime; always skip.
        // Type-only imports from a forbidden-runtime package are skipped only when explicitly allowed.
        if (declTypeOnly && (!isForbiddenPkg || allowTypeImports)) {
          return;
        }
        const kind: TrackedImport['kind'] = isForbiddenPkg ? 'forbidden' : 'watched';

        node.specifiers.forEach(specifier => {
          const specTypeOnly = specifier.type === AST_NODE_TYPES.ImportSpecifier && specifier.importKind === 'type';
          if (specTypeOnly && (!isForbiddenPkg || allowTypeImports)) {
            return;
          }
          let importedName: string;
          switch (specifier.type) {
            case AST_NODE_TYPES.ImportSpecifier:
              importedName =
                specifier.imported.type === AST_NODE_TYPES.Identifier
                  ? specifier.imported.name
                  : String(specifier.imported.value);
              break;
            case AST_NODE_TYPES.ImportDefaultSpecifier:
              importedName = 'default';
              break;
            case AST_NODE_TYPES.ImportNamespaceSpecifier:
              importedName = '*';
              break;
            default:
              return;
          }
          for (const variable of sourceCode.getDeclaredVariables(specifier)) {
            trackedImports.set(variable, { package: source, importedName, kind, specifier });
          }
        });
      },

      [`FunctionDeclaration[id.name=/${BASE_HOOK_NAME_PATTERN.source}/]`]: (node: TSESTree.FunctionDeclaration) => {
        if (!node.id) {
          return;
        }
        checkBaseHook(node.id.name, node, node.id);
      },

      [`VariableDeclarator[id.name=/${BASE_HOOK_NAME_PATTERN.source}/]`]: (node: TSESTree.VariableDeclarator) => {
        if (node.id.type !== AST_NODE_TYPES.Identifier) {
          return;
        }
        const init = node.init;
        if (
          !init ||
          (init.type !== AST_NODE_TYPES.ArrowFunctionExpression && init.type !== AST_NODE_TYPES.FunctionExpression)
        ) {
          return;
        }
        checkBaseHook(node.id.name, init, node.id);
      },
    };
  },
});

// ---------------------------------------------------------------------------
// Transitive value-import analysis
// ---------------------------------------------------------------------------

/**
 * Returns the set of bare package specifiers transitively reachable from `sf`
 * via non-type-only imports. Memoized per Program × file. Cycle-safe.
 */
function transitiveValuePackages(program: ts.Program, sf: ts.SourceFile): ReadonlySet<string> {
  let cache = programCache.get(program);
  if (!cache) {
    cache = new Map();
    programCache.set(program, cache);
  }
  return computeReach(program, sf, cache, new Set());
}

function computeReach(
  program: ts.Program,
  sf: ts.SourceFile,
  cache: Map<string, ReadonlySet<string>>,
  inProgress: Set<string>,
): ReadonlySet<string> {
  const cached = cache.get(sf.fileName);
  if (cached) {
    return cached;
  }
  if (inProgress.has(sf.fileName)) {
    // Cycle: return an empty set without caching so the eventual full result is committed by the originator.
    return EMPTY_SET;
  }
  inProgress.add(sf.fileName);

  const result = new Set<string>();
  for (const { specifier, literal } of collectValueImports(sf)) {
    if (isBareSpecifier(specifier)) {
      result.add(packageNameOf(specifier));
    }
    const resolved = resolveModule(program, sf, specifier, literal);
    if (!resolved) {
      continue;
    }
    const childSf = program.getSourceFile(resolved);
    if (!childSf) {
      continue;
    }
    const childReach = computeReach(program, childSf, cache, inProgress);
    for (const pkg of childReach) {
      result.add(pkg);
    }
  }

  inProgress.delete(sf.fileName);
  cache.set(sf.fileName, result);
  return result;
}

const EMPTY_SET: ReadonlySet<string> = new Set();

interface ValueImport {
  specifier: string;
  literal: ts.StringLiteralLike;
}

function collectValueImports(sf: ts.SourceFile): ValueImport[] {
  const result: ValueImport[] = [];
  for (const stmt of sf.statements) {
    if (ts.isImportDeclaration(stmt)) {
      if (stmt.importClause?.isTypeOnly) {
        continue;
      }
      // `import './side-effect'` (no clause) IS a value import.
      // For named imports, drop if every specifier is type-only AND there's no default/namespace.
      if (stmt.importClause && stmt.importClause.namedBindings && ts.isNamedImports(stmt.importClause.namedBindings)) {
        const named = stmt.importClause.namedBindings;
        const hasValue = !!stmt.importClause.name || named.elements.some(el => !el.isTypeOnly);
        if (!hasValue) {
          continue;
        }
      }
      if (ts.isStringLiteralLike(stmt.moduleSpecifier)) {
        result.push({ specifier: stmt.moduleSpecifier.text, literal: stmt.moduleSpecifier });
      }
      continue;
    }
    if (ts.isExportDeclaration(stmt) && stmt.moduleSpecifier && ts.isStringLiteralLike(stmt.moduleSpecifier)) {
      if (stmt.isTypeOnly) {
        continue;
      }
      if (stmt.exportClause && ts.isNamedExports(stmt.exportClause)) {
        const allTypeOnly = stmt.exportClause.elements.every(el => el.isTypeOnly);
        if (allTypeOnly) {
          continue;
        }
      }
      result.push({ specifier: stmt.moduleSpecifier.text, literal: stmt.moduleSpecifier });
      continue;
    }
    if (
      ts.isImportEqualsDeclaration(stmt) &&
      ts.isExternalModuleReference(stmt.moduleReference) &&
      ts.isStringLiteralLike(stmt.moduleReference.expression)
    ) {
      if (stmt.isTypeOnly) {
        continue;
      }
      result.push({
        specifier: stmt.moduleReference.expression.text,
        literal: stmt.moduleReference.expression,
      });
    }
  }
  return result;
}

function resolveModule(
  program: ts.Program,
  sf: ts.SourceFile,
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
  ).getModeForUsageLocation?.(sf, literal);

  if (typeof getResolvedModule === 'function') {
    const r = getResolvedModule.call(program, sf, specifier, mode);
    if (r?.resolvedModule) {
      return r.resolvedModule.resolvedFileName;
    }
  }

  // Fallback for older TS: use ts.resolveModuleName against the compiler host.
  const compilerOptions = program.getCompilerOptions();
  const host =
    (program as unknown as { getCompilerHost?: () => ts.ModuleResolutionHost }).getCompilerHost?.() ?? ts.sys;
  const result = ts.resolveModuleName(
    specifier,
    sf.fileName,
    compilerOptions,
    host as ts.ModuleResolutionHost,
    undefined,
    undefined,
    mode,
  );
  return result.resolvedModule?.resolvedFileName;
}

function isBareSpecifier(specifier: string): boolean {
  return !specifier.startsWith('.') && !specifier.startsWith('/');
}

function packageNameOf(specifier: string): string {
  if (specifier.startsWith('@')) {
    const [scope, name] = specifier.split('/', 2);
    return name ? `${scope}/${name}` : scope;
  }
  const slash = specifier.indexOf('/');
  return slash === -1 ? specifier : specifier.slice(0, slash);
}

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

function isReactRefTypeAnnotation(annotation: TSESTree.TSTypeAnnotation | undefined): boolean {
  if (!annotation) {
    return false;
  }
  const type = annotation.typeAnnotation;
  if (type.type !== AST_NODE_TYPES.TSTypeReference) {
    return false;
  }
  const { typeName } = type;
  if (typeName.type === AST_NODE_TYPES.Identifier) {
    return typeName.name === 'Ref';
  }
  if (typeName.type === AST_NODE_TYPES.TSQualifiedName) {
    return (
      typeName.left.type === AST_NODE_TYPES.Identifier &&
      typeName.left.name === 'React' &&
      typeName.right.name === 'Ref'
    );
  }
  return false;
}

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

function isScopeWithinFunction(scope: TSESLint.Scope.Scope, fn: BaseHookFunction): boolean {
  let current: TSESLint.Scope.Scope | null = scope;
  while (current) {
    if (current.block === fn) {
      return true;
    }
    current = current.upper;
  }
  return false;
}
