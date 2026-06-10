import type { PluginObj, NodePath } from '@babel/core';
import type { Function as BabelFunction, CallExpression } from '@babel/types';

import type { RiskConfig, RiskFinding } from './types';

export interface RiskPluginOptions extends RiskConfig {
  /**
   * Shared map of findings keyed by `line:column` of the *enclosing* function's start,
   * matching the keys used by {@link manualMemoPlugin} and the compiler events so the
   * coverage analyzer can merge them onto `CompileSuccess` rows.
   */
  results: Map<string, RiskFinding[]>;
}

function fnKey(loc: { line: number; column: number }): string {
  return `${loc.line}:${loc.column}`;
}

/** Find the nearest enclosing function (the one the compiler memoizes). */
function enclosingFunction(path: NodePath): NodePath<BabelFunction> | null {
  const fnPath = path.findParent(
    p => p.isFunctionDeclaration() || p.isFunctionExpression() || p.isArrowFunctionExpression(),
  ) as NodePath<BabelFunction> | null;
  return fnPath && fnPath.node.loc ? fnPath : null;
}

/**
 * Babel plugin that flags imperative store-snapshot reads which compile successfully under
 * the React Compiler but cache a stale value once the enclosing function is memoized.
 *
 * The compiler memoizes a read with no tracked inputs (`store.getState()`, `getXStore().field`)
 * behind a compute-once cache slot, so it runs on the first render and is **never re-read** —
 * freezing the value across store transitions. This is a real, compiler-introduced bug that
 * the `CompileSuccess` verdict cannot reveal. See {@link RiskFinding}.
 *
 * Detection is OFF unless explicitly configured — the `.getState()` / `getXStore()` conventions
 * are app-specific, not universal:
 * - `detectGetStateReads` enables `.getState()` snapshot detection.
 * - `storeAccessorPattern` (a regex) enables `getXStore().field` detection.
 *
 * Findings are recorded against the enclosing function's start location so the coverage
 * analyzer can attach them to the corresponding `CompileSuccess` row. Functions that the
 * compiler does not recognize never get a `CompileSuccess` event, so their findings are
 * naturally dropped during the merge.
 */
export function riskPlugin(): PluginObj {
  return {
    name: 'react-compiler-risk-detection',
    visitor: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      CallExpression(path, state) {
        const opts = state.opts as unknown as RiskPluginOptions;
        const detectGetState = opts.detectGetStateReads === true;
        const storeAccessorRe = opts.storeAccessorPattern ? new RegExp(opts.storeAccessorPattern) : null;

        const callee = path.node.callee;

        // ── `.getState()` imperative snapshot read (opt-in) ──
        if (
          detectGetState &&
          callee.type === 'MemberExpression' &&
          callee.property.type === 'Identifier' &&
          callee.property.name === 'getState' &&
          !callee.computed
        ) {
          const objectName =
            callee.object.type === 'CallExpression' && callee.object.callee.type === 'Identifier'
              ? callee.object.callee.name
              : callee.object.type === 'Identifier'
              ? callee.object.name
              : 'store';
          record(path, opts.results, {
            ruleId: 'nonreactive-store-read',
            severity: 'high',
            symbol: `${objectName}.getState`,
            message:
              'imperative store snapshot via `.getState()` takes no tracked inputs — memoization caches a stale value across store transitions',
          });
          return;
        }

        // ── `getXStore().field` direct accessor read (opt-in) ──
        // Requires an explicit `storeAccessorPattern`; only fires when the result is
        // immediately member-accessed (a value is read off it) and it is not the
        // `.getState()` form handled above.
        if (storeAccessorRe && callee.type === 'Identifier' && storeAccessorRe.test(callee.name)) {
          const calleeName = callee.name;
          const parent = path.parentPath;
          const isPropertyRead =
            parent.isMemberExpression() &&
            parent.node.object === path.node &&
            !(parent.node.property.type === 'Identifier' && parent.node.property.name === 'getState');
          if (isPropertyRead) {
            record(path, opts.results, {
              ruleId: 'nonreactive-store-read',
              severity: 'medium',
              symbol: calleeName,
              message: `non-reactive store read via \`${calleeName}()\` — memoization may cache a stale snapshot across store transitions`,
            });
          }
        }
      },
    },
  };
}

/** Record a finding against the enclosing function, with the offending call's own location. */
function record(
  path: NodePath<CallExpression>,
  results: Map<string, RiskFinding[]>,
  finding: Omit<RiskFinding, 'line' | 'column'>,
): void {
  const fnPath = enclosingFunction(path);
  if (!fnPath || !fnPath.node.loc) {
    return;
  }
  const callLoc = path.node.loc?.start ?? fnPath.node.loc.start;
  const key = fnKey(fnPath.node.loc.start);
  const list = results.get(key) ?? [];
  list.push({ ...finding, line: callLoc.line, column: callLoc.column });
  results.set(key, list);
}
