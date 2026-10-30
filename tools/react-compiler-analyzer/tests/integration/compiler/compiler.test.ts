import { fixtures } from './fixtures';
import {
  inspectOutput,
  nativeBinary,
  runFixture,
  summarize,
  summarizeOxcAnalyzer,
  summarizeOxcEmission,
  targetCacheEvidence,
  versions,
  writeEvidence,
  oxcBindingTarget,
} from './harness';

describe('compiler integration (bounded behavior, not parity)', () => {
  it('uses all three compiler oracles and records resolved versions and native bindings', () => {
    expect(versions).toMatchObject({
      babel: require('@babel/core/package.json').version,
      babelCompiler: require('babel-plugin-react-compiler/package.json').version,
      oxcCompiler: require('oxc-transform-react/package.json').version,
      oxcParser: require('oxc-parser/package.json').version,
      swc: require('@swc/core/package.json').version,
    });
    expect(nativeBinary.target).toEqual(expect.any(String));
    expect(oxcBindingTarget).toEqual(expect.any(String));
  });

  it('attributes runtime cache bindings to their actual function, never strings or module totals', () => {
    expect(
      inspectOutput(`import { c as memo } from 'react/compiler-runtime';
      function First() { const $ = memo(2); return $[0]; }
      function Second() { const text = "memo(99)"; return text; }
      function Outer() { return function Inner() { const $ = memo(3); return $[0]; }; }
      function Shadow(memo) { return memo(99); }`),
    ).toEqual([
      { name: 'First', cacheSlots: [2], selectorCalls: [] },
      { name: 'Second', cacheSlots: [], selectorCalls: [] },
      { name: 'Outer', cacheSlots: [], selectorCalls: [] },
      { name: 'Inner', cacheSlots: [3], selectorCalls: [] },
      { name: 'Shadow', cacheSlots: [], selectorCalls: [] },
    ]);
    expect(() => inspectOutput(`import { c } from 'react/compiler-runtime'; const cache = c(9);`)).toThrow(
      'unknown function ownership',
    );
  });

  it('lowers TypeScript while preserving JSX and the original source in Oxc output maps', async () => {
    const fixture = fixtures.find(candidate => candidate.id === 'positive');
    if (!fixture) {
      throw new Error('Missing TypeScript/JSX fidelity fixture');
    }
    const evidence = await runFixture(fixture);
    expect(evidence.oxcEmission.code).not.toContain('value: number');
    expect(evidence.oxcEmission.code).toContain('<output>');
    expect(evidence.oxcEmission.map).toMatchObject({ sourcesContent: [fixture.source] });
  });

  it.each(fixtures)('$id', async fixture => {
    const evidence = await runFixture(fixture);
    const artifact = writeEvidence(evidence);
    try {
      expect(evidence.analyzer.error).toBeNull();
      expect(evidence.babel.error).toBeNull();
      expect(evidence.swc.error).toBeNull();
      expect(evidence.oxcEmission.error).toBeNull();
      expect(evidence.babel.inspectionError).toBeNull();
      expect(evidence.swc.inspectionError).toBeNull();
      if (!evidence.oxcEmission.fatal) {
        expect(evidence.oxcEmission.inspectionError).toBeNull();
      }
      expect(evidence.swc.acceptance).toBe('unavailable');
      const caches = {
        babel: targetCacheEvidence(evidence.babel.functions, fixture.target),
        swc: targetCacheEvidence(evidence.swc.functions, fixture.target),
      };
      if (['positive', 'valid-hooks'].includes(fixture.id)) {
        expect(caches).toEqual({ babel: 'positive', swc: 'positive' });
      }
      if (['module-opt-out', 'invalid-hooks', 'suppressed-invalid-hooks'].includes(fixture.id)) {
        expect(caches).toEqual({ babel: 'zero', swc: 'zero' });
      }
      if (fixture.id === 'unnecessary-suppression') {
        expect(caches).toEqual({ babel: 'zero', swc: 'positive' });
      }
      if (fixture.id.startsWith('exported-overload')) {
        for (const runtime of evidence.runtime) {
          if (!('enabled' in runtime)) {
            throw new Error('Expected gate-on/off overload runtime evidence');
          }
          expect(runtime.error).toBeNull();
          expect(runtime.gateCalls.length > 0).toBe(Boolean(fixture.gated));
          expect(runtime.gateCalls.every(value => value === runtime.enabled)).toBe(true);
          if (fixture.gated && runtime.backend === 'babel') {
            // Known compiler defect: the intended gated facade loses its export.
            // Preserve this measured divergence until an intentional compiler upgrade.
            expect(runtime.exportNames).toEqual(['useSample_unoptimized']);
            expect(runtime.callable).toBe(false);
            expect(runtime.results).toEqual([]);
            expect(runtime.implementations).toEqual([
              { name: 'useSample_unoptimized', results: [{ value: 5 }, { value: 11 }] },
            ]);
            expect(runtime.cacheCalls).toEqual([]);
          } else {
            expect(runtime.exportNames).toEqual(['useSample']);
            expect(runtime.callable).toBe(true);
            expect(runtime.results).toEqual([{ value: 5 }, { value: 11 }]);
            expect(runtime.cacheCalls.length > 0).toBe(!fixture.gated || runtime.enabled);
          }
        }
      }
      if (fixture.id.startsWith('outlined-closure')) {
        const expectedError = fixture.id === 'outlined-closure' ? 'ReferenceError: factory is not defined' : null;
        for (const runtime of evidence.runtime) {
          expect(runtime.error).toBe(expectedError);
        }
      }
      if (fixture.id === 'hidden-selector') {
        expect(evidence.analyzer.risks).toContain('hidden-selector-hook');
      }
      if (fixture.id === 'recognized-selector-control') {
        expect(evidence.analyzer.risks).not.toContain('hidden-selector-hook');
      }
      // The checked-in per-backend baseline intentionally includes divergences.
      // A version upgrade requires reviewing evidence, not asserting strict parity.
      expect(summarize(evidence)).toMatchSnapshot(fixture.id);
      // Oxc emitted output is a separate observation from production analyzer acceptance.
      // Adding its baseline must not rewrite the frozen Babel/SWC observations above.
      expect(summarizeOxcEmission(evidence)).toMatchSnapshot(`oxc-${fixture.id}`);
      expect(summarizeOxcAnalyzer(evidence)).toMatchSnapshot(`oxc-analyzer-${fixture.id}`);
    } catch (error) {
      throw new Error(`${String(error)}\nCompiler integration evidence: ${artifact}`);
    }
  });

  it('detects rejection-cause changes even when compiler outcomes and cache evidence are unchanged', async () => {
    const fixture = fixtures.find(candidate => candidate.id === 'unnecessary-suppression');
    if (!fixture) {
      throw new Error('Missing suppression fixture');
    }
    const evidence = await runFixture(fixture);
    const baseline = summarize(evidence);
    const babel = baseline.babel;
    expect(babel.events).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          kind: 'CompileError',
          reason: expect.stringContaining('React ESLint rules were disabled'),
        }),
      ]),
    );
    expect(babel.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          kind: 'CompileError',
          reason: expect.stringContaining('React ESLint rules were disabled'),
        }),
      ]),
    );

    const oxc = summarizeOxcAnalyzer(evidence);
    expect(oxc.events).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          kind: 'CompileError',
          reason: expect.stringContaining('React rule suppression prevents optimization'),
        }),
      ]),
    );
    const changed = summarizeOxcAnalyzer({
      ...evidence,
      analyzer: {
        ...evidence.analyzer,
        diagnostics: evidence.analyzer.diagnostics.map(diagnostic => ({
          ...diagnostic,
          reason: diagnostic.kind === 'CompileError' ? 'Unrelated compiler limitation' : diagnostic.reason,
        })),
      },
    });
    const changedWhole = summarize({
      ...evidence,
      analyzer: {
        ...evidence.analyzer,
        diagnostics: evidence.analyzer.diagnostics.map(diagnostic => ({
          ...diagnostic,
          reason: diagnostic.kind === 'CompileError' ? 'Unrelated compiler limitation' : diagnostic.reason,
        })),
      },
    });
    expect(changed.events).toEqual(oxc.events);
    expect(changedWhole.babel).toEqual(baseline.babel);
    expect(changedWhole.swc).toEqual(baseline.swc);
    expect(changed).not.toEqual(oxc);
  });
});
