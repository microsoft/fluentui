import type {
  CallExpression,
  MemberExpression,
  Node,
  OptionalCallExpression,
  OptionalMemberExpression,
} from '@babel/types';

import type { RiskConfig, RiskFinding, RiskRuleId, RiskSeverity } from './types';

/**
 * A call, optionally chained. `store?.use.field()` parses as `OptionalCallExpression`, a distinct
 * node type from `CallExpression`, so every rule has to accept both or `?.` silently escapes it.
 */
export type AnyCall = CallExpression | OptionalCallExpression;

/** A member access, optionally chained. */
export type AnyMember = MemberExpression | OptionalMemberExpression;

export function isAnyCall(node: Node | null | undefined): node is AnyCall {
  return node?.type === 'CallExpression' || node?.type === 'OptionalCallExpression';
}

export function isAnyMember(node: Node | null | undefined): node is AnyMember {
  return node?.type === 'MemberExpression' || node?.type === 'OptionalMemberExpression';
}

/**
 * A `useXxx`-named callee, which the React Compiler recognizes as a hook.
 *
 * Shared with the call-graph so both halves agree on what a hook is.
 */
export function isHookName(name: string): boolean {
  return /^use[A-Z]/.test(name);
}

/** Resolved, ready-to-use form of the leaf-detection knobs from {@link RiskConfig}. */
export interface LeafRiskConfig {
  detectGetState: boolean;
  storeAccessorRe: RegExp | null;
  hiddenHookProps: Set<string>;
}

/** The risk-relevant fields of a finding, before a location is attached. */
export interface LeafMatch {
  ruleId: RiskRuleId;
  severity: RiskSeverity;
  symbol: string;
  message: string;
}

const GET_STATE_MESSAGE =
  'imperative store snapshot via `.getState()` takes no tracked inputs — memoization caches a stale value across store transitions';

function accessorMessage(calleeName: string): string {
  return `non-reactive store read via \`${calleeName}()\` — memoization may cache a stale snapshot across store transitions`;
}

/**
 * Render a receiver expression as a readable symbol prefix so findings stay traceable to source
 * when the receiver is not a plain identifier (`useFooStore(x).use.bar()` → `useFooStore()`).
 */
function describeReceiver(node: Node): string {
  switch (node.type) {
    case 'Identifier':
      return node.name;
    case 'ThisExpression':
      return 'this';
    case 'CallExpression':
    case 'OptionalCallExpression':
      return node.callee.type === 'Identifier' ? `${node.callee.name}()` : `${describeReceiver(node.callee)}()`;
    case 'MemberExpression':
    case 'OptionalMemberExpression': {
      const property = memberName(node);
      const object = describeReceiver(node.object);
      return property === null ? object : `${object}.${property}`;
    }
    default:
      return 'store';
  }
}

/** Static property name of a member access, covering both `a.b` and `a['b']`. */
function memberName(node: AnyMember): string | null {
  if (!node.computed && node.property.type === 'Identifier') {
    return node.property.name;
  }
  if (node.computed && node.property.type === 'StringLiteral') {
    return node.property.value;
  }
  return null;
}

/** Build the resolved leaf-detection config once from raw {@link RiskConfig}. */
export function buildLeafConfig(opts: RiskConfig): LeafRiskConfig {
  return {
    detectGetState: opts.detectGetStateReads === true,
    storeAccessorRe: opts.storeAccessorPattern ? new RegExp(opts.storeAccessorPattern) : null,
    hiddenHookProps: new Set(opts.selectorHookProperties ?? []),
  };
}

/** True when any leaf rule is enabled — lets callers skip work entirely. */
export function hasAnyLeafRule(cfg: LeafRiskConfig): boolean {
  return cfg.detectGetState || cfg.storeAccessorRe !== null || cfg.hiddenHookProps.size > 0;
}

/**
 * Match a single call expression against the leaf risk rules. Pure and parser-agnostic:
 * works on raw `@babel/types` nodes, so both the in-file Babel plugin and the cross-file
 * call-graph analyzer share one detection source of truth.
 *
 * `parent` is the call's parent node — required to distinguish a store accessor that is
 * actually read (`getXStore().field` / `const { x } = getXStore()`) from a bare call.
 */
export function matchRiskyCall(call: AnyCall, parent: Node | null, cfg: LeafRiskConfig): LeafMatch | null {
  const callee = call.callee;

  // ── Hidden selector hook via property chain, e.g. `store.use.field()` ──
  // The receiver is deliberately unconstrained: `useFooStore(x).use.bar()` and `a.b.use.bar()`
  // resolve to the same hidden hook at runtime as the plain-identifier form.
  if (cfg.hiddenHookProps.size > 0 && isAnyMember(callee) && isAnyMember(callee.object)) {
    const fieldName = memberName(callee);
    const propName = memberName(callee.object);
    if (fieldName !== null && propName !== null && cfg.hiddenHookProps.has(propName)) {
      const baseName = describeReceiver(callee.object.object);
      return {
        ruleId: 'hidden-selector-hook',
        severity: 'high',
        symbol: `${baseName}.${propName}.${fieldName}`,
        message: `hidden hook \`${baseName}.${propName}.${fieldName}()\` is a selector accessed via property chain — not \`useXxx()\`-named, so the compiler may memoize around it and move the hidden hook into a cache branch, causing a hook-order crash (\`areHookInputsEqual\`)`,
      };
    }
  }

  // ── `.getState()` imperative snapshot read ──
  if (cfg.detectGetState && isAnyMember(callee) && memberName(callee) === 'getState') {
    return {
      ruleId: 'nonreactive-store-read',
      severity: 'high',
      symbol: `${describeReceiver(callee.object)}.getState`,
      message: GET_STATE_MESSAGE,
    };
  }

  // ── `getXStore().field` / `const { field } = getXStore()` accessor read ──
  // A `useXxx`-named callee is excluded: the compiler never hoists a hook call into a
  // compute-once cache slot (that would break the Rules of Hooks), so its result is re-read
  // every render and cannot go stale. `Store$` matches `useStore` too, hence the guard.
  if (
    cfg.storeAccessorRe &&
    callee.type === 'Identifier' &&
    !isHookName(callee.name) &&
    cfg.storeAccessorRe.test(callee.name)
  ) {
    const calleeName = callee.name;
    if (isSnapshotRead(call, parent)) {
      return {
        ruleId: 'nonreactive-store-read',
        severity: 'medium',
        symbol: calleeName,
        message: accessorMessage(calleeName),
      };
    }
  }

  return null;
}

/**
 * Match a `VariableDeclarator` initializer that produces a store snapshot, so callers can treat
 * later reads of that binding as accessor reads (`const s = getChatStore(); … s.field`).
 *
 * One step of local dataflow past {@link matchRiskyCall}, which only ever sees the call site.
 * `bindingName` is woven into the message so the report points at the variable to inspect.
 */
export function matchAccessorInit(init: Node, cfg: LeafRiskConfig, bindingName: string): LeafMatch | null {
  if (!isAnyCall(init)) {
    return null;
  }
  const callee = init.callee;
  const via = `(read through local binding \`${bindingName}\`)`;

  if (cfg.detectGetState && isAnyMember(callee) && memberName(callee) === 'getState') {
    return {
      ruleId: 'nonreactive-store-read',
      severity: 'high',
      symbol: `${describeReceiver(callee.object)}.getState`,
      message: `${GET_STATE_MESSAGE} ${via}`,
    };
  }

  // Same hook exclusion as {@link matchRiskyCall}: a hook's return value is recomputed every
  // render, so binding it to a local does not make it a stale snapshot.
  if (
    cfg.storeAccessorRe &&
    callee.type === 'Identifier' &&
    !isHookName(callee.name) &&
    cfg.storeAccessorRe.test(callee.name)
  ) {
    return {
      ruleId: 'nonreactive-store-read',
      severity: 'medium',
      symbol: callee.name,
      message: `${accessorMessage(callee.name)} ${via}`,
    };
  }

  return null;
}

/**
 * Store-API surface. Reading one of these yields a *function*, never state, so it cannot be a
 * stale snapshot however it is used — `useSyncExternalStore(store.subscribe, store.getState)`
 * passes both by reference and invokes neither during render.
 */
const STORE_API_MEMBERS = new Set(['getState', 'setState', 'subscribe', 'destroy', 'getInitialState']);

/**
 * True when `parent` reads a value off `node` in a way that surfaces store state — a static member
 * access or an object-destructuring bind. Store-API methods are excluded: `.getState` is owned by
 * {@link matchRiskyCall}, and the rest are function references rather than state.
 */
export function isSnapshotRead(node: Node, parent: Node | null): boolean {
  if (isAnyMember(parent) && parent.object === node) {
    const name = memberName(parent);
    // A dynamic key (`s[k]`) could be anything, so keep treating it as a read.
    return name === null || !STORE_API_MEMBERS.has(name);
  }
  return parent?.type === 'VariableDeclarator' && parent.init === node && parent.id.type === 'ObjectPattern';
}
