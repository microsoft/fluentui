import { readFileSync } from 'fs';
import { join } from 'path';

import { transformAsync } from '@babel/core';

import { compileFile } from '../compiler';
import { deriveCoverage } from '../coverage-analyzer';
import { riskPlugin, type RiskPluginOptions } from '../risk-plugin';
import type { FileEntry, RiskConfig, RiskFinding } from '../types';

const FIXTURES_DIR = join(__dirname, '__fixtures__', 'risk');

async function runPluginKeyed(fixtureName: string, config: RiskConfig = {}): Promise<Map<string, RiskFinding[]>> {
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

  return results;
}

async function runPlugin(fixtureName: string, config: RiskConfig = {}): Promise<RiskFinding[]> {
  return [...(await runPluginKeyed(fixtureName, config)).values()].flat();
}

/** Line number of the first source line containing `needle`, for locating fixture expectations. */
function lineOf(fixtureName: string, needle: string): number {
  const lines = readFileSync(join(FIXTURES_DIR, fixtureName), 'utf-8').split('\n');
  const index = lines.findIndex(l => l.includes(needle));
  if (index === -1) {
    throw new Error(`fixture ${fixtureName} has no line containing ${needle}`);
  }
  return index + 1;
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
      // The receiver is a call, and the symbol renders it as one.
      expect(getState[0].symbol).toBe('getItemStore().getState');
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

  describe('hidden-selector-hook', () => {
    it('is OFF by default — no selectorHookProperties means no findings', async () => {
      const findings = await runPlugin('hidden-selector-hook.tsx');
      expect(findings).toHaveLength(0);
    });

    it('flags `store.use.field()` property-chain selectors (high) when configured', async () => {
      const findings = await runPlugin('hidden-selector-hook.tsx', { selectorHookProperties: ['use'] });
      const hidden = findings.filter(f => f.ruleId === 'hidden-selector-hook');
      expect(hidden).toHaveLength(2);
      expect(hidden.every(f => f.severity === 'high')).toBe(true);
      const symbols = new Set(hidden.map(f => f.symbol));
      expect(symbols.has('appStore.use.isPrivate')).toBe(true);
      expect(symbols.has('appStore.use.theme')).toBe(true);
    });

    it('does not flag a different marker property than configured', async () => {
      const findings = await runPlugin('hidden-selector-hook.tsx', { selectorHookProperties: ['select'] });
      expect(findings).toHaveLength(0);
    });

    describe('receiver shapes', () => {
      const config: RiskConfig = { selectorHookProperties: ['use'] };

      it('flags `.use.field()` on an identifier receiver', async () => {
        const findings = await runPlugin('hidden-selector-receivers.tsx', config);
        expect(findings.map(f => f.symbol)).toContain('appStore.use.sessionID');
      });

      it('flags `.use.field()` on a call-expression receiver', async () => {
        const findings = await runPlugin('hidden-selector-receivers.tsx', config);
        expect(findings.map(f => f.symbol)).toContain('useWithSelectorsStore().use.locale');
      });

      it('flags `.use.field()` on a member-expression receiver', async () => {
        const findings = await runPlugin('hidden-selector-receivers.tsx', config);
        expect(findings.map(f => f.symbol)).toContain('nested.inner.use.locale');
      });

      it('flags a computed field access off the marker property', async () => {
        const findings = await runPlugin('hidden-selector-receivers.tsx', config);
        expect(findings.map(f => f.symbol)).toContain('useWithSelectorsStore().use.region');
      });

      it('reports every receiver shape as high severity and nothing else', async () => {
        const findings = await runPlugin('hidden-selector-receivers.tsx', config);
        expect(findings).toHaveLength(6);
        expect(findings.every(f => f.ruleId === 'hidden-selector-hook' && f.severity === 'high')).toBe(true);
      });

      it('does not flag a dynamically computed field (not statically knowable)', async () => {
        const findings = await runPlugin('hidden-selector-receivers.tsx', config);
        expect(findings.some(f => f.symbol.endsWith('.use.key'))).toBe(false);
      });

      it('describes a receiver whose own member access is computed', async () => {
        const findings = await runPlugin('hidden-selector-receivers.tsx', config);
        // `factories[0].make()` — the index has no static name, so it drops out of the path.
        expect(findings.map(f => f.symbol)).toContain('factories.make().use.locale');
      });

      it('describes a `this` receiver', async () => {
        const findings = await runPlugin('hidden-selector-receivers.tsx', config);
        expect(findings.map(f => f.symbol)).toContain('this.store.use.locale');
      });

      it('ignores class methods, which the compiler never memoizes', async () => {
        const findings = await runPlugin('hidden-selector-receivers.tsx', config);
        // Both the object method and the class method read `this.store.use.locale()`; only the
        // former sits in a function the compiler can report on.
        expect(findings.filter(f => f.symbol === 'this.store.use.locale')).toHaveLength(1);
      });
    });
  });

  describe('bound accessor reads', () => {
    const config: RiskConfig = { storeAccessorPattern: 'Store$', detectGetStateReads: true };

    it('flags a member read through a binding initialized from a store accessor', async () => {
      const findings = await runPlugin('bound-accessor.tsx', config);
      const bound = findings.filter(f => f.symbol === 'getChatStore' && f.message.includes('local binding'));
      expect(bound.length).toBeGreaterThan(0);
      expect(bound.every(f => f.severity === 'medium')).toBe(true);
    });

    it('flags a member read through a binding initialized from `.getState()`', async () => {
      const findings = await runPlugin('bound-accessor.tsx', config);
      const bound = findings.filter(f => f.symbol === 'itemStore.getState' && f.message.includes('local binding'));
      expect(bound).toHaveLength(1);
      expect(bound[0].severity).toBe('high');
    });

    it('locates the finding at the read, not at the declarator', async () => {
      const findings = await runPlugin('bound-accessor.tsx', config);
      const read = findings.find(f => f.line === lineOf('bound-accessor.tsx', 'onPick(s.sendingData)'));
      expect(read).toBeDefined();
      expect(read!.symbol).toBe('getChatStore');
    });

    it('keys the finding to the enclosing function of the read, not of the declarator', async () => {
      const keyed = await runPluginKeyed('bound-accessor.tsx', config);
      const callbackLine = lineOf('bound-accessor.tsx', 'onPick(s.sendingData)');
      const componentLine = lineOf('bound-accessor.tsx', 'export function BoundReadInNestedCallback');
      const owner = [...keyed.entries()].find(([, list]) => list.some(f => f.line === callbackLine));
      expect(owner).toBeDefined();
      expect(Number(owner![0].split(':')[0])).toBe(callbackLine);
      expect(Number(owner![0].split(':')[0])).not.toBe(componentLine);
    });

    it('does not follow a shadowed rebinding of the same name', async () => {
      const findings = await runPlugin('bound-accessor.tsx', config);
      const shadowedLine = lineOf('bound-accessor.tsx', 'items.map(s => s.sendingData)');
      expect(findings.some(f => f.line === shadowedLine)).toBe(false);
    });

    it('does not flag a binding that is never member-read', async () => {
      const findings = await runPlugin('bound-accessor.tsx', config);
      const typeofLine = lineOf('bound-accessor.tsx', 'typeof s');
      expect(findings.some(f => f.line === typeofLine)).toBe(false);
    });

    it('does not double-report `.getState()` called through a binding', async () => {
      const findings = await runPlugin('bound-accessor.tsx', config);
      const line = lineOf('bound-accessor.tsx', 's.getState().id');
      // The `.getState()` rule owns this call; the binding rule must not add a second finding.
      expect(findings.filter(f => f.line === line)).toHaveLength(1);
    });

    it('does not flag a binding whose initializer does not match the accessor pattern', async () => {
      const findings = await runPlugin('bound-accessor.tsx', config);
      const line = lineOf('bound-accessor.tsx', 'thing.field');
      expect(findings.some(f => f.line === line)).toBe(false);
    });

    it('is OFF by default — no accessor config means no binding findings', async () => {
      const findings = await runPlugin('bound-accessor.tsx');
      expect(findings).toHaveLength(0);
    });
  });

  describe('safe code', () => {
    it('does not flag anything in a component with no store reads', async () => {
      const findings = await runPlugin('safe.tsx', {
        detectGetStateReads: true,
        storeAccessorPattern: 'Store$',
        selectorHookProperties: ['use'],
      });
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

  it('attaches hidden-selector-hook risks to compiled functions when opted in', async () => {
    const results = await coverageFor('hidden-selector-hook.tsx', { selectorHookProperties: ['use'] });
    const risky = results.filter(
      r => r.status === 'compiled' && r.risks?.some(f => f.ruleId === 'hidden-selector-hook'),
    );
    expect(risky.length).toBeGreaterThan(0);
  });

  it('reports no risks for safe code', async () => {
    const results = await coverageFor('safe.tsx', { detectGetStateReads: true, storeAccessorPattern: 'Store$' });
    const risky = results.filter(r => r.risks && r.risks.length > 0);
    expect(risky).toHaveLength(0);
  });

  describe('optional-chained receivers', () => {
    // `store?.use.field()` parses as OptionalCallExpression/OptionalMemberExpression — distinct
    // node types that survived earlier sweeps unflagged.
    const config: RiskConfig = {
      selectorHookProperties: ['use'],
      detectGetStateReads: true,
      storeAccessorPattern: 'Store$',
    };

    it('flags a hidden selector hook reached through `?.`', async () => {
      const findings = await runPlugin('optional-chained.tsx', config);
      const hidden = findings.filter(f => f.ruleId === 'hidden-selector-hook');
      const symbols = hidden.map(f => f.symbol);

      expect(symbols).toContain('store.use.source');
      expect(symbols).toContain('store.use.hostContext');
      expect(hidden.every(f => f.severity === 'high')).toBe(true);
    });

    it('flags a hidden selector hook when the marker property itself is optional', async () => {
      const findings = await runPlugin('optional-chained.tsx', config);
      // `store?.use?.source()` — both links optional.
      expect(findings.filter(f => f.symbol === 'store.use.source')).toHaveLength(2);
    });

    it('flags an optional-chained `.getState()` read', async () => {
      const findings = await runPlugin('optional-chained.tsx', config);
      expect(findings.map(f => f.symbol)).toContain('itemStore.getState');
    });

    it('flags an accessor read through an optional member access', async () => {
      const findings = await runPlugin('optional-chained.tsx', config);
      const line = lineOf('optional-chained.tsx', 'getChatStore()?.sendingData');
      expect(findings.some(f => f.line === line && f.symbol === 'getChatStore')).toBe(true);
    });

    it('flags an optional read of a bound accessor result', async () => {
      const findings = await runPlugin('optional-chained.tsx', config);
      const line = lineOf('optional-chained.tsx', 's?.draft');
      expect(findings.some(f => f.line === line && f.message.includes('local binding'))).toBe(true);
    });
  });

  describe('risks on non-compiled functions', () => {
    // The fixture holds exactly one compiled, one errored and one opted-out risky function.
    const config: RiskConfig = { storeAccessorPattern: 'Store$' };

    it('keeps risks attached to functions that failed to compile', async () => {
      const results = await coverageFor('risk-on-noncompiled.tsx', config);
      const errored = results.find(r => r.status === 'error');
      expect(errored).toBeDefined();
      expect(errored!.risks?.length).toBeGreaterThan(0);
    });

    it('keeps risks attached to functions the compiler skipped', async () => {
      // `CompileSkip` locates the function at its body, so this also guards the key alias.
      const results = await coverageFor('risk-on-noncompiled.tsx', config);
      const skipped = results.find(r => r.status === 'skipped');
      expect(skipped).toBeDefined();
      expect(skipped!.risks?.length).toBeGreaterThan(0);
    });

    it('still attaches risks to compiled functions', async () => {
      const results = await coverageFor('risk-on-noncompiled.tsx', config);
      const compiled = results.find(r => r.status === 'compiled');
      expect(compiled?.functionName).toBe('CompiledRisky');
      expect(compiled?.risks?.length).toBeGreaterThan(0);
    });

    it('reports each risky function exactly once', async () => {
      const results = await coverageFor('risk-on-noncompiled.tsx', config);
      expect(results.filter(r => r.risks && r.risks.length > 0)).toHaveLength(3);
      expect(results.every(r => (r.risks?.length ?? 0) <= 1)).toBe(true);
    });
  });
});
