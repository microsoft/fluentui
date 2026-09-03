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

    describe('findings suppressed by a directive', () => {
      beforeEach(() => {
        writeFileSync(
          join(tempDir, 'src', 'Suppressed.tsx'),
          `declare function getAppStore(): { currentId: string };

export function Guarded() {
  'use no memo';
  const id = getAppStore().currentId;
  return <div>{id}</div>;
}
`,
        );
      });

      /** A load-bearing opt-out must be distinguishable from a function that has no risk at all. */
      it('marks a finding whose function opted out with `use no memo`', async () => {
        const { doc } = await captureJson<AnalysisDocument>(() =>
          runAnalyze(argv({ 'risk-config': join(tempDir, 'rc.json') }) as never),
        );

        const suppressed = doc.findings.filter(finding => finding.file.includes('Suppressed.tsx'));
        expect(suppressed).toHaveLength(1);
        expect(suppressed[0]).toMatchObject({ compiled: false, suppressed: 'use no memo' });
      });

      it('omits the suppressed key for a live finding', async () => {
        const { doc } = await captureJson<AnalysisDocument>(() =>
          runAnalyze(argv({ 'risk-config': join(tempDir, 'rc.json') }) as never),
        );

        const live = doc.findings.find(finding => finding.file.includes('Risky.tsx'));
        expect(live).toMatchObject({ compiled: true });
        expect(live!.suppressed).toBeUndefined();
      });

      it('counts suppressed findings separately in the summary', async () => {
        const { doc } = await captureJson<AnalysisDocument>(() =>
          runAnalyze(argv({ 'risk-config': join(tempDir, 'rc.json') }) as never),
        );

        expect(doc.summary.findings).toBe(2);
        expect(doc.summary.findingsOnCompiled).toBe(1);
        expect(doc.summary.findingsSuppressed).toBe(1);
      });

      /** A compile failure is also `compiled: false`, so the two must not be conflated. */
      it('does not mark a finding that is merely uncompiled as suppressed', async () => {
        writeFileSync(
          join(tempDir, 'src', 'Bail.tsx'),
          `declare function getAppStore(): { currentId: string };

export function Bail() {
  const id = getAppStore().currentId;
  try {
    return <div>{id}</div>;
  } finally {
    console.log('x');
  }
}
`,
        );
        const { doc } = await captureJson<AnalysisDocument>(() =>
          runAnalyze(argv({ 'risk-config': join(tempDir, 'rc.json') }) as never),
        );

        const bail = doc.findings.find(finding => finding.file.includes('Bail.tsx'));
        expect(bail).toBeDefined();
        expect(bail!.suppressed).toBeUndefined();
      });

      /**
       * The cross-file resolver keys findings by function declaration while a CompileSkip locates
       * the function at its body, so an opted-out wrapper risk must still reach the report.
       */
      describe('reached through the cross-file wrapper resolver', () => {
        beforeEach(() => {
          writeFileSync(
            join(tempDir, 'src', 'logStore.ts'),
            `declare function getStore(): { getState(): { logs: string[] } };

export function getAllLogs() {
  return getStore().getState().logs;
}
`,
          );
          writeFileSync(
            join(tempDir, 'src', 'Wrapped.tsx'),
            `import { getAllLogs } from './logStore';

export function GuardedWrapper() {
  'use no memo';
  const logs = getAllLogs();
  return <div>{logs.length}</div>;
}

export function LiveWrapper() {
  const logs = getAllLogs();
  return <div>{logs.length}</div>;
}
`,
          );
          writeFileSync(
            join(tempDir, 'wrappers.json'),
            JSON.stringify({ detectGetStateReads: true, resolveWrappers: true }),
          );
        });

        it('reports a wrapper-resolved risk inside an opted-out function', async () => {
          const { doc } = await captureJson<AnalysisDocument>(() =>
            runAnalyze(argv({ 'risk-config': join(tempDir, 'wrappers.json') }) as never),
          );

          const guarded = doc.findings.filter(f => f.file.includes('Wrapped.tsx') && !f.compiled);
          expect(guarded).toHaveLength(1);
          expect(guarded[0].message).toContain('reached via');
          expect(guarded[0].suppressed).toBe('use no memo');
        });

        it('still reports the equivalent risk when no directive is present', async () => {
          const { doc } = await captureJson<AnalysisDocument>(() =>
            runAnalyze(argv({ 'risk-config': join(tempDir, 'wrappers.json') }) as never),
          );

          const live = doc.findings.filter(f => f.file.includes('Wrapped.tsx') && f.compiled);
          expect(live).toHaveLength(1);
          expect(live[0].suppressed).toBeUndefined();
        });

        it('counts the suppressed wrapper finding in the summary', async () => {
          const { doc } = await captureJson<AnalysisDocument>(() =>
            runAnalyze(argv({ 'risk-config': join(tempDir, 'wrappers.json') }) as never),
          );

          expect(doc.summary.findingsSuppressed).toBe(1);
        });
      });
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
