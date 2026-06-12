import { join } from 'path';

import { createCallGraphAnalyzer } from '../call-graph';
import { createModuleResolver } from '../module-resolver';
import { compileFile } from '../compiler';
import { deriveCoverage } from '../coverage-analyzer';
import type { FileEntry, RiskConfig } from '../types';

const FIXTURES = join(__dirname, '__fixtures__', 'risk', 'wrappers');
const COMPONENT = join(FIXTURES, 'component.tsx');

function analyzer(config: RiskConfig) {
  return createCallGraphAnalyzer(createModuleResolver(), config);
}

describe('call-graph wrapper analysis', () => {
  it('is disabled when no leaf rule is configured', () => {
    expect(analyzer({}).enabled).toBe(false);
    expect(analyzer({ detectGetStateReads: true }).enabled).toBe(true);
  });

  it('flags a risk reached through a plain first-party wrapper chain', () => {
    const findings = analyzer({ detectGetStateReads: true }).analyzeFile(COMPONENT);
    const indirect = findings.filter(f => f.risk.leaf.ruleId === 'nonreactive-store-read');
    expect(indirect.length).toBeGreaterThan(0);

    // The chain runs through both wrapper hops, ending at the getState leaf.
    const chains = indirect.map(f => f.risk.chain.join(' → '));
    expect(chains).toContain('readActiveIdIndirect → readActiveId');
  });

  it('resolves through a re-export barrel (index.ts)', () => {
    // component.tsx imports from './index', which re-exports from './store'.
    const findings = analyzer({ detectGetStateReads: true }).analyzeFile(COMPONENT);
    expect(findings.some(f => f.risk.chain[0] === 'readActiveIdIndirect')).toBe(true);
  });

  it('does NOT follow a useXxx-named callee (recognized hook, handled at its own definition)', () => {
    const findings = analyzer({ detectGetStateReads: true }).analyzeFile(COMPONENT);
    // WidgetViaHook calls useActiveId() — must not produce an indirect finding.
    expect(findings.some(f => f.risk.chain.includes('useActiveId'))).toBe(false);
  });

  it('finds nothing when the leaf rule that would fire is disabled', () => {
    // Only the hidden-selector-hook rule on, but the wrappers do getState reads.
    const findings = analyzer({ selectorHookProperties: ['use'] }).analyzeFile(COMPONENT);
    expect(findings).toHaveLength(0);
  });
});

describe('wrapper analysis integration — compileFile + deriveCoverage', () => {
  async function coverageFor(filePath: string, riskConfig: RiskConfig) {
    const entry: FileEntry = { filePath, packageName: 'test-pkg' };
    const callGraph = createCallGraphAnalyzer(createModuleResolver(), riskConfig);
    const compiled = await compileFile(entry, 'infer', false, riskConfig, callGraph);
    return deriveCoverage(compiled);
  }

  it('attaches indirect wrapper risks to the compiled component', async () => {
    const results = await coverageFor(COMPONENT, { detectGetStateReads: true, resolveWrappers: true });
    const risky = results.filter(r => r.status === 'compiled' && r.risks?.some(f => f.message.includes('reached via')));
    expect(risky.length).toBeGreaterThan(0);
    const messages = risky.flatMap(r => r.risks!.map(f => f.message));
    expect(messages.some(m => m.includes('readActiveIdIndirect → readActiveId'))).toBe(true);
  });

  it('does not attach wrapper risks for the useXxx-named hook caller', async () => {
    const results = await coverageFor(COMPONENT, { detectGetStateReads: true, resolveWrappers: true });
    // WidgetViaHook should carry no "reached via" finding.
    const viaHook = results.filter(r => r.risks?.some(f => f.message.includes('useActiveId')));
    expect(viaHook).toHaveLength(0);
  });
});
