import { readFileSync } from 'fs';
import { join } from 'path';

import { transformAsync } from '@babel/core';

import { compileFile } from '../compiler';
import { deriveCoverage } from '../coverage-analyzer';
import { riskPlugin, type RiskPluginOptions } from '../risk-plugin';
import type { FileEntry, RiskConfig, RiskFinding } from '../types';

const FIXTURES_DIR = join(__dirname, '__fixtures__', 'risk');

async function runPlugin(fixtureName: string, config: RiskConfig = {}): Promise<RiskFinding[]> {
  const filePath = join(FIXTURES_DIR, fixtureName);
  const source = readFileSync(filePath, 'utf-8');
  const results = new Map<string, RiskFinding[]>();

  await transformAsync(source, {
    filename: filePath,
    ast: false,
    code: false,
    babelrc: false,
    configFile: false,
    presets: [[require.resolve('@babel/preset-typescript'), { isTSX: true, allExtensions: true }]],
    plugins: [[riskPlugin, { ...config, results } as RiskPluginOptions]],
  });

  return [...results.values()].flat();
}

describe('riskPlugin', () => {
  describe('nonreactive-store-read', () => {
    it('is OFF by default — no store config means no findings', async () => {
      const findings = await runPlugin('nonreactive-store-read.tsx');
      expect(findings.filter(f => f.ruleId === 'nonreactive-store-read')).toHaveLength(0);
    });

    it('flags `.getState()` snapshot reads (high) only when detectGetStateReads is enabled', async () => {
      const findings = await runPlugin('nonreactive-store-read.tsx', { detectGetStateReads: true });
      const getState = findings.filter(f => f.ruleId === 'nonreactive-store-read' && f.symbol.endsWith('.getState'));
      expect(getState).toHaveLength(1);
      expect(getState[0].severity).toBe('high');
      expect(getState[0].symbol).toBe('getItemStore.getState');
    });

    it('flags `getXStore().field` reads (medium) only when storeAccessorPattern is configured', async () => {
      const findings = await runPlugin('nonreactive-store-read.tsx', { storeAccessorPattern: 'Store$' });
      const direct = findings.filter(f => f.ruleId === 'nonreactive-store-read' && f.symbol === 'getAppStore');
      // Both the `.field` member read and the `const { flag } = getAppStore()` destructure.
      expect(direct).toHaveLength(2);
      expect(direct.every(f => f.severity === 'medium')).toBe(true);
    });

    it('flags `const { x } = getXStore()` destructuring off the accessor', async () => {
      const findings = await runPlugin('nonreactive-store-read.tsx', { storeAccessorPattern: 'Store$' });
      // The destructured read is on the fixture line where `const { flag } = getAppStore()` lives.
      const destructured = findings.filter(f => f.ruleId === 'nonreactive-store-read' && f.symbol === 'getAppStore');
      expect(destructured.length).toBeGreaterThanOrEqual(2);
    });

    it('does not flag `.getState()` unless detectGetStateReads is set', async () => {
      const findings = await runPlugin('nonreactive-store-read.tsx', { storeAccessorPattern: 'Store$' });
      expect(findings.filter(f => f.symbol.endsWith('.getState'))).toHaveLength(0);
    });
  });

  describe('safe code', () => {
    it('does not flag anything in a component with no store reads', async () => {
      const findings = await runPlugin('safe.tsx', { detectGetStateReads: true, storeAccessorPattern: 'Store$' });
      expect(findings).toHaveLength(0);
    });
  });
});

describe('risk integration — compileFile + deriveCoverage', () => {
  async function coverageFor(fixtureName: string, riskConfig?: RiskConfig) {
    const filePath = join(FIXTURES_DIR, fixtureName);
    const entry: FileEntry = { filePath, packageName: 'test-pkg' };
    const compiled = await compileFile(entry, 'infer', false, riskConfig);
    return deriveCoverage(compiled);
  }

  it('attaches store-read risks to compiled components when opted in', async () => {
    const results = await coverageFor('nonreactive-store-read.tsx', {
      detectGetStateReads: true,
      storeAccessorPattern: 'Store$',
    });
    const risky = results.filter(r => r.status === 'compiled' && r.risks && r.risks.length > 0);
    expect(risky.length).toBeGreaterThan(0);
    expect(risky[0].risks!.some(f => f.ruleId === 'nonreactive-store-read')).toBe(true);
  });

  it('does not attach store-read risks without opt-in config', async () => {
    const results = await coverageFor('nonreactive-store-read.tsx');
    const risky = results.filter(r => r.risks?.some(f => f.ruleId === 'nonreactive-store-read'));
    expect(risky).toHaveLength(0);
  });

  it('reports no risks for safe code', async () => {
    const results = await coverageFor('safe.tsx', { detectGetStateReads: true, storeAccessorPattern: 'Store$' });
    const risky = results.filter(r => r.risks && r.risks.length > 0);
    expect(risky).toHaveLength(0);
  });
});
