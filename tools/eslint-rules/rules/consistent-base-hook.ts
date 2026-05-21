import { ESLintUtils, AST_NODE_TYPES, TSESTree, TSESLint } from '@typescript-eslint/utils';

// NOTE: The rule will be available in ESLint configs as "@nx/workspace-consistent-base-hook"
export const RULE_NAME = 'consistent-base-hook';

const BASE_HOOK_NAME_PATTERN = /^use[A-Z]\w*Base_unstable$/;
const EXPECTED_PARAM_NAMES = ['props', 'ref'] as const;
const MIN_PARAM_COUNT = 1;
const MAX_PARAM_COUNT = 2;
const DEFAULT_FORBIDDEN_PACKAGES: ReadonlyArray<ForbiddenPackageOption> = [
  {
    name: '@fluentui/react-tabster',
    // APIs that only depend on `keyborg` (no `tabster` runtime) are safe to use inside base hooks.
    allow: [
      'useFocusWithin',
      'useFocusVisible',
      'useKeyboardNavAttribute',
      'useIsNavigatingWithKeyboard',
      'useSetKeyboardNavigation',
      'useOnKeyboardNavigationChange',
      'applyFocusVisiblePolyfill',
      // re-exports from `keyborg`
      'KEYBORG_FOCUSIN',
      'KeyborgFocusInEvent',
    ],
  },
  'tabster',
];

type ForbiddenPackageOption = string | { name: string; allow?: string[] };
type Options = [
  {
    forbiddenPackages?: ForbiddenPackageOption[];
  }?,
];
type MessageIds = 'invalidParamCount' | 'invalidParamName' | 'invalidRefType' | 'forbiddenPackageUsage';

interface NormalizedForbiddenPackage {
  name: string;
  allow: Set<string>;
}

interface ForbiddenImport {
  package: string;
  importedName: string;
}

type BaseHookFunction = TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression;

export const rule = ESLintUtils.RuleCreator(() => __filename)<Options, MessageIds>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce the API contract for v9 "base" hooks (`use<Name>Base_unstable`): a required `props` parameter and an optional `ref` parameter typed as `React.Ref<...>`, and no usage of bindings from configured forbidden packages (defaults to `@fluentui/react-tabster`, `tabster`, `keyborg`).',
    },
    schema: [
      {
        type: 'object',
        properties: {
          forbiddenPackages: {
            type: 'array',
            items: {
              oneOf: [
                { type: 'string' },
                {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    allow: {
                      type: 'array',
                      items: { type: 'string' },
                      uniqueItems: true,
                    },
                  },
                  required: ['name'],
                  additionalProperties: false,
                },
              ],
            },
            uniqueItems: false,
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
      forbiddenPackageUsage:
        'Base hook `{{hookName}}` cannot reference `{{importedName}}` from forbidden package `{{package}}`. Move logic that depends on `{{package}}` to the wrapping `*_unstable` hook instead.',
    },
  },
  defaultOptions: [{}],
  create(context) {
    const sourceCode = context.sourceCode;
    const options = context.options[0] ?? {};
    const forbiddenPackages = normalizeForbiddenPackages(options.forbiddenPackages);
    const forbiddenPackageByName = new Map(forbiddenPackages.map(pkg => [pkg.name, pkg]));

    // Map from import Variable -> origin (package + original imported name).
    // Keyed by Variable identity (not name) so shadowing inside a base hook is handled correctly.
    const forbiddenImports = new Map<TSESLint.Scope.Variable, ForbiddenImport>();

    function checkBaseHook(hookName: string, fn: BaseHookFunction, reportNode: TSESTree.Node): void {
      checkParameters(hookName, fn, reportNode);
      checkBodyReferences(hookName, fn);
    }

    function checkParameters(hookName: string, fn: BaseHookFunction, reportNode: TSESTree.Node): void {
      if (fn.params.length < MIN_PARAM_COUNT || fn.params.length > MAX_PARAM_COUNT) {
        context.report({
          node: reportNode,
          messageId: 'invalidParamCount',
          data: {
            hookName,
            actual: fn.params.length,
          },
        });
        return;
      }

      fn.params.forEach((param, index) => {
        const expected = EXPECTED_PARAM_NAMES[index];
        if (param.type !== AST_NODE_TYPES.Identifier || param.name !== expected) {
          context.report({
            node: reportNode,
            messageId: 'invalidParamName',
            data: {
              hookName,
              index: index + 1,
              expected,
              actual: describeParam(param),
            },
          });
          return;
        }
        if (index === 1 && !isReactRefTypeAnnotation(param.typeAnnotation)) {
          context.report({
            node: reportNode,
            messageId: 'invalidRefType',
            data: {
              hookName,
              actual: describeRefType(param.typeAnnotation),
            },
          });
        }
      });
    }

    function checkBodyReferences(hookName: string, fn: BaseHookFunction): void {
      if (forbiddenImports.size === 0) {
        return;
      }

      const fnScope = sourceCode.getScope(fn);
      visitScope(fnScope, fn, hookName);
    }

    function visitScope(scope: TSESLint.Scope.Scope, fn: BaseHookFunction, hookName: string): void {
      // Only descend into scopes that belong to this base hook's function body.
      if (!isScopeWithinFunction(scope, fn)) {
        return;
      }

      scope.references.forEach(reference => {
        const resolved = reference.resolved;
        if (!resolved) {
          return;
        }
        const origin = forbiddenImports.get(resolved);
        if (!origin) {
          return;
        }
        const pkg = forbiddenPackageByName.get(origin.package);
        if (pkg?.allow.has(origin.importedName)) {
          return;
        }
        context.report({
          node: reference.identifier,
          messageId: 'forbiddenPackageUsage',
          data: {
            hookName,
            importedName: origin.importedName,
            package: origin.package,
          },
        });
      });

      scope.childScopes.forEach(child => visitScope(child, fn, hookName));
    }

    return {
      ImportDeclaration(node) {
        const source = node.source.value;
        if (typeof source !== 'string' || !forbiddenPackageByName.has(source)) {
          return;
        }

        node.specifiers.forEach(specifier => {
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
            forbiddenImports.set(variable, { package: source, importedName });
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

function normalizeForbiddenPackages(raw: ForbiddenPackageOption[] | undefined): NormalizedForbiddenPackage[] {
  const source = raw ?? DEFAULT_FORBIDDEN_PACKAGES;
  return source.map(entry => {
    if (typeof entry === 'string') {
      return { name: entry, allow: new Set<string>() };
    }
    return { name: entry.name, allow: new Set(entry.allow ?? []) };
  });
}

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
