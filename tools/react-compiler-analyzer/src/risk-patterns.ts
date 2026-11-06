import type { Node } from 'oxc-parser';

import type { RiskConfig, RiskFinding, RiskRuleId, RiskSeverity } from './types';

export type AnyCall = Node;
export type AnyMember = Node;

function unwrapChain(node: Node | null | undefined): Node | null {
  let current = node ?? null;
  while (current?.type === 'ChainExpression') {
    current = (current as Node & { expression: Node }).expression;
  }
  return current;
}

export function isAnyCall(node: Node | null | undefined): node is Node {
  return unwrapChain(node)?.type === 'CallExpression';
}

export function isAnyMember(node: Node | null | undefined): node is Node {
  return unwrapChain(node)?.type === 'MemberExpression';
}

export function isHookName(name: string): boolean {
  return /^use[A-Z0-9]/.test(name);
}

export interface LeafRiskConfig {
  detectGetState: boolean;
  storeAccessorRe: RegExp | null;
  hiddenHookProps: Set<string>;
}

export interface LeafMatch {
  ruleId: RiskRuleId;
  severity: RiskSeverity;
  symbol: string;
  message: string;
}

const GET_STATE_MESSAGE =
  'imperative store snapshot via `.getState()` takes no tracked inputs — memoization may cache a stale value across store transitions';

function accessorMessage(calleeName: string): string {
  return `non-reactive store read via \`${calleeName}()\` — memoization may cache a stale snapshot across store transitions`;
}

function memberName(node: AnyMember): string | null {
  const member = unwrapChain(node);
  if (!member || member.type !== 'MemberExpression') {
    return null;
  }
  const value = member as Node & { computed: boolean; property: Node };
  if (!value.computed && value.property.type === 'Identifier') {
    return (value.property as Node & { name: string }).name;
  }
  if (value.computed && value.property.type === 'Literal') {
    const literal = value.property as Node & { value?: unknown };
    return typeof literal.value === 'string' ? literal.value : null;
  }
  return null;
}

function describeReceiver(input: Node): string {
  const node = unwrapChain(input) ?? input;
  switch (node.type) {
    case 'Identifier':
      return (node as Node & { name: string }).name;
    case 'ThisExpression':
      return 'this';
    case 'CallExpression': {
      const call = node as Node & { callee: Node };
      return call.callee.type === 'Identifier'
        ? `${(call.callee as Node & { name: string }).name}()`
        : `${describeReceiver(call.callee)}()`;
    }
    case 'MemberExpression': {
      const member = node as Node & { object: Node };
      const property = memberName(node);
      const object = describeReceiver(member.object);
      return property === null ? object : `${object}.${property}`;
    }
    default:
      return 'store';
  }
}

export function buildLeafConfig(opts: RiskConfig): LeafRiskConfig {
  return {
    detectGetState: opts.detectGetStateReads === true,
    storeAccessorRe: opts.storeAccessorPattern ? new RegExp(opts.storeAccessorPattern) : null,
    hiddenHookProps: new Set(opts.selectorHookProperties ?? []),
  };
}

export function hasAnyLeafRule(cfg: LeafRiskConfig): boolean {
  return cfg.detectGetState || cfg.storeAccessorRe !== null || cfg.hiddenHookProps.size > 0;
}

export function matchRiskyCall(call: AnyCall, parent: Node | null, cfg: LeafRiskConfig): LeafMatch | null {
  const normalizedCall = unwrapChain(call);
  if (!normalizedCall || normalizedCall.type !== 'CallExpression') {
    return null;
  }
  const callee = (normalizedCall as Node & { callee: Node }).callee;

  if (
    cfg.hiddenHookProps.size > 0 &&
    isAnyMember(callee) &&
    isAnyMember((unwrapChain(callee) as Node & { object: Node }).object)
  ) {
    const fieldName = memberName(callee);
    const objectMember = (unwrapChain(callee) as Node & { object: Node }).object;
    const propName = memberName(objectMember);
    if (fieldName !== null && propName !== null && cfg.hiddenHookProps.has(propName)) {
      const member = unwrapChain(objectMember) as Node & { object: Node };
      const baseName = describeReceiver(member.object);
      return {
        ruleId: 'hidden-selector-hook',
        severity: 'high',
        symbol: `${baseName}.${propName}.${fieldName}`,
        message: `hidden hook \`${baseName}.${propName}.${fieldName}()\` is a selector accessed via property chain — not \`useXxx()\`-named, so the compiler may memoize around it and move the hidden hook into a cache branch, causing a hook-order crash (\`areHookInputsEqual\`)`,
      };
    }
  }

  if (cfg.detectGetState && isAnyMember(callee) && memberName(callee) === 'getState') {
    const member = unwrapChain(callee) as Node & { object: Node };
    return {
      ruleId: 'nonreactive-store-read',
      severity: 'high',
      symbol: `${describeReceiver(member.object)}.getState`,
      message: GET_STATE_MESSAGE,
    };
  }

  if (
    cfg.storeAccessorRe &&
    callee.type === 'Identifier' &&
    !isHookName((callee as Node & { name: string }).name) &&
    cfg.storeAccessorRe.test((callee as Node & { name: string }).name)
  ) {
    const callParent =
      parent?.type === 'ChainExpression' ? (parent as Node & { parent?: Node }).parent ?? null : parent;
    if (isSnapshotRead(normalizedCall, callParent)) {
      const calleeName = (callee as Node & { name: string }).name;
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

export function matchAccessorInit(init: Node, cfg: LeafRiskConfig, bindingName: string): LeafMatch | null {
  const normalized = unwrapChain(init);
  if (!normalized || normalized.type !== 'CallExpression') {
    return null;
  }
  const callee = (normalized as Node & { callee: Node }).callee;
  const via = `(read through local binding \`${bindingName}\`)`;
  if (cfg.detectGetState && isAnyMember(callee) && memberName(callee) === 'getState') {
    const member = unwrapChain(callee) as Node & { object: Node };
    return {
      ruleId: 'nonreactive-store-read',
      severity: 'high',
      symbol: `${describeReceiver(member.object)}.getState`,
      message: `${GET_STATE_MESSAGE} ${via}`,
    };
  }
  if (
    cfg.storeAccessorRe &&
    callee.type === 'Identifier' &&
    !isHookName((callee as Node & { name: string }).name) &&
    cfg.storeAccessorRe.test((callee as Node & { name: string }).name)
  ) {
    const calleeName = (callee as Node & { name: string }).name;
    return {
      ruleId: 'nonreactive-store-read',
      severity: 'medium',
      symbol: calleeName,
      message: `${accessorMessage(calleeName)} ${via}`,
    };
  }
  return null;
}

export function isSnapshotRead(node: Node, parent: Node | null): boolean {
  let current = parent;
  while (current?.type === 'ChainExpression') {
    current = (current as Node & { parent?: Node }).parent ?? null;
  }
  if (isAnyMember(current) && (unwrapChain(current) as Node & { object: Node }).object === node) {
    return memberName(current) !== 'getState';
  }
  return (
    current?.type === 'VariableDeclarator' &&
    (current as Node & { init: Node | null }).init === node &&
    (current as Node & { id: Node }).id.type === 'ObjectPattern'
  );
}
