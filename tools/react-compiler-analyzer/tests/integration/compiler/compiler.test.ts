import { fixtures } from './fixtures';
import {
  inspectOutput,
  nativeBinary,
  runFixture,
  summarize,
  targetCacheEvidence,
  versions,
  writeEvidence,
} from './harness';

describe('compiler integration (bounded behavior, not parity)', () => {
  it('uses the workspace compiler dependencies and records resolved versions', () => {
    expect(versions).toMatchObject({
      babel: require('@babel/core/package.json').version,
      compiler: require('babel-plugin-react-compiler/package.json').version,
      swc: require('@swc/core/package.json').version,
    });
    expect(nativeBinary.target).toEqual(expect.any(String));
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

  it.each(fixtures)('$id', async fixture => {
    const evidence = await runFixture(fixture);
    const artifact = writeEvidence(evidence);
    try {
      expect(evidence.analyzer.error).toBeNull();
      expect(evidence.babel.error).toBeNull();
      expect(evidence.swc.error).toBeNull();
      expect(evidence.babel.inspectionError).toBeNull();
      expect(evidence.swc.inspectionError).toBeNull();
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
      if (fixture.id === 'hidden-selector') {
        expect(evidence.analyzer.risks).toContain('hidden-selector-hook');
      }
      if (fixture.id === 'recognized-selector-control') {
        expect(evidence.analyzer.risks).not.toContain('hidden-selector-hook');
      }
      // The checked-in per-backend baseline intentionally includes divergences.
      // A version upgrade requires reviewing evidence, not asserting strict parity.
      expect(summarize(evidence)).toMatchSnapshot(fixture.id);
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
    for (const backend of ['analyzer', 'babel'] as const) {
      expect(baseline[backend].events).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            kind: 'CompileError',
            reason: expect.stringContaining('React ESLint rules were disabled'),
          }),
        ]),
      );
      expect(baseline[backend].diagnostics).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            kind: 'CompileError',
            reason: expect.stringContaining('React ESLint rules were disabled'),
          }),
        ]),
      );
      const changed = summarize({
        ...evidence,
        [backend]: {
          ...evidence[backend],
          diagnostics: evidence[backend].diagnostics.map(diagnostic => ({
            ...diagnostic,
            reason: diagnostic.kind === 'CompileError' ? 'Unrelated compiler limitation' : diagnostic.reason,
          })),
        },
      });
      expect(changed[backend].events).toEqual(baseline[backend].events);
      expect(changed.babel.targetCacheEvidence).toBe(baseline.babel.targetCacheEvidence);
      expect(changed.swc.targetCacheEvidence).toBe(baseline.swc.targetCacheEvidence);
      expect(changed[backend]).not.toEqual(baseline[backend]);
    }
  });
});
