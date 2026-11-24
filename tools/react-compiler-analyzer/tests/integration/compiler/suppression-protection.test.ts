import { transformSync as babelTransform } from '@babel/core';
import { transformSync as swcTransform } from '@swc/core';
import { transformSync as oxcTransform } from 'oxc-transform-react';

import { planSuppressionProtection } from '../../../src/suppression-protection';
import { inspectOutput } from './harness';
import { protectionComponent, suppressionProtectionFixtures } from './suppression-fixtures';

type Backend = 'babel' | 'oxc' | 'native-swc';
type Mode = 'infer' | 'annotation' | 'all';
const backends: Backend[] = ['babel', 'oxc', 'native-swc'];
const modes: Mode[] = ['infer', 'annotation', 'all'];

function emit(backend: Backend, source: string, compilationMode: Mode): string {
  const filename = 'suppression-protection.tsx';
  const compiler = { compilationMode, target: '19' as const, panicThreshold: 'none' as const, noEmit: false };
  if (backend === 'babel') {
    const result = babelTransform(source, {
      filename,
      babelrc: false,
      configFile: false,
      parserOpts: { plugins: ['typescript', 'jsx'] },
      plugins: [[require.resolve('babel-plugin-react-compiler'), compiler]],
    });
    if (!result?.code) {
      throw new Error('Babel emitted no output');
    }
    return result.code;
  }
  if (backend === 'native-swc') {
    return swcTransform(source, {
      filename,
      swcrc: false,
      configFile: false,
      jsc: {
        target: 'esnext',
        parser: { syntax: 'typescript', tsx: true },
        transform: { react: { runtime: 'preserve' }, reactCompiler: compiler },
      },
    }).code;
  }
  const result = oxcTransform(filename, source, {
    lang: 'tsx',
    sourceType: 'module',
    jsx: 'preserve',
    reactCompiler: { ...compiler, reportDiagnostics: true },
  });
  // Ordinary suppression rejections may remain. They are not fatal parser failures,
  // and lack of observed Oxc change cannot establish SWC guard redundancy.
  expect(result.fatal).toBe(false);
  expect(result.code).not.toBe('');
  return result.code;
}

describe.each(backends)('%s emitted suppression protection (bounded safety, not compiler parity)', backend => {
  describe.each(modes)('%s mode', mode => {
    it('has a positive cache-allocation control, including explicit function opt-in', () => {
      const code = emit(backend, protectionComponent, mode);
      expect(inspectOutput(code).find(fn => fn.name === 'OptedIn')?.cacheSlots.length).toBeGreaterThan(0);
    });

    it('records why a suppression alone is not cross-backend protection', () => {
      const code = emit(backend, suppressionProtectionFixtures[0].source, mode);
      const slots = inspectOutput(code).flatMap(fn => fn.cacheSlots);
      if (backend === 'native-swc') {
        expect(slots.length).toBeGreaterThan(0);
      } else {
        expect(slots).toEqual([]);
      }
    });

    it('leaves unrelated rules alone rather than manufacturing a guard', () => {
      const source = '/* eslint-disable no-console */\n' + protectionComponent;
      const plan = planSuppressionProtection(source, 'fixture.tsx');
      expect(plan.status).toBe('ineligible');
      expect(plan.preview).toBeUndefined();
      expect(
        inspectOutput(emit(backend, source, mode)).find(fn => fn.name === 'OptedIn')?.cacheSlots.length,
      ).toBeGreaterThan(0);
    });

    it.each(suppressionProtectionFixtures)(
      '$id: module guard prevents emitted caches, overriding function opt-in',
      fixture => {
        const plan = planSuppressionProtection(fixture.source, 'fixture.tsx');
        expect(plan.status).toBe('eligible');
        expect(plan.preview).toContain('"use memo"');
        const code = emit(backend, plan.preview!, mode);
        const functions = inspectOutput(code);
        expect(functions.map(fn => fn.name)).toEqual(expect.arrayContaining(['Component', 'OptedIn']));
        expect(functions.flatMap(fn => fn.cacheSlots)).toEqual([]);
        expect(code).not.toContain('react/compiler-runtime');
        expect(code).not.toContain('react-compiler-runtime');

        const second = planSuppressionProtection(plan.preview!, 'fixture.tsx');
        expect(second.status).toBe('already-protected');
        expect(second.edit).toBeUndefined();
        expect(inspectOutput(emit(backend, plan.preview!, mode)).flatMap(fn => fn.cacheSlots)).toEqual([]);
      },
    );

    it('preserves an authored existing guard and prevents cache allocations', () => {
      const source = '"use no memo";\n' + suppressionProtectionFixtures[0].source;
      const plan = planSuppressionProtection(source, 'fixture.tsx');
      expect(plan.status).toBe('already-protected');
      expect(plan.edit).toBeUndefined();
      expect(inspectOutput(emit(backend, source, mode)).flatMap(fn => fn.cacheSlots)).toEqual([]);
    });
  });
});
