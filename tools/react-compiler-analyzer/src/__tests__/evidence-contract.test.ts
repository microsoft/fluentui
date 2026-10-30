import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import Ajv from 'ajv';

import { compileFile } from '../compiler';
import { normalizeCompilerEvents } from '../compiler-events';
import { deriveCoverage } from '../coverage-analyzer';
import { applyAnnotations } from '../coverage-fixer';
import { createFormatter } from '../formatter';
import { printCoverageReport } from '../coverage-reporter';
import { memoCacheOutcome } from '../memo-cache-outcome';
import { compareCompilerEvidence } from '../revalidation-evidence';
import { toAnalysisDocument, toLintDocument } from '../serializer';
import { revalidateJustifiedDirectives } from '../analyzer';
import type { FunctionAnalysis, NullableMemoStats } from '../types';

const stats = (memoSlots: number | null): NullableMemoStats => ({
  memoSlots,
});

describe('analysis evidence contract', () => {
  let root: string;
  let filePath: string;
  beforeEach(() => {
    root = mkdtempSync(join(__dirname, '../../.rca-evidence-'));
    filePath = join(root, 'Example.tsx');
  });
  afterEach(() => rmSync(root, { recursive: true, force: true }));

  async function compile(source: string) {
    writeFileSync(filePath, source);
    return compileFile({ filePath, packageName: null }, 'infer', false, { detectGetStateReads: true });
  }

  it('keeps real suppression rejection, raw diagnostics, and risks visible without proposing annotations', async () => {
    const source = `import { useEffect } from 'react';
declare const store: { getState(): { label: string } };
export function Example({ value }: { value: string }) {
  const label = store.getState().label;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { consume(value); }, [value]);
  return <span>{label}</span>;
}`;
    const compiled = await compile(source);
    expect(compiled.error).toBeUndefined();
    const results = deriveCoverage(compiled);
    expect(results).toEqual([
      expect.objectContaining({
        status: 'error',
        rejectionKind: 'suppression-related',
        risks: [expect.objectContaining({ ruleId: 'nonreactive-store-read' })],
        diagnostics: expect.arrayContaining([
          expect.objectContaining({
            reason: expect.stringMatching(/suppression|ESLint rules were disabled/i),
          }),
        ]),
      }),
    ]);
    const doc = toAnalysisDocument(results, { mode: 'infer', workspaceRoot: root });
    expect(doc.summary).toMatchObject({
      functions: 1,
      suppressionRejected: 1,
      suppressionRejectedWithRisks: 1,
      findings: 1,
    });
    expect(doc.functions[0].diagnostics).toHaveLength(results[0].diagnostics!.length);
    for (const mode of ['all', 'all-safe', 'bailout-only', 'manual-memo'] as const) {
      const preview = await applyAnnotations(results, mode, { dryRun: true });
      expect(preview.targets).toEqual([]);
      expect(preview.planned?.filesModified).toBe(0);
    }
    expect(readFileSync(filePath, 'utf-8')).toBe(source);
    for (const format of ['cli', 'md', 'html'] as const) {
      const lines: string[] = [];
      const formatter = createFormatter(format, line => lines.push(line));
      printCoverageReport(formatter, results, root, false);
      expect(lines.join('\n')).toContain('Suppression-related compiler rejection');
      expect(lines.join('\n')).toContain('nonreactive-store-read');
    }
  });

  it('classifies mixed suppression evidence without discarding other errors and ignores comment presence alone', async () => {
    const compiled = await compile('export function Example() { /* eslint-disable unknown */ return <div />; }');
    const fn = compiled.sourceFunctions.values()[0];
    const fnLoc = { start: fn.declarationSpan.start, end: fn.declarationSpan.end };
    const result = normalizeCompilerEvents(
      [
        { kind: 'CompileError', fnLoc, detail: { category: 'Suppression', reason: 'suppressed' } },
        { kind: 'CompileError', fnLoc, detail: { category: 'Other', reason: 'another limitation' } },
      ],
      compiled.source,
      compiled.sourceFunctions,
    ).analyses[0];
    expect(result.rejectionKind).toBe('suppression-related');
    expect(result.diagnostics?.map(diagnostic => diagnostic.category)).toEqual(['Suppression', 'Other']);
    const reasonFallback = normalizeCompilerEvents(
      [
        {
          kind: 'CompileError',
          fnLoc,
          detail: {
            reason: 'React rule suppression prevents optimization',
            loc: { start: { line: 1, column: 10 } },
          },
        },
      ],
      compiled.source,
      compiled.sourceFunctions,
    ).analyses[0];
    expect(reasonFallback.rejectionKind).toBe('suppression-related');
    expect(deriveCoverage(compiled)[0].rejectionKind).toBeUndefined();
    const unrelated = normalizeCompilerEvents(
      [{ kind: 'CompileError', fnLoc, detail: { reason: 'unsupported syntax' } }],
      compiled.source,
      compiled.sourceFunctions,
    ).analyses[0];
    expect(unrelated.rejectionKind).toBeUndefined();
    const retried = normalizeCompilerEvents(
      [
        { kind: 'CompileError', fnLoc, detail: { category: 'Suppression', reason: 'suppressed' } },
        { kind: 'CompileSuccess', fnLoc, memoSlots: 0 },
      ],
      compiled.source,
      compiled.sourceFunctions,
    ).analyses[0];
    expect(retried.status).toBe('compiled');
    expect(retried.rejectionKind).toBeUndefined();
  });

  it.each([0, 4, null])('retains preventive bailout eligibility with reported slots=%s', async slots => {
    const source = 'export function Example() { return <div />; }';
    const results = deriveCoverage(await compile(source));
    results[0].memoStats = stats(slots);
    results[0].risks = [
      {
        ruleId: 'nonreactive-store-read',
        severity: 'high',
        line: 1,
        column: 0,
        symbol: 'store.getState',
        message: 'configured snapshot risk',
      },
    ];
    const preview = await applyAnnotations(results, 'bailout-only', { dryRun: true });
    expect(preview.planned?.functionsBailedOut).toBe(1);
    expect(preview.targets?.[0]).toMatchObject({
      rationale: 'preventive-risk-opt-out',
      reportedMemoCache: slots === null ? 'unavailable' : slots > 0 ? 'positive' : 'zero',
      emittedCaching: 'unverified',
      riskRules: ['nonreactive-store-read'],
    });
    expect(readFileSync(filePath, 'utf-8')).toBe(source);
    const written = await applyAnnotations(results, 'bailout-only');
    expect(written.targets).toEqual(preview.targets);
    expect(readFileSync(filePath, 'utf-8')).toContain('preventive opt-out');
    expect(readFileSync(filePath, 'utf-8')).not.toContain('unsafe to memoize');
  });

  it('partitions accepted statistics and records the actual analysis profile in strict v4 JSON', async () => {
    const [base] = deriveCoverage(await compile('export function Example() { return <div />; }'));
    const results = [0, 3, null].map(memoSlots => ({ ...base, memoStats: stats(memoSlots) }));
    expect(results.map(memoCacheOutcome)).toEqual(['zero', 'positive', 'unavailable']);
    const doc = toAnalysisDocument(results, { mode: 'all', workspaceRoot: root });
    expect(doc).toMatchObject({
      schemaVersion: 4,
      emittedCaching: 'unverified',
      profile: {
        backend: 'oxc',
        mode: 'all',
        noEmit: false,
        jsx: 'preserve',
        outputMode: 'client',
        sourcemap: true,
        reportDiagnostics: true,
        panicThreshold: 'none',
        target: '19',
        suppressionRules: 'compiler-default',
        parserVersion: '0.156.0',
        compilerVersion: '0.156.0',
        gating: { source: '__rca_gate__', importSpecifierName: '__rcaGate' },
      },
      summary: { compiled: 3, reportedMemoCachePositive: 1, reportedMemoCacheZero: 1, reportedMemoCacheUnavailable: 1 },
    });
    expect(doc.summary).not.toHaveProperty('memoCacheEmitted');
    const schema = JSON.parse(readFileSync(join(__dirname, '../../rca.analyze.schema.json'), 'utf-8'));
    const validate = new Ajv({ allErrors: true }).compile(schema);
    expect(validate(doc)).toBe(true);
    expect(validate({ ...doc, emittedCaching: 'emitted' })).toBe(false);
    expect(validate({ ...doc, schemaVersion: 3 })).toBe(false);
    expect(validate({ ...doc, profile: { ...doc.profile, backend: 'babel', babelVersion: '7.28.5' } })).toBe(false);
    for (const removed of ['memoBlocks', 'memoValues', 'prunedMemoBlocks', 'prunedMemoValues']) {
      expect(
        validate({ ...doc, functions: [{ ...doc.functions[0], memoStats: { memoSlots: 0, [removed]: 0 } }] }),
      ).toBe(false);
    }
  });

  it('validates report-only revalidation evidence against the shipped lint schema', async () => {
    const source = "export function Example() { 'use no memo'; // justified: precaution\n return <div />; }";
    const compiled = await compile(source);
    const results = await revalidateJustifiedDirectives(compiled, 'infer');
    const doc = toLintDocument(results, { mode: 'infer', workspaceRoot: root });
    const analyzeSchema = JSON.parse(readFileSync(join(__dirname, '../../rca.analyze.schema.json'), 'utf-8'));
    const lintSchema = JSON.parse(readFileSync(join(__dirname, '../../rca.lint.schema.json'), 'utf-8'));
    const validate = new Ajv({ allErrors: true }).addSchema(analyzeSchema).compile(lintSchema);
    expect(validate(doc)).toBe(true);
    expect(doc.directives[0].evidence).toMatchObject({
      before: { outcome: 'skipped' },
      after: { outcome: 'compiled' },
      acceptanceEffect: 'changed',
      emittedOptimization: 'not-measured',
    });
    expect(readFileSync(filePath, 'utf-8')).toBe(source);
    expect(validate({ ...doc, emittedCaching: 'verified' })).toBe(false);
    expect(validate({ ...doc, schemaVersion: 3 })).toBe(false);
    for (const removed of ['memoBlocks', 'memoValues', 'prunedMemoBlocks', 'prunedMemoValues']) {
      const evidence = doc.directives[0].evidence!;
      expect(
        validate({
          ...doc,
          directives: [
            {
              ...doc.directives[0],
              evidence: {
                ...evidence,
                after: { ...evidence.after, memoStats: { memoSlots: 0, [removed]: 0 } },
              },
            },
          ],
        }),
      ).toBe(false);
    }
  });
});

describe('revalidation comparison', () => {
  const base: FunctionAnalysis = {
    filePath: '/Example.tsx',
    packageName: null,
    line: 1,
    column: 0,
    functionName: 'Example',
    status: 'compiled',
    compilerEvent: 'CompileSuccess',
    memoStats: stats(0),
  };
  it('separates acceptance and reported-statistics changes without claiming output equivalence', () => {
    expect(compareCompilerEvidence(base, { ...base, memoStats: stats(2) })).toMatchObject({
      acceptanceEffect: 'unchanged',
      statisticsEffect: 'changed',
      emittedOptimization: 'not-measured',
    });
    expect(compareCompilerEvidence(base, base)).toMatchObject({
      acceptanceEffect: 'unchanged',
      statisticsEffect: 'unchanged',
    });
    expect(compareCompilerEvidence({ ...base, status: 'skipped', memoStats: null }, base)).toMatchObject({
      acceptanceEffect: 'changed',
      statisticsEffect: 'unavailable',
    });
  });
  it('does not turn absent events or counters into evidence of no effect', () => {
    expect(compareCompilerEvidence(base)).toMatchObject({
      after: { outcome: 'unavailable', memoStats: null },
      acceptanceEffect: 'unavailable',
      statisticsEffect: 'unavailable',
    });
    expect(
      compareCompilerEvidence({ ...base, memoStats: stats(null) }, { ...base, memoStats: stats(null) })
        .statisticsEffect,
    ).toBe('unavailable');
    expect(compareCompilerEvidence(base, { ...base, memoStats: stats(null) }).statisticsEffect).toBe('unavailable');
  });
});
