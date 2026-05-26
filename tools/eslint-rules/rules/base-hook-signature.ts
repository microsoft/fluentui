import type { TSESTree, TSESLint } from '@typescript-eslint/utils';
import { ESLintUtils, AST_NODE_TYPES } from '@typescript-eslint/utils';
import {
  BASE_HOOK_NAME_PATTERN,
  STATE_HOOK_NAME_PATTERN,
  type BaseHookFunction,
  collectBaseHookNames,
  createPairDetector,
  getFunctionInit,
} from '../utils/base-hook-detector';

// NOTE: The rule will be available in ESLint configs as "@nx/workspace-base-hook-signature"
export const RULE_NAME = 'base-hook-signature';

const EXPECTED_PARAM_NAMES = ['props', 'ref'] as const;
const MIN_PARAM_COUNT = 1;
const MAX_PARAM_COUNT = 2;

type Options = [];

type MessageIds = 'invalidParamCount' | 'invalidParamName' | 'invalidRefType';

export const rule = ESLintUtils.RuleCreator(() => __filename)<Options, MessageIds>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce the API contract for v9 "base" hooks (`use<Name>Base_unstable`) and their paired wrapping state hooks (`use<Name>_unstable` declared in the same file or a sibling component-folder file): a required `props` parameter and an optional `ref` parameter typed as `React.Ref<...>`.',
    },
    schema: [],
    messages: {
      invalidParamCount:
        'Hook `{{hookName}}` must take 1 or 2 positional parameters (`props`, optional `ref`), got {{actual}}.',
      invalidParamName:
        'Hook `{{hookName}}` parameter #{{index}} must be named `{{expected}}` (Identifier), got `{{actual}}`.',
      invalidRefType: 'Hook `{{hookName}}` parameter `ref` must be typed as `React.Ref<...>`, got `{{actual}}`.',
    },
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.sourceCode;
    const pairDetector = createPairDetector(context.filename);

    /**
     * Validates the hook signature: 1 or 2 positional params, first must be Identifier `props`,
     * optional second must be Identifier `ref` typed as `React.Ref<...>` (verified to originate
     * from the `react` package so collisions with same-named locals don't pass).
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

    return {
      // Populate the pair detector's same-file index from top-level declarations so the state-hook
      // visitor can synchronously decide pairing for the same-file case (82 / 85 occurrences across
      // react-components).
      Program(node: TSESTree.Program): void {
        for (const stmt of node.body) {
          collectBaseHookNames(stmt, pairDetector.baseHooksInCurrentFile);
        }
      },

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
        if (BASE_HOOK_NAME_PATTERN.test(name) || pairDetector.hasPairedBaseHook(name)) {
          checkParameters(name, node, node.id);
        }
      },

      [`VariableDeclarator[id.name=/${STATE_HOOK_NAME_PATTERN.source}/]`]: (node: TSESTree.VariableDeclarator) => {
        const init = getFunctionInit(node);
        if (!init || node.id.type !== AST_NODE_TYPES.Identifier) {
          return;
        }
        const name = node.id.name;
        if (BASE_HOOK_NAME_PATTERN.test(name) || pairDetector.hasPairedBaseHook(name)) {
          checkParameters(name, init, node.id);
        }
      },
    };
  },
});

// ---------------------------------------------------------------------------
// AST helpers
// ---------------------------------------------------------------------------

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
 * Scope-based (no ParserServices required), so the rule still works without TypeScript type
 * information.
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
