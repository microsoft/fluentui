import type { Node } from 'oxc-parser';

import { analyzeManualMemo, type ExistingDirectives, type ManualMemoEntry } from '../manual-memo-plugin';
import { analyzeRisks } from '../risk-plugin';
import { SourceFunctionIndex } from '../source-functions';
import type { FileEntry, RiskConfig, RiskFinding, SourceFunction } from '../types';
import { parseSource } from './parse';
import type { ParsedSource } from './parse';
import { ScopeResolver } from './scope';

export interface SourceAnalysis {
  parsed: ParsedSource;
  scopes: ScopeResolver;
  sourceFunctions: SourceFunctionIndex;
  manualMemo: Map<string, ManualMemoEntry>;
  risks: Map<string, RiskFinding[]>;
  bodyInsertionLines: Map<string, number>;
  existingDirectives: Map<string, ExistingDirectives>;
  fnKeyAliases: Map<string, string>;
}

export function analyzeSource(
  source: string,
  entry: FileEntry,
  workspaceRoot: string,
  riskConfig: RiskConfig = {},
): SourceAnalysis {
  const parsed = parseSource(source, entry.filePath);
  const scopes = new ScopeResolver(parsed.program);
  const sourceFunctions = new SourceFunctionIndex(source, entry, workspaceRoot);
  sourceFunctions.addProgram(parsed, scopes);
  const manual = analyzeManualMemo(parsed, { sourceFunctions, scopes });
  const risks = analyzeRisks(parsed, { ...riskConfig, sourceFunctions, scopes });
  return {
    parsed,
    scopes,
    sourceFunctions,
    manualMemo: manual.results,
    risks,
    bodyInsertionLines: manual.bodyInsertionLines,
    existingDirectives: manual.existingDirectives,
    fnKeyAliases: manual.keyAliases,
  };
}

export function enclosingSourceFunction(node: Node, analysis: SourceAnalysis): SourceFunction | null {
  let current: Node | null = node;
  while (current) {
    const sourceFunction = analysis.sourceFunctions.findByNode(current);
    if (sourceFunction) {
      return sourceFunction;
    }
    current = analysis.parsed.parents.get(current);
  }
  return null;
}
