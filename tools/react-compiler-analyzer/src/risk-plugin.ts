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
 * Babel plugin that flags calls which compile successfully under the React Compiler but
 * misbehave once the enclosing function is memoized. All rules are OFF unless explicitly
 * configured — their conventions are app-specific, not universal.
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
        const detectGetState = opts.detectGetStateReads === true;
        const storeAccessorRe = opts.storeAccessorPattern ? new RegExp(opts.storeAccessorPattern) : null;
        const hiddenHookProps = new Set(opts.selectorHookProperties ?? []);

        const callee = path.node.callee;

        // ── Hidden selector hook via property chain, e.g. `store.use.field()` (opt-in) ──
        // A zustand-style selector accessed as `<expr>.<prop>.<field>()` where `<prop>` is a
        // configured marker (e.g. `use`). It calls a real hook (`useStore`) internally, but is
        // not `useXxx()`-named at the call site, so neither the React Compiler nor the
        // `react-hooks` lint recognizes it as a hook. The compiler may then memoize around it,
        // moving the hidden hook into a compute-once cache branch → hook-order mismatch →
        // `areHookInputsEqual` crash. Verified against the compiler's `memo_cache_sentinel` output.
        if (
          hiddenHookProps.size > 0 &&
          callee.type === 'MemberExpression' &&
          !callee.computed &&
          callee.property.type === 'Identifier' &&
          callee.object.type === 'MemberExpression' &&
          !callee.object.computed &&
          callee.object.property.type === 'Identifier' &&
          hiddenHookProps.has(callee.object.property.name)
        ) {
          const propName = callee.object.property.name;
          const fieldName = callee.property.name;
          const baseName = callee.object.object.type === 'Identifier' ? callee.object.object.name : 'store';
          record(path, opts.results, {
            ruleId: 'hidden-selector-hook',
            severity: 'high',
            symbol: `${baseName}.${propName}.${fieldName}`,
            message: `hidden hook \`${baseName}.${propName}.${fieldName}()\` is a selector accessed via property chain — not \`useXxx()\`-named, so the compiler may memoize around it and move the hidden hook into a cache branch, causing a hook-order crash (\`areHookInputsEqual\`)`,
          });
          return;
        }

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

        // ── `getXStore().field` / `const { field } = getXStore()` accessor read (opt-in) ──
        // Requires an explicit `storeAccessorPattern`. Fires when a value is read off the
        // accessor result — either a member access (`.field`) or object destructuring
        // (`const { field } = ...`) — but not the `.getState()` form handled above.
        if (storeAccessorRe && callee.type === 'Identifier' && storeAccessorRe.test(callee.name)) {
          const calleeName = callee.name;
          const parent = path.parentPath;
          const isMemberRead =
            parent.isMemberExpression() &&
            parent.node.object === path.node &&
            !(parent.node.property.type === 'Identifier' && parent.node.property.name === 'getState');
          const isDestructured =
            parent.isVariableDeclarator() && parent.node.init === path.node && parent.node.id.type === 'ObjectPattern';
          if (isMemberRead || isDestructured) {
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
