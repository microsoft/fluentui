import type { CallExpression, Node } from '@babel/types';

import type { RiskConfig, RiskFinding, RiskRuleId, RiskSeverity } from './types';

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
export function matchRiskyCall(call: CallExpression, parent: Node | null, cfg: LeafRiskConfig): LeafMatch | null {
  const callee = call.callee;

  // ── Hidden selector hook via property chain, e.g. `store.use.field()` ──
  if (
    cfg.hiddenHookProps.size > 0 &&
    callee.type === 'MemberExpression' &&
    !callee.computed &&
    callee.property.type === 'Identifier' &&
    callee.object.type === 'MemberExpression' &&
    !callee.object.computed &&
    callee.object.property.type === 'Identifier' &&
    cfg.hiddenHookProps.has(callee.object.property.name)
  ) {
    const propName = callee.object.property.name;
    const fieldName = callee.property.name;
    const baseName = callee.object.object.type === 'Identifier' ? callee.object.object.name : 'store';
    return {
      ruleId: 'hidden-selector-hook',
      severity: 'high',
      symbol: `${baseName}.${propName}.${fieldName}`,
      message: `hidden hook \`${baseName}.${propName}.${fieldName}()\` is a selector accessed via property chain — not \`useXxx()\`-named, so the compiler may memoize around it and move the hidden hook into a cache branch, causing a hook-order crash (\`areHookInputsEqual\`)`,
    };
  }

  // ── `.getState()` imperative snapshot read ──
  if (
    cfg.detectGetState &&
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
    return {
      ruleId: 'nonreactive-store-read',
      severity: 'high',
      symbol: `${objectName}.getState`,
      message:
        'imperative store snapshot via `.getState()` takes no tracked inputs — memoization caches a stale value across store transitions',
    };
  }

  // ── `getXStore().field` / `const { field } = getXStore()` accessor read ──
  if (cfg.storeAccessorRe && callee.type === 'Identifier' && cfg.storeAccessorRe.test(callee.name)) {
    const calleeName = callee.name;
    const isMemberRead =
      parent?.type === 'MemberExpression' &&
      parent.object === call &&
      !(parent.property.type === 'Identifier' && parent.property.name === 'getState');
    const isDestructured =
      parent?.type === 'VariableDeclarator' && parent.init === call && parent.id.type === 'ObjectPattern';
    if (isMemberRead || isDestructured) {
      return {
        ruleId: 'nonreactive-store-read',
        severity: 'medium',
        symbol: calleeName,
        message: `non-reactive store read via \`${calleeName}()\` — memoization may cache a stale snapshot across store transitions`,
      };
    }
  }

  return null;
}
