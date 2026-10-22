import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import Ajv from 'ajv';

import { revalidateJustifiedDirectives } from '../analyzer';
import * as compiler from '../compiler';
import { compileFile } from '../compiler';
import { runAnalyze } from '../commands/analyze';
import { runLint } from '../commands/lint';
import { DEFAULT_EXCLUDE } from '../commands/shared';
import { deriveCoverage } from '../coverage-analyzer';
import { applyAnnotations } from '../coverage-fixer';
import { applyFixes } from '../fixer';
import { toWorkspacePath } from '../path-utils';
import type { AnalysisDocument, AnnotateMode, CompilationMode, LintDocument, QuoteStyle } from '../types';
import { captureJson } from './helpers/output';

jest.mock('../compiler', () => {
  const actual = jest.requireActual<typeof import('../compiler')>('../compiler');
  return {
    ...actual,
    compileSource: jest.fn(actual.compileSource),
    compileFilesStreaming: jest.fn(actual.compileFilesStreaming),
  };
});

describe('syntax compatibility and opt-in workflows', () => {
  let root: string;
  let filePath: string;

  beforeEach(() => {
    root = mkdtempSync(join(tmpdir(), 'rca-compatibility-'));
    filePath = join(root, 'value.ts');
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.dontMock('babel-plugin-react-compiler/package.json');
    rmSync(root, { recursive: true, force: true });
  });

  function argv() {
    return {
      paths: [filePath],
      verbose: false,
      concurrency: 1,
      exclude: DEFAULT_EXCLUDE,
      mode: 'infer' as const,
      format: 'json' as const,
      'strict-paths': false,
      'parser-plugin': [],
      annotate: undefined,
      quote: 'single' as const,
      fix: false,
    };
  }

  async function json<T>(run: () => Promise<number>): Promise<{ code: number; document: T }> {
    const { code, doc } = await captureJson<T>(run);
    return { code, document: doc };
  }

  function source(directive = '', expression = '{ value }') {
    return `import { useState } from 'react';
export function useValue(initial: number): { value: number };
export function useValue(): { value: number };
export function useValue(initial = 0) {
  ${directive}
  const [value] = useState(initial);
  return ${expression};
}`;
  }

  async function compiled(mode: CompilationMode = 'infer') {
    return compileFile({ filePath, packageName: null }, mode, false);
  }

  it('indexes only the overload implementation and inserts only into its body', async () => {
    const original = source();
    writeFileSync(filePath, original);
    const result = await compiled();
    expect(result.error).toBeUndefined();
    expect(result.sourceFunctions.values()).toHaveLength(1);
    const coverage = deriveCoverage(result);
    expect(coverage).toHaveLength(1);
    expect(coverage[0]).toMatchObject({ functionName: 'useValue', status: 'compiled' });
    expect(await applyAnnotations(coverage, 'all')).toMatchObject({ functionsAnnotated: 1 });
    expect(readFileSync(filePath, 'utf-8')).toContain("initial = 0) {\n  'use memo';");
    expect(readFileSync(filePath, 'utf-8').split('initial = 0)')[0]).toBe(original.split('initial = 0)')[0]);
    expect(await applyAnnotations(deriveCoverage(await compiled()), 'all')).toMatchObject({ filesModified: 0 });
  });

  it.each<AnnotateMode>(['all', 'manual-memo', 'all-safe', 'bailout-only'])(
    'uses identical planned and written edits in %s mode',
    async mode => {
      const original = `// Unicode: \u{1f600}\r\n${source().replace(/\n/g, '\r\n')}`;
      writeFileSync(filePath, original);
      const results = deriveCoverage(await compiled());
      results[0].manualMemo = { useMemo: 1, useCallback: 0, reactMemo: false, reactMemoHasComparator: false };
      results[0].risks = [
        {
          ruleId: 'nonreactive-store-read',
          severity: 'high',
          line: 7,
          column: 2,
          symbol: 'store.getState',
          message: 'test risk',
        },
      ];
      for (const quote of ['single', 'double'] as QuoteStyle[]) {
        const preview = await applyAnnotations(results, mode, { quote, dryRun: true });
        expect(readFileSync(filePath, 'utf-8')).toBe(original);
        expect(preview).toMatchObject({ filesModified: 0, functionsAnnotated: 0, functionsBailedOut: 0, dryRun: true });
        const written = await applyAnnotations(results, mode, { quote });
        expect(written).toEqual(preview.planned);
        expect(preview.targets).toHaveLength(1);
        expect(readFileSync(filePath, 'utf-8')).toContain(quote === 'single' ? "'use " : '"use ');
        writeFileSync(filePath, original);
      }
    },
  );

  it('rejects stale source in dry-run as well as write mode', async () => {
    writeFileSync(filePath, source());
    const results = deriveCoverage(await compiled());
    writeFileSync(filePath, `${source()}\n// changed`);
    await expect(applyAnnotations(results, 'all', { dryRun: true })).rejects.toThrow('stale source');
  });

  it('rejects a dry-run without annotations', async () => {
    await expect(runAnalyze({ ...argv(), 'dry-run': true })).rejects.toThrow('--dry-run requires --annotate');
  });

  it('reports planned counts only in explicit dry-run JSON and validates its schema', async () => {
    const original = source();
    writeFileSync(filePath, original);
    const preview = await json<AnalysisDocument>(() => runAnalyze({ ...argv(), annotate: 'all', 'dry-run': true }));
    expect(preview.code).toBe(0);
    expect(preview.document.annotate).toEqual({
      mode: 'all',
      filesModified: 0,
      functionsAnnotated: 0,
      functionsBailedOut: 0,
      dryRun: true,
      planned: { filesModified: 1, functionsAnnotated: 1, functionsBailedOut: 0 },
    });
    expect(readFileSync(filePath, 'utf-8')).toBe(original);
    const schema = JSON.parse(readFileSync(join(__dirname, '../../rca.analyze.schema.json'), 'utf-8'));
    const validate = new Ajv().compile(schema);
    expect(validate(preview.document)).toBe(true);
    const actual = await json<AnalysisDocument>(() => runAnalyze({ ...argv(), annotate: 'all' }));
    expect(actual.document.annotate).toEqual({ mode: 'all', ...preview.document.annotate?.planned });
    expect(actual.document).not.toHaveProperty('compiler');
  });

  it.each<CompilationMode>(['infer', 'annotation', 'all'])(
    'revalidates both justified directive kinds in %s mode without fixing them',
    async mode => {
      for (const directive of ['use memo', 'use no memo']) {
        const original = source(`'${directive}'; // justified: preserve my rationale`);
        writeFileSync(filePath, original);
        const results = await revalidateJustifiedDirectives(await compiled(mode), mode);
        expect(results).toHaveLength(1);
        const active = directive === 'use memo' ? mode === 'annotation' : mode !== 'annotation';
        expect(results[0]).toMatchObject({
          status: active ? 'active' : 'redundant',
          justified: true,
          revalidated: true,
        });
        expect(await applyFixes(results)).toEqual({ filesModified: 0, directivesRemoved: 0, directivesJustified: 0 });
        expect(readFileSync(filePath, 'utf-8')).toBe(original);
      }
    },
  );

  it('preserves the other directive when probing duplicate justified opt-outs', async () => {
    writeFileSync(filePath, source("'use no memo'; // justified: first\n  'use no memo'; // justified: second"));
    const result = await revalidateJustifiedDirectives(await compiled(), 'infer');
    expect(result).toHaveLength(2);
    expect(result.every(item => item.status === 'redundant')).toBe(true);
  });

  it('reports justified conflicts and leaves both directives and comments unchanged', async () => {
    const original = source("'use memo'; // justified: opt in\n  'use no memo'; // justified: opt out");
    writeFileSync(filePath, original);
    const { document, code } = await json<LintDocument>(() =>
      runLint({ ...argv(), fix: true, 'revalidate-justified': true }),
    );
    expect(code).toBe(1);
    expect(document.directives).toHaveLength(2);
    expect(document.directives.every(item => item.status === 'conflicting' && item.justified && item.revalidated)).toBe(
      true,
    );
    expect(readFileSync(filePath, 'utf-8')).toBe(original);
  });

  it('fails lint for an explicitly revalidated redundant opt-in even with --fix', async () => {
    const original = source("'use memo'; // justified: my reason");
    writeFileSync(filePath, original);
    const ordinary = await json<LintDocument>(() => runLint(argv()));
    expect(ordinary.code).toBe(0);
    expect(ordinary.document.directives[0]).toMatchObject({ status: 'skipped' });
    expect(ordinary.document.directives[0]).not.toHaveProperty('revalidated');
    for (let run = 0; run < 2; run++) {
      const result = await json<LintDocument>(() => runLint({ ...argv(), fix: true, 'revalidate-justified': true }));
      expect(result.code).toBe(1);
      expect(result.document.directives[0]).toMatchObject({ status: 'redundant', justified: true, revalidated: true });
      expect(readFileSync(filePath, 'utf-8')).toBe(original);
    }
  });

  it('reports failed probes as broken, never removable', async () => {
    const original = source("'use no memo'; // justified: retain");
    writeFileSync(filePath, original);
    const result = await compiled();
    jest.spyOn(compiler, 'compileSource').mockResolvedValueOnce({ events: [], error: new Error('probe failed') });
    const findings = await revalidateJustifiedDirectives(result, 'infer');
    expect(findings[0]).toMatchObject({
      status: 'broken',
      justified: true,
      reason: expect.stringContaining('probe failed'),
    });
    await applyFixes(findings);
    expect(readFileSync(filePath, 'utf-8')).toBe(original);
  });

  it('preserves Unicode, CRLF, and block-comment justifications during revalidation', async () => {
    const original = `// \u{1f600}\r\n${source("'use no memo'; /* justified: keep this comment */").replace(
      /\n/g,
      '\r\n',
    )}`;
    writeFileSync(filePath, original);
    const findings = await revalidateJustifiedDirectives(await compiled(), 'infer');
    expect(findings).toEqual([expect.objectContaining({ status: 'active', justified: true, revalidated: true })]);
    await applyFixes(findings);
    expect(readFileSync(filePath, 'utf-8')).toBe(original);
  });

  it('preserves justified file-level directives and reports the revalidation limitation', async () => {
    const original = "'use no memo'; // justified: entire module\n" + source();
    writeFileSync(filePath, original);
    const findings = await revalidateJustifiedDirectives(await compiled(), 'infer');
    expect(findings).toEqual([
      expect.objectContaining({ status: 'skipped', reason: expect.stringContaining('unavailable') }),
    ]);
    await applyFixes(findings);
    expect(readFileSync(filePath, 'utf-8')).toBe(original);
  });

  it('fixes ordinary redundant directives without removing a justified one in the same file', async () => {
    const original = source("'use no memo'; // justified: retain") + "\nfunction helper() { 'use no memo'; return 1; }";
    writeFileSync(filePath, original);
    const result = await json<LintDocument>(() => runLint({ ...argv(), fix: true, 'revalidate-justified': true }));
    expect(result.code).toBe(0);
    expect(readFileSync(filePath, 'utf-8')).toContain("'use no memo'; // justified: retain");
    expect(readFileSync(filePath, 'utf-8')).not.toContain("helper() { 'use no memo';");
    expect(result.document.directives).toEqual([
      expect.objectContaining({ status: 'active', justified: true, revalidated: true }),
    ]);
  });

  it('does not recommend automatic fixes for revalidated justified opt-outs in human reports', async () => {
    writeFileSync(filePath, source("'use no memo'; // justified: retain", 'value'));
    const lines: string[] = [];
    jest.spyOn(console, 'log').mockImplementation((...args: unknown[]) => lines.push(args.join(' ')));
    await runLint({ ...argv(), format: 'cli', 'revalidate-justified': true });
    expect(lines.join('\n')).toContain('report-only');
    expect(lines.join('\n')).not.toContain('Run with `--fix`');
    expect(lines.join('\n')).not.toContain('need a `// justified:');
  });

  it('reports a protected mixed conflict as requiring manual review, not a successful fix', async () => {
    const original = source("'use memo';\n  'use no memo'; // justified: retain");
    writeFileSync(filePath, original);
    const lines: string[] = [];
    jest.spyOn(console, 'log').mockImplementation((...args: unknown[]) => lines.push(args.join(' ')));
    const code = await runLint({ ...argv(), format: 'cli', fix: true, 'revalidate-justified': true });
    expect(code).toBe(1);
    expect(lines.join('\n')).toContain('No automatic fixes applied.');
    expect(lines.join('\n')).toContain('Remaining lint failures require manual review');
    expect(lines.join('\n')).not.toContain('Fixed:');
    expect(readFileSync(filePath, 'utf-8')).toBe(original);
  });

  it('uses workspace-relative paths for human dry-run targets', async () => {
    const original = source();
    writeFileSync(filePath, original);
    const lines: string[] = [];
    jest.spyOn(console, 'log').mockImplementation((...args: unknown[]) => lines.push(args.join(' ')));
    await runAnalyze({ ...argv(), format: 'cli', annotate: 'all', 'dry-run': true });
    const target = lines.find(line => line.includes(": insert 'use memo'"));
    expect(target).toBe(`${toWorkspacePath(process.cwd(), filePath)}:4 useValue: insert 'use memo'`);
    expect(readFileSync(filePath, 'utf-8')).toBe(original);
  });

  it('rejects first-pass unattributed errors before probing either directive kind', async () => {
    writeFileSync(
      filePath,
      source("'use no memo'; // justified: retain") + "\nfunction Plain() { 'use memo'; return { value: 1 }; }",
    );
    const firstPass = await compiled();
    firstPass.events.push({ kind: 'PipelineError', fnLoc: null, data: 'existing module diagnostic' });
    jest.spyOn(compiler, 'compileFilesStreaming').mockImplementationOnce(async (_files, _options, onResult) => {
      await onResult(firstPass);
    });
    jest.mocked(compiler.compileSource).mockClear();
    const { code, document } = await json<LintDocument>(() =>
      runLint({ ...argv(), fix: true, 'revalidate-justified': true }),
    );
    expect(code).toBe(1);
    expect(document.directives).toEqual([]);
    expect(document.unparseable).toEqual([
      expect.objectContaining({ error: expect.stringContaining('existing module diagnostic') }),
    ]);
    expect(compiler.compileSource).not.toHaveBeenCalled();
  });

  it('keeps newly unattributed probe errors broken and protected', async () => {
    const original = source("'use no memo'; // justified: retain");
    writeFileSync(filePath, original);
    const firstPass = await compiled();
    jest.spyOn(compiler, 'compileSource').mockResolvedValueOnce({
      events: [{ kind: 'PipelineError', fnLoc: null, data: 'new module diagnostic' }],
    });
    const results = await revalidateJustifiedDirectives(firstPass, 'infer');
    expect(results).toEqual([
      expect.objectContaining({
        status: 'broken',
        justified: true,
        reason: expect.stringContaining('new module diagnostic'),
      }),
    ]);
    expect(await applyFixes(results)).toMatchObject({ filesModified: 0 });
    expect(readFileSync(filePath, 'utf-8')).toBe(original);
  });

  it('honors explicit parser overrides and falls back to first-pass parser settings', async () => {
    writeFileSync(
      filePath,
      'declare const decorate: ClassDecorator;\n@decorate class Legacy {}\n' +
        source("'use no memo'; // justified: retain"),
    );
    const firstPass = await compileFile({ filePath, packageName: null }, 'infer', false, {}, undefined, [
      'decorators-legacy',
    ]);
    expect(firstPass.error).toBeUndefined();
    const overridden = await revalidateJustifiedDirectives(firstPass, 'infer', { parserPlugins: [] });
    expect(overridden[0].status).toBe('broken');
    const fallback = await revalidateJustifiedDirectives(firstPass, 'infer');
    expect(fallback[0].status).toBe('active');
    const explicit = await revalidateJustifiedDirectives(firstPass, 'infer', { parserPlugins: ['decorators-legacy'] });
    expect(explicit[0].status).toBe('active');
  });

  it.each([
    [
      'missing',
      () => {
        throw Object.assign(new Error('metadata unavailable'), { code: 'MODULE_NOT_FOUND' });
      },
    ],
    [
      'hidden exports',
      () => {
        throw Object.assign(new Error('metadata unavailable'), { code: 'ERR_PACKAGE_PATH_NOT_EXPORTED' });
      },
    ],
    [
      'unreadable',
      () => {
        throw Object.assign(new Error('metadata unreadable'), { code: 'EACCES' });
      },
    ],
    [
      'invalid JSON',
      () => {
        throw new SyntaxError('invalid metadata JSON');
      },
    ],
    ['invalid version', () => ({ version: 0 })],
  ])('warns for %s metadata without failing analysis', async (_label, metadata) => {
    writeFileSync(filePath, source());
    jest.doMock('babel-plugin-react-compiler/package.json', metadata);
    const warning = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    const lines: string[] = [];
    jest.spyOn(console, 'log').mockImplementation((...args: unknown[]) => lines.push(args.join(' ')));
    expect(await runAnalyze({ ...argv(), format: 'cli', verbose: true })).toBe(0);
    expect(warning).toHaveBeenCalledWith(expect.stringContaining('Warning:'));
    expect(lines.join('\n')).toContain('React Compiler unavailable;');
    expect(lines.join('\n')).toContain('Compiler accepted');
  });

  it('does not hide actual compiler failures when informational metadata is invalid', async () => {
    writeFileSync(filePath, source());
    jest.doMock('babel-plugin-react-compiler/package.json', () => ({}));
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    const firstPass = await compiled();
    firstPass.error = new Error('actual compiler failure');
    jest.spyOn(compiler, 'compileFilesStreaming').mockImplementationOnce(async (_files, _options, onResult) => {
      await onResult(firstPass);
    });
    await expect(runAnalyze({ ...argv(), format: 'cli', verbose: true })).rejects.toThrow('actual compiler failure');
  });

  it('does not read informational compiler metadata for verbose JSON', async () => {
    writeFileSync(filePath, source());
    const metadata = jest.fn(() => {
      throw new Error('should not read metadata');
    });
    jest.doMock('babel-plugin-react-compiler/package.json', metadata);
    const {
      code,
      doc: document,
      stderr,
    } = await captureJson<AnalysisDocument>(() => runAnalyze({ ...argv(), verbose: true }));
    expect(code).toBe(0);
    expect(document).not.toHaveProperty('compiler');
    expect(metadata).not.toHaveBeenCalled();
    expect(stderr.join('\n')).toContain('Analyzing:');
  });

  it('rejects incomplete or misleading dry-run schema metadata', async () => {
    writeFileSync(filePath, source());
    const { document } = await json<AnalysisDocument>(() =>
      runAnalyze({ ...argv(), annotate: 'all', 'dry-run': true }),
    );
    const schema = JSON.parse(readFileSync(join(__dirname, '../../rca.analyze.schema.json'), 'utf-8'));
    const validate = new Ajv().compile(schema);
    expect(validate({ ...document, annotate: { ...document.annotate, filesModified: 1 } })).toBe(false);
    const { planned, ...withoutPlan } = document.annotate!;
    expect(planned).toBeDefined();
    expect(validate({ ...document, annotate: withoutPlan })).toBe(false);
    const { dryRun, ...withoutDryRun } = document.annotate!;
    expect(dryRun).toBe(true);
    expect(validate({ ...document, annotate: withoutDryRun })).toBe(false);
  });

  it.each(['cli', 'md', 'html'] as const)('shows compiler identity once only in verbose %s output', async format => {
    writeFileSync(filePath, source());
    const lines: string[] = [];
    jest.spyOn(console, 'log').mockImplementation((...args: unknown[]) => lines.push(args.join(' ')));
    await runAnalyze({ ...argv(), format, verbose: true });
    const output = lines.join('\n');
    expect(output.match(/Backend: Babel /g)).toHaveLength(1);
    expect(output).toMatch(/React Compiler \d/);
    expect(output).toContain('syntax-only TypeScript parsing');
    lines.length = 0;
    await runAnalyze({ ...argv(), format, verbose: false });
    expect(lines.join('\n')).not.toContain('Backend:');
  });
});
