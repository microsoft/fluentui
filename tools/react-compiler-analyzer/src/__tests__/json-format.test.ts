import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

import { runAnalyze } from '../commands/analyze';
import { runLint } from '../commands/lint';
import { DEFAULT_EXCLUDE } from '../commands/shared';
import { toAnalysisDocument, toLintDocument } from '../serializer';
import type { AnalysisDocument, FunctionAnalysis, LintDocument } from '../types';

/** Run a command with stdout captured, returning the parsed document plus anything on stderr. */
async function captureJson<T>(run: () => Promise<number>): Promise<{ doc: T; code: number; stderr: string[] }> {
  const chunks: string[] = [];
  const stderr: string[] = [];
  const originalWrite = process.stdout.write;
  const originalError = console.error;

  process.stdout.write = ((chunk: string) => {
    chunks.push(String(chunk));
    return true;
  }) as typeof process.stdout.write;
  console.error = (...args: unknown[]) => {
    stderr.push(args.map(String).join(' '));
  };

  try {
    const code = await run();
    const stdout = chunks.join('');
    return { doc: JSON.parse(stdout) as T, code, stderr };
  } finally {
    process.stdout.write = originalWrite;
    console.error = originalError;
  }
}

describe('--format json', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = mkdtempSync(join(tmpdir(), 'json-format-'));
    mkdirSync(join(tempDir, 'src'), { recursive: true });
    writeFileSync(join(tempDir, 'package.json'), JSON.stringify({ name: 'json-pkg' }));
  });

  function argv(overrides: Record<string, unknown> = {}) {
    return {
      paths: [tempDir],
      verbose: false,
      concurrency: 2,
      'full-reasons': false,
      exclude: DEFAULT_EXCLUDE,
      mode: 'infer' as const,
      format: 'json' as const,
      'strict-paths': false,
      annotate: undefined,
      'risk-config': undefined,
      fix: false,
      ...overrides,
    };
  }

  describe('analyze', () => {
    beforeEach(() => {
      writeFileSync(
        join(tempDir, 'src', 'Risky.tsx'),
        `import { useState } from 'react';

declare function getAppStore(): { currentId: string };

export function Risky({ label }: { label: string }) {
  const [n, setN] = useState(0);
  const id = getAppStore().currentId;
  return <div onClick={() => setN(c => c + 1)}>{label}{id}{n}</div>;
}
`,
      );
      const configPath = join(tempDir, 'rc.json');
      writeFileSync(configPath, JSON.stringify({ storeAccessorPattern: 'Store$' }));
    });

    it('emits a versioned envelope on stdout', async () => {
      const { doc, code } = await captureJson<AnalysisDocument>(() =>
        runAnalyze(argv({ 'risk-config': join(tempDir, 'rc.json') }) as never),
      );

      expect(code).toBe(0);
      expect(doc.schemaVersion).toBe(1);
      expect(doc.tool).toBe('react-compiler-analyzer');
      expect(doc.command).toBe('analyze');
      expect(doc.mode).toBe('infer');
    });

    it('emits findings with the requested field shape', async () => {
      const { doc } = await captureJson<AnalysisDocument>(() =>
        runAnalyze(argv({ 'risk-config': join(tempDir, 'rc.json') }) as never),
      );

      expect(doc.findings).toHaveLength(1);
      expect(doc.findings[0]).toMatchObject({
        file: expect.stringContaining('Risky.tsx'),
        line: expect.any(Number),
        rule: 'nonreactive-store-read',
        severity: 'medium',
        compiled: true,
      });
    });

    it('uses workspace-relative POSIX paths', async () => {
      const { doc } = await captureJson<AnalysisDocument>(() => runAnalyze(argv() as never));
      for (const fn of doc.functions) {
        expect(fn.file.startsWith('/')).toBe(false);
        expect(fn.file).not.toContain('\\');
      }
    });

    it('produces byte-identical output across runs', async () => {
      const first = await captureJson<AnalysisDocument>(() => runAnalyze(argv() as never));
      const second = await captureJson<AnalysisDocument>(() => runAnalyze(argv() as never));
      expect(JSON.stringify(first.doc)).toBe(JSON.stringify(second.doc));
    });

    it('routes scan diagnostics to stderr so stdout stays parseable', async () => {
      const { stderr } = await captureJson<AnalysisDocument>(() => runAnalyze(argv({ verbose: true }) as never));
      // Parsing in captureJson already proves stdout was pure JSON.
      expect(stderr.some(line => line.includes('Analyzing:'))).toBe(true);
    });

    it('reports files the parser rejected instead of dropping them silently', async () => {
      writeFileSync(join(tempDir, 'src', 'Broken.tsx'), 'export function Nope( { return <div />;\n');
      const { doc } = await captureJson<AnalysisDocument>(() => runAnalyze(argv() as never));

      expect(doc.summary.unparseableFiles).toBe(1);
      expect(doc.unparseable[0].file).toContain('Broken.tsx');
      expect(doc.unparseable[0].error).toBeTruthy();
    });

    describe('with --annotate', () => {
      it('still writes directives to disk', async () => {
        const before = readFileSync(join(tempDir, 'src', 'Risky.tsx'), 'utf-8');
        expect(before).not.toContain('use memo');

        await captureJson<AnalysisDocument>(() => runAnalyze(argv({ annotate: 'all' }) as never));

        expect(readFileSync(join(tempDir, 'src', 'Risky.tsx'), 'utf-8')).toContain("'use memo'");
      });

      it('reports the annotation outcome in the document', async () => {
        const { doc } = await captureJson<AnalysisDocument>(() => runAnalyze(argv({ annotate: 'all' }) as never));

        expect(doc.annotate).toMatchObject({
          mode: 'all',
          functionsAnnotated: expect.any(Number),
          filesModified: expect.any(Number),
        });
        expect(doc.annotate!.functionsAnnotated).toBeGreaterThan(0);
      });

      it('omits the annotate key when --annotate was not requested', async () => {
        const { doc } = await captureJson<AnalysisDocument>(() => runAnalyze(argv() as never));
        expect(doc.annotate).toBeUndefined();
      });
    });
  });

  describe('lint', () => {
    it('emits directives and keeps the failing exit code', async () => {
      writeFileSync(
        join(tempDir, 'src', 'Redundant.tsx'),
        `import { useRef } from 'react';

export function useUncompilable() {
  'use no memo';
  const ref = useRef<number>(null);
  ref.current = 42;
  return ref;
}
`,
      );

      const { doc, code } = await captureJson<LintDocument>(() => runLint(argv() as never));

      expect(code).toBe(1);
      expect(doc.command).toBe('lint');
      expect(doc.summary.redundant).toBe(1);
      expect(doc.directives[0]).toMatchObject({ directive: 'use-no-memo', status: 'redundant' });
    });
  });
});

describe('serializers', () => {
  const base: FunctionAnalysis = {
    filePath: '/ws/src/A.tsx',
    packageName: 'pkg',
    line: 3,
    column: 0,
    functionName: 'A',
    status: 'compiled',
    compilerEvent: 'CompileSuccess',
  };

  it('marks findings on non-compiled functions as not compiled', () => {
    const doc = toAnalysisDocument(
      [
        {
          ...base,
          status: 'error',
          compilerEvent: 'CompileError',
          risks: [
            {
              ruleId: 'nonreactive-store-read',
              severity: 'high',
              line: 4,
              column: 2,
              symbol: 'getAppStore',
              message: 'x',
            },
          ],
        },
      ],
      { mode: 'infer', workspaceRoot: '/ws' },
    );

    expect(doc.findings[0].compiled).toBe(false);
    expect(doc.summary.findings).toBe(1);
    expect(doc.summary.findingsOnCompiled).toBe(0);
  });

  it('omits optional fields rather than emitting nulls', () => {
    const doc = toAnalysisDocument([base], { mode: 'infer', workspaceRoot: '/ws' });
    expect(doc.functions[0]).not.toHaveProperty('reason');
    expect(doc.functions[0]).not.toHaveProperty('memoStats');
    expect(doc.findings).toHaveLength(0);
  });

  it('summarizes lint directives by status', () => {
    const doc: LintDocument = toLintDocument(
      [
        {
          filePath: '/ws/src/A.tsx',
          packageName: 'pkg',
          line: 2,
          functionName: 'A',
          status: 'broken',
          compilerEvent: 'CompileError',
          directiveType: 'use-memo',
        },
      ],
      { mode: 'annotation', workspaceRoot: '/ws' },
    );

    expect(doc.mode).toBe('annotation');
    expect(doc.summary).toMatchObject({ directives: 1, broken: 1, redundant: 0 });
    expect(doc.directives[0].file).toBe('src/A.tsx');
  });
});
