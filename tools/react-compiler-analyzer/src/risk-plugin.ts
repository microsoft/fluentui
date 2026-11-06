import type { Node } from 'oxc-parser';

import { walkAst } from './ast/traverse';
import type { ParsedSource } from './ast/parse';
import { ScopeResolver } from './ast/scope';
import {
  buildLeafConfig,
  hasAnyLeafRule,
  isSnapshotRead,
  matchAccessorInit,
  matchRiskyCall,
  type LeafMatch,
  type LeafRiskConfig,
} from './risk-patterns';
import { SourceFunctionIndex } from './source-functions';
import type { RiskConfig, RiskFinding } from './types';

export interface RiskAnalysis {
  results: Map<string, RiskFinding[]>;
}

export interface RiskAnalysisOptions extends RiskConfig {
  sourceFunctions: SourceFunctionIndex;
  scopes?: ScopeResolver;
  results?: Map<string, RiskFinding[]>;
}

function functionNode(node: Node): boolean {
  return (
    node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression'
  );
}

function calleeName(node: Node): string | null {
  if (node.type === 'Identifier') {
    return (node as Node & { name: string }).name;
  }
  if (node.type === 'MemberExpression') {
    const member = node as Node & { object: Node; property: Node; computed: boolean };
    if (!member.computed && member.property.type === 'Identifier') {
      return (member.property as Node & { name: string }).name;
    }
  }
  return null;
}

function insideSyncExternalStore(node: Node, parsed: ParsedSource): boolean {
  let current: Node | null = node;
  while (current) {
    if (current.type === 'CallExpression') {
      const callee = (current as Node & { callee: Node }).callee;
      if (calleeName(callee) === 'useSyncExternalStore') {
        return true;
      }
    }
    current = parsed.parents.get(current);
  }
  return false;
}

function enclosingFunction(node: Node, parsed: ParsedSource): Node | null {
  let current = parsed.parents.get(node);
  while (current) {
    if (functionNode(current)) {
      const owner = parsed.parents.get(current);
      if (owner?.type === 'MethodDefinition' && (owner as Node & { value: Node }).value === current) {
        return null;
      }
      return current;
    }
    current = parsed.parents.get(current);
  }
  return null;
}

function collectRisks(
  parsed: ParsedSource,
  sourceFunctions: SourceFunctionIndex,
  scopes: ScopeResolver,
  config: RiskConfig,
  results: Map<string, RiskFinding[]>,
): Map<string, RiskFinding[]> {
  const leafConfig = buildLeafConfig(config);
  if (!hasAnyLeafRule(leafConfig)) {
    return results;
  }

  const record = (node: Node, match: LeafMatch): void => {
    if (insideSyncExternalStore(node, parsed)) {
      return;
    }
    const owner = enclosingFunction(node, parsed);
    if (!owner) {
      return;
    }
    const sourceFunction = sourceFunctions.findByNode(owner);
    if (!sourceFunction) {
      return;
    }
    const position = parsed.locations.positionAt(node.start);
    const finding: RiskFinding = {
      ...match,
      line: position.line,
      column: position.column,
    };
    const list = results.get(sourceFunction.id) ?? [];
    if (
      !list.some(
        existing =>
          existing.ruleId === finding.ruleId &&
          existing.line === finding.line &&
          existing.column === finding.column &&
          existing.symbol === finding.symbol &&
          existing.message === finding.message,
      )
    ) {
      list.push(finding);
      results.set(sourceFunction.id, list);
      sourceFunctions.recordFinding(sourceFunction.id, finding);
    }
  };

  walkAst(
    parsed.program,
    {
      enter(node, parent) {
        if (node.type === 'CallExpression') {
          const match = matchRiskyCall(node, parent, leafConfig);
          if (match) {
            record(node, match);
          }
          return;
        }
        if (node.type !== 'VariableDeclarator') {
          return;
        }
        const declaration = node as Node & { id: Node; init: Node | null };
        if (!declaration.init || declaration.id.type !== 'Identifier') {
          return;
        }
        const name = (declaration.id as Node & { name: string }).name;
        const match = matchAccessorInit(declaration.init, leafConfig, name);
        if (!match) {
          return;
        }
        const binding = scopes.bindingOf(declaration.id) ?? scopes.resolve(name, declaration.id);
        for (const reference of binding ? scopes.readsOf(binding) : []) {
          if (isSnapshotRead(reference, parsed.parents.get(reference))) {
            record(reference, match);
          }
        }
      },
    },
    parsed.parents,
  );

  for (const findings of results.values()) {
    findings.sort((a, b) => a.line - b.line || a.column - b.column || a.ruleId.localeCompare(b.ruleId));
  }
  return results;
}

export function analyzeRisks(parsed: ParsedSource, options: RiskAnalysisOptions): Map<string, RiskFinding[]> {
  return collectRisks(
    parsed,
    options.sourceFunctions,
    options.scopes ?? new ScopeResolver(parsed.program),
    options,
    options.results ?? new Map<string, RiskFinding[]>(),
  );
}

export type RiskPluginOptions = RiskAnalysisOptions;
