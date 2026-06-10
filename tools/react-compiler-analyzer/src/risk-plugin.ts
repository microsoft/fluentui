import type { PluginObj, NodePath } from '@babel/core';
import type {
  Function as BabelFunction,
  CallExpression,
  Expression,
  SpreadElement,
  ArgumentPlaceholder,
} from '@babel/types';

import type { RiskConfig, RiskFinding, RiskSeverity } from './types';

export interface RiskPluginOptions extends RiskConfig {
  /**
   * Shared map of findings keyed by `line:column` of the *enclosing* function's start,
   * matching the keys used by {@link manualMemoPlugin} and the compiler events so the
   * coverage analyzer can merge them onto `CompileSuccess` rows.
   */
  results: Map<string, RiskFinding[]>;
}

/**
 * React built-in hooks. These already receive unstable inline arguments by design
 * (e.g. `useEffect(() => {...}, [])`, `useState({})`), so the generic heuristic must
 * never flag them — doing so would bury real findings in noise.
 */
const REACT_BUILTIN_HOOKS = new Set([
  'useState',
  'useReducer',
  'useRef',
  'useMemo',
  'useCallback',
  'useEffect',
  'useLayoutEffect',
  'useInsertionEffect',
  'useImperativeHandle',
  'useContext',
  'useDebugValue',
  'useId',
  'useTransition',
  'useDeferredValue',
  'useSyncExternalStore',
]);

type CallArg = Expression | SpreadElement | ArgumentPlaceholder;

function fnKey(loc: { line: number; column: number }): string {
  return `${loc.line}:${loc.column}`;
}

/** Is this argument a *fresh inline reference* — created anew on every render? */
function isInlineUnstableArg(arg: CallArg): { kind: 'object' | 'array' | 'function' } | null {
  switch (arg.type) {
    case 'ObjectExpression':
      return { kind: 'object' };
    case 'ArrayExpression':
      return { kind: 'array' };
    case 'ArrowFunctionExpression':
    case 'FunctionExpression':
      return { kind: 'function' };
    default:
      return null;
  }
}

/** Resolve the import source a top-level identifier binding was imported from, if any. */
function importSourceOf(path: NodePath, name: string): string | null {
  const binding = path.scope.getBinding(name);
  const parent = binding?.path.parent;
  if (parent?.type === 'ImportDeclaration') {
    return parent.source.value;
  }
  return null;
}

/** Find the nearest enclosing function (the one the compiler memoizes). */
function enclosingFunction(path: NodePath): NodePath<BabelFunction> | null {
  const fnPath = path.findParent(
    p => p.isFunctionDeclaration() || p.isFunctionExpression() || p.isArrowFunctionExpression(),
  ) as NodePath<BabelFunction> | null;
  return fnPath && fnPath.node.loc ? fnPath : null;
}

/**
 * Babel plugin that flags patterns which compile successfully under the React Compiler
 * but break at runtime once the enclosing function is memoized. See {@link RiskFinding}.
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
        const generic = opts.generic !== false;
        const selectorHooks = new Set(opts.selectorHooks ?? []);
        const selectorHookSources = new Set(opts.selectorHookSources ?? []);
        // Pattern 1 (non-reactive store reads) is OFF unless explicitly configured — the
        // `.getState()` / `getXStore()` conventions are app-specific, not universal.
        const detectGetState = opts.detectGetStateReads === true;
        const storeAccessorRe = opts.storeAccessorPattern ? new RegExp(opts.storeAccessorPattern) : null;

        const callee = path.node.callee;

        // ── Pattern 1a: `.getState()` imperative snapshot read (opt-in) ──
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

        if (callee.type !== 'Identifier') {
          return;
        }
        const calleeName = callee.name;

        // ── Pattern 1b: `getXStore().field` direct accessor read (opt-in) ──
        // Requires an explicit `storeAccessorPattern`; only fires when the result is
        // immediately member-accessed (a value is read off it) and it is not the
        // `.getState()` form handled above.
        if (storeAccessorRe && storeAccessorRe.test(calleeName)) {
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
          // A store accessor is not also a selector hook.
          return;
        }

        // ── Pattern 2: fresh inline args to a `use*` selector hook ──
        if (!/^use[A-Z]/.test(calleeName) || REACT_BUILTIN_HOOKS.has(calleeName)) {
          return;
        }

        const source = importSourceOf(path, calleeName);
        const isConfiguredSelector =
          selectorHooks.has(calleeName) || (source !== null && selectorHookSources.has(source));

        // Generic mode flags inline object/array literals to any unknown hook (low confidence).
        // Configured selector hooks additionally flag inline functions (equalityFn / filter) at high confidence.
        if (!isConfiguredSelector && !generic) {
          return;
        }

        for (const arg of path.node.arguments) {
          const inline = isInlineUnstableArg(arg as CallArg);
          if (!inline) {
            continue;
          }
          // Generic (non-configured) hooks: only object/array literals; skip inline functions to limit noise.
          if (!isConfiguredSelector && inline.kind === 'function') {
            continue;
          }
          const severity: RiskSeverity = isConfiguredSelector ? 'high' : 'low';
          record(path, opts.results, {
            ruleId: 'unstable-hook-arg',
            severity,
            symbol: calleeName,
            message: `fresh inline ${inline.kind} passed to \`${calleeName}()\` each render — destabilizes the selector hook's dependency slots (\`areHookInputsEqual\`) once memoized`,
          });
          // One finding per call is enough to flag the site.
          break;
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
