import type { PluginObj, NodePath } from '@babel/core';
import type { Function as BabelFunction } from '@babel/types';

import {
  buildLeafConfig,
  hasAnyLeafRule,
  isAnyMember,
  isSnapshotRead,
  matchAccessorInit,
  matchRiskyCall,
  type AnyCall,
  type AnyMember,
  type LeafRiskConfig,
} from './risk-patterns';
import type { RiskConfig, RiskFinding } from './types';

export interface RiskPluginOptions extends RiskConfig {
  /**
   * Shared map of findings keyed by `line:column` of the *enclosing* function's start,
   * matching the keys used by {@link manualMemoPlugin} and the compiler events so the
   * coverage analyzer can merge them onto `CompileSuccess` rows.
   */
  results: Map<string, RiskFinding[]>;
  /**
   * Maps a function's *body* start key to its declaration key. `CompileSkip` events locate a
   * function at its body, so the coverage merge needs this to find risks for opted-out functions.
   */
  keyAliases?: Map<string, string>;
}

/** Per-file plugin state; the resolved config is built once instead of per visited node. */
interface RiskPluginState {
  opts: RiskPluginOptions;
  leafConfig?: LeafRiskConfig;
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

const SYNC_EXTERNAL_STORE = 'useSyncExternalStore';

/**
 * True when `path` sits anywhere inside a `useSyncExternalStore(…)` call.
 *
 * That API *is* the reactive subscription — React drives `subscribe` and re-invokes `getSnapshot`
 * on every store transition — so nothing within it can be a non-reactive read, whether it is an
 * accessor passed by reference or a read inside the `getSnapshot` callback.
 */
function insideSyncExternalStore(path: NodePath): boolean {
  return (
    path.findParent(p => {
      if (!p.isCallExpression() && !p.isOptionalCallExpression()) {
        return false;
      }
      const callee = (p.node as AnyCall).callee;
      if (callee.type === 'Identifier') {
        return callee.name === SYNC_EXTERNAL_STORE;
      }
      return isAnyMember(callee) && memberNameOf(callee) === SYNC_EXTERNAL_STORE;
    }) !== null
  );
}

/** Static property name of a member access, for matching `React.useSyncExternalStore`. */
function memberNameOf(node: AnyMember): string | null {
  if (!node.computed && node.property.type === 'Identifier') {
    return node.property.name;
  }
  return null;
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
 *   `.getState()`) and `storeAccessorPattern` (a regex, for `getXStore()`). Also follows one step
 *   of local dataflow — `const s = getXStore(); … s.field` — via Babel scope bindings.
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
      Program(_path, state) {
        const s = state as unknown as RiskPluginState;
        s.leafConfig = buildLeafConfig(s.opts);
      },
      'CallExpression|OptionalCallExpression'(path: NodePath<AnyCall>, state: unknown) {
        const { opts, leafConfig } = state as RiskPluginState;
        if (!leafConfig || !hasAnyLeafRule(leafConfig)) {
          return;
        }

        const match = matchRiskyCall(path.node, path.parent, leafConfig);
        if (match) {
          record(path, opts, match);
        }
      },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      VariableDeclarator(path, state) {
        const { opts, leafConfig } = state as unknown as RiskPluginState;
        if (!leafConfig || !hasAnyLeafRule(leafConfig)) {
          return;
        }

        const { id, init } = path.node;
        if (!init || id.type !== 'Identifier') {
          return;
        }

        const match = matchAccessorInit(init, leafConfig, id.name);
        if (!match) {
          return;
        }

        // Scope bindings resolve shadowing for free — a same-named inner binding is a
        // different `Binding` and its references never appear here.
        const binding = path.scope.getBinding(id.name);
        for (const ref of binding?.referencePaths ?? []) {
          if (isSnapshotRead(ref.node, ref.parent)) {
            record(ref, opts, match);
          }
        }
      },
    },
  };
}

/** Record a finding against the enclosing function, with the offending expression's own location. */
function record(path: NodePath, opts: RiskPluginOptions, finding: Omit<RiskFinding, 'line' | 'column'>): void {
  if (insideSyncExternalStore(path)) {
    return;
  }
  const fnPath = enclosingFunction(path);
  if (!fnPath || !fnPath.node.loc) {
    return;
  }
  const callLoc = path.node.loc?.start ?? fnPath.node.loc.start;
  const key = fnKey(fnPath.node.loc.start);
  const list = opts.results.get(key) ?? [];
  list.push({ ...finding, line: callLoc.line, column: callLoc.column });
  opts.results.set(key, list);

  const bodyLoc = fnPath.node.body.loc;
  if (bodyLoc) {
    opts.keyAliases?.set(fnKey(bodyLoc.start), key);
  }
}
