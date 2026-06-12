import type { PluginObj, NodePath } from '@babel/core';
import type { Function as BabelFunction, CallExpression } from '@babel/types';

import { buildLeafConfig, hasAnyLeafRule, matchRiskyCall } from './risk-patterns';
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
 * Babel plugin that flags calls which compile successfully under the React Compiler but
 * misbehave once the enclosing function is memoized. All rules are OFF unless explicitly
 * configured — their conventions are app-specific, not universal. Leaf detection is shared
 * with the cross-file call-graph analyzer via {@link matchRiskyCall}.
 *
 * - **`nonreactive-store-read`** — an imperative snapshot read with no tracked inputs
 *   (`store.getState()`, `getXStore().field`, `const { x } = getXStore()`). The compiler hoists
 *   it into a compute-once cache slot, so it runs on the first render and is **never re-read**,
 *   freezing the value across store transitions. Enabled by `detectGetStateReads` (for
 *   `.getState()`) and `storeAccessorPattern` (a regex, for `getXStore()`).
 * - **`hidden-selector-hook`** — a selector accessed via property chain (`store.use.field()`)
 *   that calls a real hook (`useStore`) internally but isn't `useXxx()`-named at the call site.
 *   Neither the compiler nor the `react-hooks` lint recognizes it as a hook, so the compiler may
 *   memoize around it — moving the hidden hook into a cache branch and causing a hook-order crash
 *   (`areHookInputsEqual`). Enabled by listing the marker property names in `selectorHookProperties`
 *   (e.g. `["use"]`).
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
        const cfg = buildLeafConfig(opts);
        if (!hasAnyLeafRule(cfg)) {
          return;
        }

        const match = matchRiskyCall(path.node, path.parent, cfg);
        if (match) {
          record(path, opts.results, match);
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
