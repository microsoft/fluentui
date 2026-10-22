import type { PluginObj, NodePath } from '@babel/core';
import type { Function as BabelFunction, CallExpression, Node } from '@babel/types';

import { locationKey } from './identity';
import { getReactCallName, type SourceFunctionIndex } from './source-functions';

export interface ManualMemoEntry {
  useMemo: number;
  useCallback: number;
  reactMemo: boolean;
  reactMemoHasComparator: boolean;
  bodyInsertionLine: number;
}

export interface ManualMemoPluginOptions {
  /** Canonical function inventory used by the analyzer pipeline. */
  sourceFunctions?: SourceFunctionIndex;
  /** Shared map keyed by `line:column` of the enclosing function start */
  results?: Map<string, ManualMemoEntry>;
  /** Body insertion lines for ALL functions, keyed by `line:column` */
  bodyInsertionLines?: Map<string, number>;
  /** Directives already present on each function, keyed by `line:column`. */
  existingDirectives?: Map<string, ExistingDirectives>;
  /**
   * Body-start key → declaration-start key, for every function. A `CompileSkip` event locates a
   * function at its body, so results for opted-out functions arrive under a key none of the
   * AST-derived maps above use.
   */
  keyAliases?: Map<string, string>;
}

/** Which memo directives a function body already declares. */
export interface ExistingDirectives {
  useMemo: boolean;
  useNoMemo: boolean;
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

/** Read the memo directives declared at the top of a function body. */
function readDirectives(fnPath: NodePath<BabelFunction>): ExistingDirectives {
  const body = fnPath.node.body;
  const found: ExistingDirectives = { useMemo: false, useNoMemo: false };
  if (body.type !== 'BlockStatement') {
    return found;
  }
  for (const directive of body.directives ?? []) {
    if (directive.value.value === 'use memo') {
      found.useMemo = true;
    } else if (directive.value.value === 'use no memo') {
      found.useNoMemo = true;
    }
  }
  return found;
}

/**
 * Resolve the target function wrapped by React.memo(fn).
 * Follow immutable local bindings and React memo/forwardRef wrappers to the render function.
 */
function resolveReactMemoTarget(callPath: NodePath<CallExpression>): NodePath<BabelFunction> | null {
  let target = callPath.get('arguments')[0];
  const visited = new Set<Node>();
  while (target?.node && !visited.has(target.node)) {
    visited.add(target.node);
    if (target.isFunctionDeclaration() || target.isFunctionExpression() || target.isArrowFunctionExpression()) {
      return target;
    }
    if (target.isIdentifier()) {
      const binding = target.scope.getBinding(target.node.name);
      if (!binding?.constant) {
        return null;
      }
      if (binding.path.isFunctionDeclaration()) {
        return binding.path;
      }
      if (binding.path.isVariableDeclarator()) {
        const init = binding.path.get('init');
        if (init.isExpression()) {
          target = init;
          continue;
        }
      }
    } else if (target.isCallExpression()) {
      const name = getReactCallName(target);
      if (name === 'memo' || name === 'forwardRef') {
        target = target.get('arguments')[0];
        continue;
      }
    }
    break;
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
        const key = locationKey(fnNode.loc.start);
        opts.sourceFunctions?.addFunction(path as NodePath<BabelFunction>);
        const insertionLine = getBodyInsertionLine(path as NodePath<BabelFunction>);
        if (insertionLine > 0) {
          opts.bodyInsertionLines?.set(key, insertionLine);
        }
        opts.existingDirectives?.set(key, readDirectives(path as NodePath<BabelFunction>));
        const bodyLoc = fnNode.body.loc;
        if (bodyLoc) {
          opts.keyAliases?.set(locationKey(bodyLoc.start), key);
        }
      },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      CallExpression(path, state) {
        const opts = state.opts as unknown as ManualMemoPluginOptions;
        const hookName = getReactCallName(path);
        if (hookName !== 'memo' && hookName !== 'useMemo' && hookName !== 'useCallback') {
          return;
        }

        // For reactMemo, resolve the *wrapped* function (the argument to React.memo())
        // rather than the enclosing function, since React.memo() is typically at module level.
        if (hookName === 'memo') {
          const targetFnPath = resolveReactMemoTarget(path);
          if (!targetFnPath || !targetFnPath.node.loc) {
            return;
          }

          const sourceFunction =
            opts.sourceFunctions?.findByNode(targetFnPath.node) ??
            opts.sourceFunctions?.addFunction(targetFnPath as NodePath<BabelFunction>);
          if (sourceFunction) {
            opts.sourceFunctions!.recordManualMemo(sourceFunction.id, 'react-memo', path.node.arguments.length > 1);
          }

          const key = locationKey(targetFnPath.node.loc.start);
          let entry = opts.results?.get(key);
          if (!entry) {
            entry = {
              useMemo: 0,
              useCallback: 0,
              reactMemo: false,
              reactMemoHasComparator: false,
              bodyInsertionLine: getBodyInsertionLine(targetFnPath),
            };
            opts.results?.set(key, entry);
          }
          entry.reactMemo = true;
          entry.reactMemoHasComparator ||= path.node.arguments.length > 1;
          return;
        }

        // For useMemo/useCallback, find the enclosing function
        const fnPath = path.findParent(
          p => p.isFunctionDeclaration() || p.isFunctionExpression() || p.isArrowFunctionExpression(),
        ) as NodePath<BabelFunction> | null;

        if (!fnPath || !fnPath.node.loc) {
          return;
        }
        const sourceFunction = opts.sourceFunctions?.findByNode(fnPath.node);
        const siteKind = hookName === 'useMemo' ? 'use-memo' : 'use-callback';
        if (sourceFunction) {
          opts.sourceFunctions!.recordManualMemo(sourceFunction.id, siteKind);
        }

        const key = locationKey(fnPath.node.loc.start);
        let entry = opts.results?.get(key);

        if (!entry) {
          entry = {
            useMemo: 0,
            useCallback: 0,
            reactMemo: false,
            reactMemoHasComparator: false,
            bodyInsertionLine: getBodyInsertionLine(fnPath),
          };
          opts.results?.set(key, entry);
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
