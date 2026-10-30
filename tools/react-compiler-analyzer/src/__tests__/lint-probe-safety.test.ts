import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import * as compiler from '../compiler';
import { runLint } from '../commands/lint';
import type { CompilationMode, LintDocument } from '../types';
import { captureJson } from './helpers/output';

jest.mock('../compiler', () => {
  const actual = jest.requireActual<typeof import('../compiler')>('../compiler');
  return {
    ...actual,
    compileSource: jest.fn(actual.compileSource),
    compileFilesStreaming: jest.fn(actual.compileFilesStreaming),
  };
});

describe('lint fails closed on incomplete compiler evidence', () => {
  let root: string;
  let filePath: string;
  beforeEach(() => {
    root = mkdtempSync(join(process.cwd(), '.rca-lint-safety-'));
    filePath = join(root, 'Example.tsx');
  });
  afterEach(() => {
    jest
      .mocked(compiler.compileSource)
      .mockImplementation(jest.requireActual<typeof import('../compiler')>('../compiler').compileSource);
    jest
      .mocked(compiler.compileFilesStreaming)
      .mockImplementation(jest.requireActual<typeof import('../compiler')>('../compiler').compileFilesStreaming);
    jest.clearAllMocks();
    rmSync(root, { recursive: true, force: true });
  });

  function argv(mode: CompilationMode = 'infer', revalidate = false) {
    return {
      paths: [filePath],
      mode,
      concurrency: 1,
      verbose: false,
      exclude: [],
      'strict-paths': true,
      format: 'json' as const,
      fix: true,
      'revalidate-justified': revalidate,
    };
  }

  it.each<CompilationMode>(['infer', 'annotation', 'all'])(
    'protects collective ordinary probes from unattributed errors in %s mode',
    async mode => {
      const source =
        'export function One() { \'use no memo\'; return <div />; }\nexport function Two() { "use no memo"; return <span />; }';
      writeFileSync(filePath, source);
      jest.mocked(compiler.compileSource).mockResolvedValueOnce({
        events: [{ kind: 'CompileError', fnLoc: null, detail: { reason: 'unattributed probe rejection' } }],
      });
      const { code, doc } = await captureJson<LintDocument>(() => runLint(argv(mode)));
      expect(code).toBe(1);
      expect(doc.directives).toHaveLength(2);
      expect(doc.directives.every(item => item.status === 'broken')).toBe(true);
      expect(doc.directives[0].reason).toContain('unattributed probe rejection');
      expect(readFileSync(filePath, 'utf8')).toBe(source);
      expect(compiler.compileSource).toHaveBeenCalledWith(expect.stringContaining("'use no-memo'"), filePath, {
        compilationMode: mode,
      });
      const probeSource = jest.mocked(compiler.compileSource).mock.calls[0][0];
      expect(probeSource).toContain('"use no-memo"');
    },
  );

  it.each([false, true])(
    'protects ordinary and justified probes from attributed PipelineError (justified=%s)',
    async justified => {
      const source = `export function Example() { 'use no memo'; ${
        justified ? '// justified: protected\n' : ''
      }return <div />; }`;
      writeFileSync(filePath, source);
      const first = await compiler.compileFile({ filePath, packageName: null }, 'infer', false);
      const span = first.sourceFunctions.values()[0].declarationSpan;
      jest.mocked(compiler.compileSource).mockResolvedValueOnce({
        events: [{ kind: 'PipelineError', fnLoc: span, data: 'attributed pipeline failure' }],
      });
      const { code, doc } = await captureJson<LintDocument>(() => runLint(argv('infer', justified)));
      expect(code).toBe(1);
      expect(doc.directives[0]).toMatchObject({
        status: 'broken',
        reason: expect.stringContaining('pipeline failure'),
      });
      expect(readFileSync(filePath, 'utf8')).toBe(source);
    },
  );

  it.each(['parse failure', 'native transform rejected', 'fatal without diagnostics', 'unsupported gating shape'])(
    'does not fix ordinary opt-outs after %s',
    async reason => {
      const source = "export function Example() { 'use no memo'; return <div />; }";
      writeFileSync(filePath, source);
      jest.mocked(compiler.compileSource).mockResolvedValueOnce({ events: [], error: new Error(reason) });
      const { code, doc } = await captureJson<LintDocument>(() => runLint(argv()));
      expect(code).toBe(1);
      expect(doc.directives[0]).toMatchObject({ status: 'broken', reason: expect.stringContaining(reason) });
      expect(readFileSync(filePath, 'utf8')).toBe(source);
    },
  );

  it('protects conflicts too when first-pass pipeline failure is attributed', async () => {
    const source = "export function Example() { 'use memo'; 'use no memo'; return <div />; }";
    writeFileSync(filePath, source);
    const first = await compiler.compileFile({ filePath, packageName: null }, 'infer', false);
    first.events.push({
      kind: 'PipelineError',
      fnLoc: first.sourceFunctions.values()[0].declarationSpan,
      data: 'first pass pipeline failed',
    });
    jest.mocked(compiler.compileFilesStreaming).mockImplementationOnce(async (_files, _options, onResult) => {
      await onResult(first);
    });
    const { code, doc } = await captureJson<LintDocument>(() => runLint(argv()));
    expect(code).toBe(1);
    expect(doc.directives).toEqual([]);
    expect(doc.unparseable).toEqual([
      expect.objectContaining({ error: expect.stringContaining('first pass pipeline failed') }),
    ]);
    expect(compiler.compileSource).not.toHaveBeenCalled();
    expect(readFileSync(filePath, 'utf8')).toBe(source);
  });

  it.each(['const = ;', 'let value; let value;', 'const value: {| a: number |} = {};'])(
    'reports syntax/semantic/unsupported grammar failures without edits: %s',
    async invalid => {
      const source = `export function Example() { 'use no memo'; ${invalid} return <div />; }`;
      writeFileSync(filePath, source);
      const { code, doc } = await captureJson<LintDocument>(() => runLint(argv()));
      expect(code).toBe(1);
      expect(doc.unparseable).toHaveLength(1);
      expect(readFileSync(filePath, 'utf8')).toBe(source);
    },
  );
});
