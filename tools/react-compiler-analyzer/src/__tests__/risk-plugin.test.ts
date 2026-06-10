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
      expect(direct).toHaveLength(1);
      expect(direct[0].severity).toBe('medium');
    });

    it('does not flag `getXStore().field` when generic-only (no store config)', async () => {
      const findings = await runPlugin('nonreactive-store-read.tsx', { generic: true });
      expect(findings.filter(f => f.symbol === 'getAppStore')).toHaveLength(0);
    });
  });

  describe('unstable-hook-arg', () => {
    it('flags inline object/array literals to unknown hooks as low severity (generic)', async () => {
      const findings = await runPlugin('unstable-hook-arg.tsx');
      const unstable = findings.filter(f => f.ruleId === 'unstable-hook-arg');
      expect(unstable.length).toBeGreaterThan(0);
      // Without config, severity is low.
      expect(unstable.every(f => f.severity === 'low')).toBe(true);
    });

    it('raises configured selector hooks to high severity', async () => {
      const findings = await runPlugin('unstable-hook-arg.tsx', {
        selectorHooks: ['useFilteredItems', 'useItemField'],
      });
      const unstable = findings.filter(f => f.ruleId === 'unstable-hook-arg');
      expect(unstable.length).toBeGreaterThanOrEqual(2);
      expect(unstable.every(f => f.severity === 'high')).toBe(true);
      const symbols = new Set(unstable.map(f => f.symbol));
      expect(symbols.has('useFilteredItems')).toBe(true);
      expect(symbols.has('useItemField')).toBe(true);
    });

    it('raises hooks from a configured import source to high severity', async () => {
      const findings = await runPlugin('unstable-hook-arg.tsx', {
        selectorHookSources: ['@acme/store-hooks'],
      });
      const unstable = findings.filter(f => f.ruleId === 'unstable-hook-arg');
      expect(unstable.length).toBeGreaterThanOrEqual(2);
      expect(unstable.every(f => f.severity === 'high')).toBe(true);
    });
  });

  describe('safe code', () => {
    it('does not flag React builtin hooks or stable arguments', async () => {
      const findings = await runPlugin('safe.tsx');
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

  it('attaches risk findings to compiled functions', async () => {
    const results = await coverageFor('unstable-hook-arg.tsx', {
      selectorHookSources: ['@acme/store-hooks'],
    });
    const risky = results.filter(r => r.status === 'compiled' && r.risks && r.risks.length > 0);
    expect(risky.length).toBeGreaterThan(0);
    expect(risky[0].risks!.some(f => f.ruleId === 'unstable-hook-arg')).toBe(true);
  });

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
    const results = await coverageFor('safe.tsx');
    const risky = results.filter(r => r.risks && r.risks.length > 0);
    expect(risky).toHaveLength(0);
  });
});
