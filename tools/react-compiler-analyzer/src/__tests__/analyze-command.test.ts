import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, realpathSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

import { compileFile, compileFiles } from '../compiler';
import { analyzeCommand } from '../commands/analyze';
import { DEFAULT_EXCLUDE } from '../commands/shared';
import { deriveCoverage } from '../coverage-analyzer';
import { applyAnnotations } from '../coverage-fixer';
import { discoverAllFiles, dedupeFileEntries, findPackageName } from '../discovery';
import type { FileEntry, FunctionAnalysis } from '../types';
import { createTempPackage, writeComponent, COMPILABLE_COMPONENT, type TempPackage } from './helpers/multi-path-setup';

async function analyzeForCoverage(entry: FileEntry): Promise<FunctionAnalysis[]> {
  const compiled = await compileFile(entry, 'infer', false);
  return deriveCoverage(compiled);
}

/**
 * Normalize captured CLI output for snapshotting:
 * - replace the temp dir with `<TEMP>` so absolute scan-log paths are stable
 * - rewrite the `Scanning:` heading underline, whose length tracks the (machine-dependent)
 *   absolute path, to match the normalized heading text length
 */
function normalizeCliOutput(captured: string[], tempDir: string): string {
  const lines = captured.map(line => line.split(tempDir).join('<TEMP>'));
  for (let i = 0; i < lines.length - 1; i++) {
    if (lines[i].startsWith('Scanning: ') && /^─+$/.test(lines[i + 1])) {
      lines[i + 1] = '─'.repeat(lines[i].length);
    }
  }
  return lines.join('\n');
}

describe('coverage command integration', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = mkdtempSync(join(tmpdir(), 'coverage-cmd-test-'));
    mkdirSync(join(tempDir, 'src'), { recursive: true });
    writeFileSync(join(tempDir, 'package.json'), JSON.stringify({ name: 'test-integration-pkg' }));
  });

  it('analyzes files and reports migration candidates', async () => {
    const componentFile = join(tempDir, 'src', 'Component.tsx');
    writeFileSync(
      componentFile,
      `import { useMemo, useState } from 'react';

export function MyComponent({ items }: { items: string[] }) {
  const [count, setCount] = useState(0);
  const sorted = useMemo(() => [...items].sort(), [items]);
  return <div>{sorted.join(', ')} {count}</div>;
}
`,
    );

    const results = await analyzeForCoverage({ filePath: componentFile, packageName: 'test-integration-pkg' });

    const candidates = results.filter(r => r.status === 'compiled' && r.manualMemo);
    expect(candidates.length).toBeGreaterThan(0);
  });

  it('applies annotations with --annotate', async () => {
    const componentFile = join(tempDir, 'src', 'Annotatable.tsx');
    writeFileSync(
      componentFile,
      `import { useMemo, useState } from 'react';

export function Annotatable({ items }: { items: string[] }) {
  const [count, setCount] = useState(0);
  const sorted = useMemo(() => [...items].sort(), [items]);
  return <div>{sorted.join(', ')} {count}</div>;
}
`,
    );

    const results = await analyzeForCoverage({ filePath: componentFile, packageName: 'test-integration-pkg' });

    const outcome = await applyAnnotations(results, 'manual-memo');

    if (outcome.functionsAnnotated > 0) {
      const modified = readFileSync(componentFile, 'utf-8');
      expect(modified).toContain("'use memo'");
    }
  });

  it('is idempotent — second annotate does not add duplicate directives', async () => {
    const componentFile = join(tempDir, 'src', 'Idempotent.tsx');
    writeFileSync(
      componentFile,
      `import { useMemo, useState } from 'react';

export function Idempotent({ items }: { items: string[] }) {
  const [count, setCount] = useState(0);
  const sorted = useMemo(() => [...items].sort(), [items]);
  return <div>{sorted.join(', ')} {count}</div>;
}
`,
    );

    const entry: FileEntry = { filePath: componentFile, packageName: 'test-integration-pkg' };

    // First pass
    const results = await analyzeForCoverage(entry);
    await applyAnnotations(results, 'manual-memo');
    const firstContent = readFileSync(componentFile, 'utf-8');

    // Re-analyze after annotation
    const results2 = await analyzeForCoverage(entry);

    // Second pass
    const outcome2 = await applyAnnotations(results2, 'manual-memo');
    const secondContent = readFileSync(componentFile, 'utf-8');

    // Content should be the same (idempotent)
    expect(secondContent).toBe(firstContent);
    expect(outcome2.functionsAnnotated).toBe(0);
  });

  it('applies annotations to functions using React.* namespace hooks', async () => {
    const componentFile = join(tempDir, 'src', 'Namespace.tsx');
    writeFileSync(
      componentFile,
      `import * as React from 'react';

export function NamespaceComponent(props: { items: string[]; multiplier: number }) {
  const [count, setCount] = React.useState(0);

  const handleClick = React.useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const displayCount = React.useMemo(() => count * props.multiplier, [count, props.multiplier]);

  return <button onClick={handleClick}>{displayCount}</button>;
}
`,
    );

    const results = await analyzeForCoverage({ filePath: componentFile, packageName: 'test-integration-pkg' });

    const candidates = results.filter(r => r.status === 'compiled' && r.manualMemo);
    expect(candidates.length).toBeGreaterThan(0);
    expect(candidates[0].manualMemo!.useMemo).toBe(1);
    expect(candidates[0].manualMemo!.useCallback).toBe(1);

    const outcome = await applyAnnotations(results, 'manual-memo');
    expect(outcome.functionsAnnotated).toBeGreaterThan(0);

    const modified = readFileSync(componentFile, 'utf-8');
    expect(modified).toContain("'use memo'");
  });

  it("'all' mode annotates compilable functions without manual memoization", async () => {
    const componentFile = join(tempDir, 'src', 'NoMemo.tsx');
    writeFileSync(
      componentFile,
      `import { useState } from 'react';

export function NoMemoComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
`,
    );

    const results = await analyzeForCoverage({ filePath: componentFile, packageName: 'test-integration-pkg' });

    // Verify this function has no manual memo
    const compiled = results.filter(r => r.status === 'compiled');
    expect(compiled.length).toBeGreaterThan(0);
    expect(compiled[0].manualMemo).toBeUndefined();
    expect(compiled[0].bodyInsertionLine).toBeGreaterThan(0);

    const outcome = await applyAnnotations(results, 'all');
    expect(outcome.functionsAnnotated).toBeGreaterThan(0);

    const modified = readFileSync(componentFile, 'utf-8');
    expect(modified).toContain("'use memo'");
  });

  it("'manual-memo' mode skips compilable functions without manual memoization", async () => {
    const componentFile = join(tempDir, 'src', 'NoMemoSkipped.tsx');
    writeFileSync(
      componentFile,
      `import { useState } from 'react';

export function NoMemoSkipped() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
`,
    );

    const results = await analyzeForCoverage({ filePath: componentFile, packageName: 'test-integration-pkg' });

    const outcome = await applyAnnotations(results, 'manual-memo');
    expect(outcome.functionsAnnotated).toBe(0);

    const content = readFileSync(componentFile, 'utf-8');
    expect(content).not.toContain("'use memo'");
  });
});

describe('multi-path analyze', () => {
  let pkgA: TempPackage;
  let pkgB: TempPackage;

  beforeEach(() => {
    pkgA = createTempPackage('pkg-alpha');
    pkgB = createTempPackage('pkg-beta');
    writeComponent(pkgA, 'A.tsx', COMPILABLE_COMPONENT);
    writeComponent(pkgB, 'B.tsx', COMPILABLE_COMPONENT);
  });

  it('discovers files from multiple paths with correct package names', async () => {
    const filesA = await discoverAllFiles(pkgA.srcDir, pkgA.packageName, DEFAULT_EXCLUDE, false);
    const filesB = await discoverAllFiles(pkgB.srcDir, pkgB.packageName, DEFAULT_EXCLUDE, false);
    const allFiles = [...filesA, ...filesB];

    expect(allFiles.length).toBe(2);
    expect(allFiles[0].packageName).toBe('pkg-alpha');
    expect(allFiles[1].packageName).toBe('pkg-beta');
  });

  it('resolves distinct package names per path via findPackageName', async () => {
    const nameA = await findPackageName(pkgA.srcDir);
    const nameB = await findPackageName(pkgB.srcDir);

    expect(nameA).toBe('pkg-alpha');
    expect(nameB).toBe('pkg-beta');
  });

  it('compiles merged files from multiple paths and produces results for each', async () => {
    const filesA = await discoverAllFiles(pkgA.srcDir, pkgA.packageName, DEFAULT_EXCLUDE, false);
    const filesB = await discoverAllFiles(pkgB.srcDir, pkgB.packageName, DEFAULT_EXCLUDE, false);
    const allFiles = [...filesA, ...filesB];

    const compilationResults = await compileFiles(allFiles, {
      concurrency: 10,
      verbose: false,
      compilationMode: 'infer',
    });

    const coverageResults = compilationResults.flatMap(r => deriveCoverage(r));

    const packagesInResults = new Set(coverageResults.map(r => r.packageName));
    expect(packagesInResults).toEqual(new Set(['pkg-alpha', 'pkg-beta']));
    expect(coverageResults.length).toBeGreaterThanOrEqual(2);
  });

  it('applies annotations across files from multiple paths', async () => {
    const fileA = writeComponent(pkgA, 'Annotatable.tsx', COMPILABLE_COMPONENT);
    const fileB = writeComponent(pkgB, 'Annotatable.tsx', COMPILABLE_COMPONENT);

    const filesA = await discoverAllFiles(pkgA.srcDir, pkgA.packageName, DEFAULT_EXCLUDE, false);
    const filesB = await discoverAllFiles(pkgB.srcDir, pkgB.packageName, DEFAULT_EXCLUDE, false);

    const compilationResults = await compileFiles([...filesA, ...filesB], {
      concurrency: 10,
      verbose: false,
      compilationMode: 'infer',
    });
    const coverageResults = compilationResults.flatMap(r => deriveCoverage(r));
    const outcome = await applyAnnotations(coverageResults, 'manual-memo');

    if (outcome.functionsAnnotated > 0) {
      // At least one file from each package should have been annotated
      const modifiedA = readFileSync(fileA, 'utf-8');
      const modifiedB = readFileSync(fileB, 'utf-8');
      expect(modifiedA).toContain("'use memo'");
      expect(modifiedB).toContain("'use memo'");
    }
  });
});

describe('single-file path analyze', () => {
  let pkg: TempPackage;

  beforeEach(() => {
    pkg = createTempPackage('file-path-analyze');
  });

  it('discovers a single file when the path points directly at a file', async () => {
    const filePath = writeComponent(pkg, 'A.tsx', COMPILABLE_COMPONENT);

    const files = await discoverAllFiles(filePath, pkg.packageName, DEFAULT_EXCLUDE, false);

    expect(files).toEqual([{ filePath, packageName: pkg.packageName }]);
  });

  it('ignores exclude patterns when the path points directly at a file', async () => {
    const filePath = writeComponent(pkg, 'A.test.tsx', COMPILABLE_COMPONENT);

    // 'A.test.tsx' matches the default '**/*.test.*' exclude, but an explicit
    // file path must bypass excludes.
    const files = await discoverAllFiles(filePath, pkg.packageName, DEFAULT_EXCLUDE, false);

    expect(files).toEqual([{ filePath, packageName: pkg.packageName }]);
  });
});

describe('dedupeFileEntries', () => {
  it('removes duplicate entries by file path, preserving first-seen order', () => {
    const entries: FileEntry[] = [
      { filePath: '/p/src/A.tsx', packageName: 'pkg' },
      { filePath: '/p/src/B.tsx', packageName: 'pkg' },
      { filePath: '/p/src/A.tsx', packageName: 'pkg' },
    ];

    expect(dedupeFileEntries(entries)).toEqual([
      { filePath: '/p/src/A.tsx', packageName: 'pkg' },
      { filePath: '/p/src/B.tsx', packageName: 'pkg' },
    ]);
  });

  it('returns an empty array unchanged', () => {
    expect(dedupeFileEntries([])).toEqual([]);
  });
});

describe('mixed directory + file path analyze', () => {
  let tempDir: string;
  let originalLog: typeof console.log;
  let originalExit: typeof process.exit;
  let captured: string[];

  beforeEach(() => {
    // realpathSync so cwd-relative paths in the report are machine-independent.
    tempDir = realpathSync(mkdtempSync(join(tmpdir(), 'analyze-mixed-')));
    mkdirSync(join(tempDir, 'src', 'comp'), { recursive: true });
    writeFileSync(join(tempDir, 'package.json'), JSON.stringify({ name: 'mixed-pkg' }));
    // A directory of components, plus standalone files passed explicitly alongside it.
    writeFileSync(join(tempDir, 'src', 'comp', 'Foo.tsx'), `export function Foo() { return <div />; }\n`);
    writeFileSync(join(tempDir, 'src', 'Bar.styles.ts'), `export const bar = 1;\n`);
    writeFileSync(join(tempDir, 'src', 'Baz.tsx'), `export function Baz() { return <span />; }\n`);

    captured = [];
    originalLog = console.log;
    console.log = (...args: unknown[]) => {
      captured.push(args.map(String).join(' '));
    };

    originalExit = process.exit;
    process.exit = ((_code?: number) => undefined) as never;
  });

  afterEach(() => {
    console.log = originalLog;
    process.exit = originalExit;
  });

  it('accepts a directory combined with explicit files without crashing', async () => {
    await analyzeCommand.handler!({
      paths: [join(tempDir, 'src', 'comp'), join(tempDir, 'src', 'Bar.styles.ts'), join(tempDir, 'src', 'Baz.tsx')],
      verbose: true,
      concurrency: 1,
      'full-reasons': false,
      exclude: DEFAULT_EXCLUDE,
      mode: 'infer',
      format: 'md',
      annotate: undefined,
      _: [],
      $0: '',
    } as never);

    const output = captured.join('\n');
    // All three files (one from the directory + two explicit) are analyzed.
    expect(output).toContain('Files to analyze: 3');
  });

  it('processes a file only once when both its directory and the file itself are passed', async () => {
    await analyzeCommand.handler!({
      paths: [join(tempDir, 'src', 'comp'), join(tempDir, 'src', 'comp', 'Foo.tsx')],
      verbose: true,
      concurrency: 1,
      'full-reasons': false,
      exclude: DEFAULT_EXCLUDE,
      mode: 'infer',
      format: 'md',
      annotate: undefined,
      _: [],
      $0: '',
    } as never);

    const output = captured.join('\n');
    // The directory contains only Foo.tsx; passing it again must not double-count.
    expect(output).toContain('Files to analyze: 1');
    const analyzingFoo = captured.filter(l => l.includes('Analyzing:') && l.includes('Foo.tsx'));
    expect(analyzingFoo).toHaveLength(1);
  });
});

describe('analyze command — scan log wrapping', () => {
  let tempDir: string;
  let originalLog: typeof console.log;
  let originalExit: typeof process.exit;
  let captured: string[];

  beforeEach(() => {
    // realpathSync so the path matches process.cwd() after chdir (macOS maps /var -> /private/var).
    tempDir = realpathSync(mkdtempSync(join(tmpdir(), 'analyze-wrap-test-')));
    mkdirSync(join(tempDir, 'src'), { recursive: true });
    writeFileSync(join(tempDir, 'package.json'), JSON.stringify({ name: 'wrap-test-pkg' }));
    writeFileSync(join(tempDir, 'src', 'A.tsx'), `export function A() { return <div />; }\n`);

    captured = [];
    originalLog = console.log;
    console.log = (...args: unknown[]) => {
      captured.push(args.map(String).join(' '));
    };

    originalExit = process.exit;
    process.exit = ((_code?: number) => undefined) as never;
  });

  afterEach(() => {
    console.log = originalLog;
    process.exit = originalExit;
  });

  it('wraps scan + compile output in a single <details> block', async () => {
    await analyzeCommand.handler!({
      paths: [tempDir],
      verbose: true,
      concurrency: 1,
      'full-reasons': false,
      exclude: DEFAULT_EXCLUDE,
      mode: 'infer',
      format: 'md',
      annotate: undefined,
      _: [],
      $0: '',
    } as never);

    const openIdx = captured.indexOf('<details>');
    const closeIdx = captured.indexOf('</details>');

    // exactly one wrapper, properly ordered
    expect(openIdx).toBeGreaterThanOrEqual(0);
    expect(closeIdx).toBeGreaterThan(openIdx);
    expect(captured.filter(l => l === '<details>')).toHaveLength(1);
    expect(captured.filter(l => l === '</details>')).toHaveLength(1);

    // banner before, report content after
    expect(captured.slice(0, openIdx).some(l => l.includes('React Compiler Analysis'))).toBe(true);
    expect(captured.slice(closeIdx + 1).join('\n')).toMatch(/Coverage|Migration|Summary/);

    // snapshot the wrapper block with tempDir + cwd normalized so it stays stable across runs
    const wrapper = captured
      .slice(openIdx, closeIdx + 1)
      .map(line => line.split(tempDir).join('<TEMP>').split(process.cwd()).join('<CWD>'))
      .join('\n');

    expect(wrapper).toMatchInlineSnapshot(`
      "<details>
      <summary>📋 Scan & compile log</summary>

      ## Scanning: <TEMP>
         Package: wrap-test-pkg
         Mode: infer

        Found 1 TypeScript files in <TEMP>
      Files to analyze: 1

      Analyzing: <TEMP>/src/A.tsx
        [CompileSuccess] <TEMP>/src/A.tsx fn@1:7 A

      </details>"
    `);
  });

  it('emits terminal-friendly output (no markdown) in the default cli format', async () => {
    // Run with cwd set to the temp dir so the report relativizes file paths to short,
    // machine-independent values (e.g. `src/A.tsx`). This keeps CLI column widths
    // deterministic, so the entire output can be snapshotted (paths normalized to <TEMP>).
    const originalCwd = process.cwd();
    process.chdir(tempDir);
    try {
      await analyzeCommand.handler!({
        paths: [tempDir],
        verbose: true,
        concurrency: 1,
        'full-reasons': false,
        exclude: DEFAULT_EXCLUDE,
        mode: 'infer',
        format: 'cli',
        annotate: undefined,
        _: [],
        $0: '',
      } as never);
    } finally {
      process.chdir(originalCwd);
    }

    // No HTML <details> wrapper and no markdown table pipes or heading hashes.
    expect(captured.some(l => l.includes('<details>'))).toBe(false);
    expect(captured.some(l => l.startsWith('## '))).toBe(false);
    expect(captured.some(l => l.includes('|'))).toBe(false);

    const output = normalizeCliOutput(captured, tempDir);

    expect(output).toMatchInlineSnapshot(`
      "━━ React Compiler Analysis ━━

      📋 Scan & compile log
      ─────────────────────

      Scanning: <TEMP>
      ────────────────
         Package: wrap-test-pkg
         Mode: infer

        Found 1 TypeScript files in <TEMP>
      Files to analyze: 1

      Analyzing: <TEMP>/src/A.tsx
        [CompileSuccess] <TEMP>/src/A.tsx fn@1:7 A


      wrap-test-pkg
      ─────────────

      Status    Count  Percentage
      ────────  ─────  ──────────
      Compiled  1      100.0%
      Skipped   0      0.0%
      Errors    0      0.0%
      Total     1

      ▸ Compiled (will be memoized) (1)

      Location     Function  Memo Slots  Memo Blocks  Memo Values
      ───────────  ────────  ──────────  ───────────  ───────────
      src/A.tsx:1  A         1           1            1

      Summary
      ───────

      - Total functions analyzed: 1
      - Compiled (will be memoized): 1 (100.0%)
        - Migration candidates (has manual memoization): 0
        - Compiler-ready (no manual memoization): 1
      - Skipped (not a component/hook): 0 (0.0%)
      - Errors (compiler bailout): 0 (0.0%)

        All recognized functions compile successfully.

      ▸ Legend

      Term         Meaning
      ───────────  ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
      Memo Slots   Total number of cache slots the compiler allocates for a function. Each memoized value or block occupies one slot.
      Memo Blocks  Number of memoized code blocks (JSX elements, conditional branches, etc.) that the compiler wraps with cache checks.
      Memo Values  Number of individual memoized values (variables, expressions, hook results) that the compiler caches between renders.


        Tip: Run lint <path> for directive health checks."
    `);
  });

  it('emits a self-contained HTML document in the html format', async () => {
    await analyzeCommand.handler!({
      paths: [tempDir],
      verbose: true,
      concurrency: 1,
      'full-reasons': false,
      exclude: DEFAULT_EXCLUDE,
      mode: 'infer',
      format: 'html',
      annotate: undefined,
      _: [],
      $0: '',
    } as never);

    // The whole report is emitted as a single HTML document.
    expect(captured).toHaveLength(1);
    const doc = captured[0];

    expect(doc.startsWith('<!DOCTYPE html>')).toBe(true);
    expect(doc.trimEnd().endsWith('</html>')).toBe(true);
    expect(doc).toContain('<title>React Compiler Analysis</title>');
    expect(doc).toContain('<h1 class="banner">React Compiler Analysis</h1>');
    // Report content rendered as real HTML elements.
    expect(doc).toContain('<details class="scan-log">');
    expect(doc).toContain('<table>');
    expect(doc).toContain('<h2>Summary</h2>');
    // Raw compiler diagnostics are wrapped + escaped inside the scan log.
    expect(doc).toContain('<div class="log-line">');
    // No leftover terminal/markdown noise.
    expect(doc).not.toContain('━━');
    expect(doc).not.toMatch(/\*\*[^*]+\*\*/);
    expect(doc).not.toContain('| Status |');
  });
});
