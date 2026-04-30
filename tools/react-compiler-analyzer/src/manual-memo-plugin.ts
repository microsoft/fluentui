import type { PluginObj, NodePath } from '@babel/core';
import type { Function as BabelFunction } from '@babel/types';

import type { ManualMemoization } from './types';

export interface ManualMemoEntry {
  useMemo: number;
  useCallback: number;
  reactMemo: boolean;
  bodyInsertionLine: number;
}

export interface ManualMemoPluginOptions {
  /** Shared map keyed by `line:column` of the enclosing function start */
  results: Map<string, ManualMemoEntry>;
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
  // Arrow function with expression body — use the function start line
  if (fnPath.node.loc) {
    return fnPath.node.loc.start.line;
  }
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
 * Babel plugin that detects manual memoization (useMemo, useCallback, React.memo)
 * within function bodies. Populates a shared Map in plugin options keyed by function location.
 */
export function manualMemoPlugin(): PluginObj {
  return {
    name: 'manual-memo-detection',
    visitor: {
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

        // Find the enclosing function
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
            bodyInsertionLine: getBodyInsertionLine(fnPath),
          };
          opts.results.set(key, entry);
        }

        if (hookName === 'useMemo') {
          entry.useMemo++;
        } else if (hookName === 'useCallback') {
          entry.useCallback++;
        } else if (hookName === 'reactMemo') {
          entry.reactMemo = true;
        }
      },
    },
  };
}
