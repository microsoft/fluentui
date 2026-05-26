import type { TSESTree, TSESLint, ParserServicesWithTypeInformation } from '@typescript-eslint/utils';
import { ESLintUtils, AST_NODE_TYPES } from '@typescript-eslint/utils';
import * as ts from 'typescript';
import { BASE_HOOK_NAME_PATTERN, type BaseHookFunction, getFunctionInit } from '../utils/base-hook-detector';
import { transitiveReach } from '../utils/transitive-reach';
import { shortenPath } from '../utils/module-resolver';
import { type ImportSpecifierNode, type TrackedImport, getImportedName } from '../utils/tracked-imports';

// NOTE: The rule will be available in ESLint configs as "@nx/workspace-base-hook-no-forbidden-runtime"
export const RULE_NAME = 'base-hook-no-forbidden-runtime';

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
        const importedName = getImportedName(specifier as ImportSpecifierNode);
        if (importedName === undefined) {
          return;
        }
        for (const variable of sourceCode.getDeclaredVariables(specifier)) {
          trackedImports.set(variable, {
            package: source,
            importedName,
            kind,
            isTypeOnly: specTypeOnly,
            specifier: specifier as ImportSpecifierNode,
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
