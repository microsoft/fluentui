import type { PluginObj, NodePath } from '@babel/core';
import type { Function as BabelFunction, CallExpression } from '@babel/types';

import type { ManualMemoization } from './types';

export interface ManualMemoEntry {
  useMemo: number;
  useCallback: number;
  reactMemo: boolean;
  reactMemoHasComparator: boolean;
  bodyInsertionLine: number;
}

export interface ManualMemoPluginOptions {
  /** Shared map keyed by `line:column` of the enclosing function start */
  results: Map<string, ManualMemoEntry>;
  /** Body insertion lines for ALL functions, keyed by `line:column` */
  bodyInsertionLines?: Map<string, number>;
}

function fnKey(loc: { line: number; column: number }): string {
  return `${loc.line}:${loc.column}`;
}

function getBodyInsertionLine(fnPath: NodePath<BabelFunction>): number {
  const body = fnPath.node.body;
  if (body.type === 'BlockStatement' && body.loc) {
    // Insert after the opening brace — first statement line, or body start + 1
    return body.loc.start.line + 1;
  }
  // Arrow function with expression body (e.g. `() => <div />`) — there is no block
  // where a `'use memo';` directive can be inserted without rewriting the function.
  // Return 0 so callers (fixer, coverage analyzer) skip this function.
  return 0;
}

function hasUseMemoDirective(fnPath: NodePath<BabelFunction>): boolean {
  const body = fnPath.node.body;
  if (body.type !== 'BlockStatement') {
    return false;
  }
  for (const directive of body.directives ?? []) {
    if (directive.value.value === 'use memo') {
      return true;
    }
  }
  return false;
}

/**
 * Resolve the target function wrapped by React.memo(fn).
 * Handles: identifiers referencing functions, inline function expressions, and arrow functions.
 */
function resolveReactMemoTarget(callPath: NodePath<CallExpression>): NodePath<BabelFunction> | null {
  const args = callPath.node.arguments;
  if (args.length === 0) {
    return null;
  }
  const firstArg = args[0];

  if (firstArg.type === 'Identifier') {
    // React.memo(InnerComponent) — resolve binding to find the function
    const binding = callPath.scope.getBinding(firstArg.name);
    if (!binding) {
      return null;
    }
    const bindingPath = binding.path;
    if (bindingPath.isFunctionDeclaration()) {
      return bindingPath as NodePath<BabelFunction>;
    }
    if (bindingPath.isVariableDeclarator()) {
      const init = bindingPath.get('init') as NodePath;
      if (init.isFunctionExpression() || init.isArrowFunctionExpression()) {
        return init as NodePath<BabelFunction>;
      }
    }
    return null;
  }

  if (firstArg.type === 'FunctionExpression' || firstArg.type === 'ArrowFunctionExpression') {
    // React.memo(function() {...}) or React.memo(() => {...})
    const argPath = callPath.get('arguments.0') as NodePath<BabelFunction>;
    return argPath;
  }

  return null;
}

/**
 * Babel plugin that detects manual memoization (useMemo, useCallback, React.memo)
 * within function bodies and records body insertion lines for all functions.
 *
 * Populates two shared Maps in plugin options keyed by `line:column` of the function start:
 * - `results`: Manual memoization entries for functions containing useMemo/useCallback/React.memo
 * - `bodyInsertionLines`: The line where a directive can be inserted for ALL functions (used by `--annotate all`)
 */
export function manualMemoPlugin(): PluginObj {
  return {
    name: 'manual-memo-detection',
    visitor: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Function(path, state) {
        const opts = state.opts as unknown as ManualMemoPluginOptions;
        const fnNode = path.node as BabelFunction;
        if (!fnNode.loc) {
          return;
        }
        const key = fnKey(fnNode.loc.start);
        const insertionLine = getBodyInsertionLine(path as NodePath<BabelFunction>);
        if (insertionLine > 0) {
          opts.bodyInsertionLines?.set(key, insertionLine);
        }
      },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      CallExpression(path, state) {
        const opts = state.opts as unknown as ManualMemoPluginOptions;
        const callee = path.node.callee;

        let hookName: 'useMemo' | 'useCallback' | 'reactMemo' | null = null;

        // Direct call: memo(...), useMemo(...), useCallback(...)
        if (callee.type === 'Identifier') {
          const binding = path.scope.getBinding(callee.name);
          if (binding?.path.parent?.type === 'ImportDeclaration' && binding.path.parent.source.value === 'react') {
            if (callee.name === 'useMemo') {
              hookName = 'useMemo';
            } else if (callee.name === 'useCallback') {
              hookName = 'useCallback';
            } else if (callee.name === 'memo') {
              hookName = 'reactMemo';
            }
          }
        }

        // Member expression: React.memo(...), React.useMemo(...), React.useCallback(...)
        if (
          callee.type === 'MemberExpression' &&
          callee.object.type === 'Identifier' &&
          callee.property.type === 'Identifier'
        ) {
          const binding = path.scope.getBinding(callee.object.name);
          if (binding?.path.parent?.type === 'ImportDeclaration' && binding.path.parent.source.value === 'react') {
            if (callee.property.name === 'memo') {
              hookName = 'reactMemo';
            } else if (callee.property.name === 'useMemo') {
              hookName = 'useMemo';
            } else if (callee.property.name === 'useCallback') {
              hookName = 'useCallback';
            }
          }
        }

        if (!hookName) {
          return;
        }

        // For reactMemo, resolve the *wrapped* function (the argument to React.memo())
        // rather than the enclosing function, since React.memo() is typically at module level.
        if (hookName === 'reactMemo') {
          const targetFnPath = resolveReactMemoTarget(path);
          if (!targetFnPath || !targetFnPath.node.loc) {
            return;
          }

          const key = fnKey(targetFnPath.node.loc.start);
          let entry = opts.results.get(key);
          if (!entry) {
            entry = {
              useMemo: 0,
              useCallback: 0,
              reactMemo: false,
              reactMemoHasComparator: false,
              bodyInsertionLine: getBodyInsertionLine(targetFnPath),
            };
            opts.results.set(key, entry);
          }
          entry.reactMemo = true;
          entry.reactMemoHasComparator = path.node.arguments.length > 1;
          return;
        }

        // For useMemo/useCallback, find the enclosing function
        const fnPath = path.findParent(
          p => p.isFunctionDeclaration() || p.isFunctionExpression() || p.isArrowFunctionExpression(),
        ) as NodePath<BabelFunction> | null;

        if (!fnPath || !fnPath.node.loc) {
          return;
        }

        // Skip functions that already have 'use memo' directive
        if (hasUseMemoDirective(fnPath)) {
          return;
        }

        const key = fnKey(fnPath.node.loc.start);
        let entry = opts.results.get(key);

        if (!entry) {
          entry = {
            useMemo: 0,
            useCallback: 0,
            reactMemo: false,
            reactMemoHasComparator: false,
            bodyInsertionLine: getBodyInsertionLine(fnPath),
          };
          opts.results.set(key, entry);
        }

        if (hookName === 'useMemo') {
          entry.useMemo++;
        } else if (hookName === 'useCallback') {
          entry.useCallback++;
        }
      },
    },
  };
}
