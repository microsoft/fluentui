import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, realpathSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

import { analyzeNoMemoDirectives, deriveMemoDirectiveStatuses } from '../analyzer';
import { compileFile, compileFiles } from '../compiler';
import { lintCommand } from '../commands/lint';
import { DEFAULT_EXCLUDE } from '../commands/shared';
import { discoverFilesWithDirectives, findPackageName } from '../discovery';
import { applyFixes } from '../fixer';
import type { CompilationMode, DirectiveAnalysis, FileEntry } from '../types';
import { createTempPackage, writeComponent, DIRECTIVE_COMPONENT, type TempPackage } from './helpers/multi-path-setup';

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

async function lintFile(entry: FileEntry, compilationMode: CompilationMode = 'infer'): Promise<DirectiveAnalysis[]> {
  const compiled = await compileFile(entry, compilationMode, false);
  return [
    ...deriveMemoDirectiveStatuses(compiled, compilationMode),
    ...(await analyzeNoMemoDirectives(compiled, compilationMode)),
  ];
}

describe('lint command integration', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = mkdtempSync(join(tmpdir(), 'lint-cmd-test-'));
    mkdirSync(join(tempDir, 'src'), { recursive: true });
    writeFileSync(join(tempDir, 'package.json'), JSON.stringify({ name: 'test-lint-pkg' }));
  });

  it('detects redundant directives in functions the compiler cannot optimize', async () => {
    const componentFile = join(tempDir, 'src', 'Redundant.tsx');
    writeFileSync(
      componentFile,
      `import { useRef } from 'react';

export function useUncompilable() {
  'use no memo';
  const ref = useRef<number>(null);
  ref.current = 42;
  return ref;
}
`,
    );

    const results = await lintFile({ filePath: componentFile, packageName: 'test-lint-pkg' });

    expect(results.length).toBe(1);
    expect(results[0].status).toBe('redundant');
    expect(results[0].directiveType).toBe('use-no-memo');
  });

  it('detects active directives in functions the compiler can optimize', async () => {
    const componentFile = join(tempDir, 'src', 'Active.tsx');
    writeFileSync(
      componentFile,
      `import { useState } from 'react';

export function MyComponent({ label }: { label: string }) {
  'use no memo';
  const [count, setCount] = useState(0);
  return <div onClick={() => setCount(c => c + 1)}>{label} {count}</div>;
}
`,
    );

    const results = await lintFile({ filePath: componentFile, packageName: 'test-lint-pkg' });

    expect(results.length).toBe(1);
    expect(results[0].status).toBe('active');
    expect(results[0].compilerEvent).toBe('CompileSuccess');
    expect(results[0].directiveType).toBe('use-no-memo');
  });

  it('skips justified directives', async () => {
    const componentFile = join(tempDir, 'src', 'Justified.tsx');
    writeFileSync(
      componentFile,
      `import { useState } from 'react';

export function MyComponent({ label }: { label: string }) {
  'use no memo'; // justified: intentional opt-out for perf testing
  const [count, setCount] = useState(0);
  return <div>{label} {count}</div>;
}
`,
    );

    const results = await lintFile({ filePath: componentFile, packageName: 'test-lint-pkg' });

    expect(results.length).toBe(1);
    expect(results[0].status).toBe('skipped');
  });

  it('removes redundant directives with --fix', async () => {
    const componentFile = join(tempDir, 'src', 'FixRedundant.tsx');
    writeFileSync(
      componentFile,
      `import { useRef } from 'react';

export function useUncompilable() {
  'use no memo';
  const ref = useRef<number>(null);
  ref.current = 42;
  return ref;
}
`,
    );

    const results = await lintFile({ filePath: componentFile, packageName: 'test-lint-pkg' });
    const fixResult = await applyFixes(results);

    expect(fixResult.directivesRemoved).toBe(1);
    expect(fixResult.filesModified).toBe(1);

    const modified = readFileSync(componentFile, 'utf-8');
    expect(modified).not.toContain("'use no memo'");
  });

  it('annotates active directives with justification on --fix', async () => {
    const componentFile = join(tempDir, 'src', 'FixActive.tsx');
    writeFileSync(
      componentFile,
      `import { useState } from 'react';

export function MyComponent({ label }: { label: string }) {
  'use no memo';
  const [count, setCount] = useState(0);
  return <div onClick={() => setCount(c => c + 1)}>{label} {count}</div>;
}
`,
    );

    const results = await lintFile({ filePath: componentFile, packageName: 'test-lint-pkg' });
    const fixResult = await applyFixes(results);

    expect(fixResult.directivesJustified).toBe(1);
    expect(fixResult.filesModified).toBe(1);

    const modified = readFileSync(componentFile, 'utf-8');
    expect(modified).toContain('// justified:');
  });

  it('is idempotent — second fix does not modify already-justified directives', async () => {
    const componentFile = join(tempDir, 'src', 'Idempotent.tsx');
    writeFileSync(
      componentFile,
      `import { useState } from 'react';

export function MyComponent({ label }: { label: string }) {
  'use no memo';
  const [count, setCount] = useState(0);
  return <div onClick={() => setCount(c => c + 1)}>{label} {count}</div>;
}
`,
    );

    const entry: FileEntry = { filePath: componentFile, packageName: 'test-lint-pkg' };

    // First pass
    const results1 = await lintFile(entry);
    await applyFixes(results1);
    const firstContent = readFileSync(componentFile, 'utf-8');

    // Second pass — re-analyze the fixed file
    const results2 = await lintFile(entry);
    const fixResult2 = await applyFixes(results2);
    const secondContent = readFileSync(componentFile, 'utf-8');

    expect(secondContent).toBe(firstContent);
    expect(fixResult2.filesModified).toBe(0);
  });

  describe('--mode annotation', () => {
    it('classifies use-no-memo as redundant in annotation mode on compilable function', async () => {
      const componentFile = join(tempDir, 'src', 'AnnotationMode.tsx');
      writeFileSync(
        componentFile,
        `import { useState } from 'react';

export function MyComponent({ label }: { label: string }) {
  'use no memo';
  const [count, setCount] = useState(0);
  return <div onClick={() => setCount(c => c + 1)}>{label} {count}</div>;
}
`,
      );

      const results = await lintFile({ filePath: componentFile, packageName: 'test-lint-pkg' }, 'annotation');

      expect(results.length).toBe(1);
      expect(results[0].status).toBe('redundant');
      expect(results[0].directiveType).toBe('use-no-memo');
    });
  });

  describe('conflicting directives', () => {
    it('detects conflicting directives on the same function', async () => {
      const componentFile = join(tempDir, 'src', 'Conflicting.tsx');
      writeFileSync(
        componentFile,
        `import { useState } from 'react';

export function MyComponent({ label }: { label: string }) {
  'use memo';
  'use no memo';
  const [count, setCount] = useState(0);
  return <div>{label} {count}</div>;
}
`,
      );

      const results = await lintFile({ filePath: componentFile, packageName: 'test-lint-pkg' });

      const conflicting = results.filter(r => r.status === 'conflicting');
      expect(conflicting.length).toBe(2); // both directives marked as conflicting
    });
  });

  describe('use memo directives', () => {
    it('detects broken use-memo on non-compilable function', async () => {
      const componentFile = join(tempDir, 'src', 'BrokenMemo.tsx');
      writeFileSync(
        componentFile,
        `import { useRef } from 'react';

export function useUncompilable() {
  'use memo';
  const ref = useRef<number>(null);
  ref.current = 42;
  return ref;
}
`,
      );

      const results = await lintFile({ filePath: componentFile, packageName: 'test-lint-pkg' });

      expect(results.length).toBe(1);
      expect(results[0].status).toBe('broken');
      expect(results[0].directiveType).toBe('use-memo');
    });

    it('classifies use-memo as active in infer mode on named component', async () => {
      const componentFile = join(tempDir, 'src', 'ActiveMemoInfer.tsx');
      writeFileSync(
        componentFile,
        `import { useState } from 'react';

export function MyComponent({ label }: { label: string }) {
  'use memo';
  const [count, setCount] = useState(0);
  return <div>{label} {count}</div>;
}
`,
      );

      const results = await lintFile({ filePath: componentFile, packageName: 'test-lint-pkg' }, 'infer');

      expect(results.length).toBe(1);
      expect(results[0].status).toBe('active');
      expect(results[0].directiveType).toBe('use-memo');
    });

    it('classifies use-memo as active in annotation mode on compilable function', async () => {
      const componentFile = join(tempDir, 'src', 'ActiveMemo.tsx');
      writeFileSync(
        componentFile,
        `import { useState } from 'react';

export function MyComponent({ label }: { label: string }) {
  'use memo';
  const [count, setCount] = useState(0);
  return <div>{label} {count}</div>;
}
`,
      );

      const results = await lintFile({ filePath: componentFile, packageName: 'test-lint-pkg' }, 'annotation');

      expect(results.length).toBe(1);
      expect(results[0].status).toBe('active');
      expect(results[0].directiveType).toBe('use-memo');
    });
  });

  describe('double-quoted directives', () => {
    it('detects double-quoted use-memo directive', async () => {
      const componentFile = join(tempDir, 'src', 'DoubleQuoteMemo.tsx');
      writeFileSync(
        componentFile,
        `import { useState } from 'react';

export function MyComponent({ label }: { label: string }) {
  "use memo";
  const [count, setCount] = useState(0);
  return <div>{label} {count}</div>;
}
`,
      );

      const results = await lintFile({ filePath: componentFile, packageName: 'test-lint-pkg' }, 'annotation');

      expect(results.length).toBe(1);
      expect(results[0].status).toBe('active');
      expect(results[0].directiveType).toBe('use-memo');
    });

    it('detects double-quoted use-no-memo directive', async () => {
      const componentFile = join(tempDir, 'src', 'DoubleQuoteNoMemo.tsx');
      writeFileSync(
        componentFile,
        `import { useState } from 'react';

export function MyComponent({ label }: { label: string }) {
  "use no memo";
  const [count, setCount] = useState(0);
  return <div onClick={() => setCount(c => c + 1)}>{label} {count}</div>;
}
`,
      );

      const results = await lintFile({ filePath: componentFile, packageName: 'test-lint-pkg' });

      expect(results.length).toBe(1);
      expect(results[0].status).toBe('active');
      expect(results[0].directiveType).toBe('use-no-memo');
    });
  });
});

describe('multi-path lint', () => {
  let pkgA: TempPackage;
  let pkgB: TempPackage;

  beforeEach(() => {
    pkgA = createTempPackage('lint-pkg-alpha');
    pkgB = createTempPackage('lint-pkg-beta');
    writeComponent(pkgA, 'A.tsx', DIRECTIVE_COMPONENT);
    writeComponent(pkgB, 'B.tsx', DIRECTIVE_COMPONENT);
  });

  it('discovers directive files from multiple paths with correct package names', async () => {
    const filesA = await discoverFilesWithDirectives(pkgA.srcDir, pkgA.packageName, DEFAULT_EXCLUDE, false);
    const filesB = await discoverFilesWithDirectives(pkgB.srcDir, pkgB.packageName, DEFAULT_EXCLUDE, false);
    const allFiles = [...filesA, ...filesB];

    expect(allFiles.length).toBe(2);
    expect(allFiles[0].packageName).toBe('lint-pkg-alpha');
    expect(allFiles[1].packageName).toBe('lint-pkg-beta');
  });

  it('lints merged files from multiple paths and produces results for each', async () => {
    const filesA = await discoverFilesWithDirectives(pkgA.srcDir, pkgA.packageName, DEFAULT_EXCLUDE, false);
    const filesB = await discoverFilesWithDirectives(pkgB.srcDir, pkgB.packageName, DEFAULT_EXCLUDE, false);
    const allFiles = [...filesA, ...filesB];

    const compilationResults = await compileFiles(allFiles, {
      concurrency: 10,
      verbose: false,
      compilationMode: 'infer',
    });

    const results: DirectiveAnalysis[] = [];
    for (const compiled of compilationResults) {
      results.push(...deriveMemoDirectiveStatuses(compiled, 'infer'));
      results.push(...(await analyzeNoMemoDirectives(compiled, 'infer')));
    }

    const packagesInResults = new Set(results.map(r => r.packageName));
    expect(packagesInResults).toEqual(new Set(['lint-pkg-alpha', 'lint-pkg-beta']));
    expect(results.length).toBe(2);
    // Both have 'use no memo' on a compilable function → active
    expect(results.every(r => r.status === 'active')).toBe(true);
  });
});

describe('single-file path lint', () => {
  let pkg: TempPackage;

  beforeEach(() => {
    pkg = createTempPackage('file-path-lint');
  });

  it('discovers a single directive file when the path points directly at a file', async () => {
    const filePath = writeComponent(pkg, 'A.tsx', DIRECTIVE_COMPONENT);

    const files = await discoverFilesWithDirectives(filePath, pkg.packageName, DEFAULT_EXCLUDE, false);

    expect(files).toEqual([{ filePath, packageName: pkg.packageName }]);
  });

  it('ignores exclude patterns when the path points directly at a file', async () => {
    const filePath = writeComponent(pkg, 'A.test.tsx', DIRECTIVE_COMPONENT);

    // 'A.test.tsx' matches the default '**/*.test.*' exclude, but an explicit
    // file path must bypass excludes.
    const files = await discoverFilesWithDirectives(filePath, pkg.packageName, DEFAULT_EXCLUDE, false);

    expect(files).toEqual([{ filePath, packageName: pkg.packageName }]);
  });
});

describe('lint command — scan log wrapping', () => {
  let tempDir: string;
  let originalLog: typeof console.log;
  let originalExit: typeof process.exit;
  let captured: string[];

  beforeEach(() => {
    tempDir = realpathSync(mkdtempSync(join(tmpdir(), 'lint-wrap-test-')));
    mkdirSync(join(tempDir, 'src'), { recursive: true });
    writeFileSync(join(tempDir, 'package.json'), JSON.stringify({ name: 'wrap-test-lint-pkg' }));
    // Seed a file with a directive so discoverFilesWithDirectives returns it
    writeFileSync(join(tempDir, 'src', 'L.tsx'), `export function L() {\n  'use memo';\n  return <div />;\n}\n`);

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

  it('wraps scan + both compile passes in a single <details> block', async () => {
    await lintCommand.handler!({
      paths: [tempDir],
      verbose: true,
      concurrency: 1,
      'full-reasons': false,
      exclude: DEFAULT_EXCLUDE,
      fix: false,
      mode: 'infer',
      format: 'md',
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

    // banner before the wrapper
    expect(captured.slice(0, openIdx).some(l => l.includes('React Compiler Lint'))).toBe(true);

    // snapshot the wrapper block with tempDir + cwd normalized so it stays stable across runs
    const wrapper = captured
      .slice(openIdx, closeIdx + 1)
      .map(line => line.split(tempDir).join('<TEMP>').split(process.cwd()).join('<CWD>'))
      .join('\n');

    expect(wrapper).toMatchInlineSnapshot(`
      "<details>
      <summary>📋 Scan & compile log</summary>

      ## Scanning: <TEMP>
         Package: wrap-test-lint-pkg
         Mode: infer

      Files with directives: 1

      Analyzing: <TEMP>/src/L.tsx
        [CompileSuccess] <TEMP>/src/L.tsx fn@1:7 L

      </details>"
    `);
  });

  it('emits terminal-friendly output (no markdown) in the default cli format', async () => {
    // Run with cwd set to the temp dir so the report relativizes file paths to short,
    // machine-independent values (e.g. `src/L.tsx`). This keeps CLI column widths
    // deterministic, so the entire output can be snapshotted (paths normalized to <TEMP>).
    const originalCwd = process.cwd();
    process.chdir(tempDir);
    try {
      await lintCommand.handler!({
        paths: [tempDir],
        verbose: true,
        concurrency: 1,
        'full-reasons': false,
        exclude: DEFAULT_EXCLUDE,
        fix: false,
        mode: 'infer',
        format: 'cli',
        _: [],
        $0: '',
      } as never);
    } finally {
      process.chdir(originalCwd);
    }

    expect(captured.some(l => l.includes('<details>'))).toBe(false);
    expect(captured.some(l => l.startsWith('## '))).toBe(false);
    expect(captured.some(l => l.includes('|'))).toBe(false);

    const output = normalizeCliOutput(captured, tempDir);

    expect(output).toMatchInlineSnapshot(`
      "━━ React Compiler Lint ━━

      📋 Scan & compile log
      ─────────────────────

      Scanning: <TEMP>
      ────────────────
         Package: wrap-test-lint-pkg
         Mode: infer

      Files with directives: 1

      Analyzing: <TEMP>/src/L.tsx
        [CompileSuccess] <TEMP>/src/L.tsx fn@1:7 L


      wrap-test-lint-pkg
      ──────────────────

      ▸ Active (compilable) (1)

      Location     Function  Compiler Event  Reason
      ───────────  ────────  ──────────────  ──────
      src/L.tsx:2  L         CompileSuccess

      Summary
      ───────

      - Total directives: 1
      - Redundant (removable): 0
      - Active 'use memo' (compilable): 1
      - Skipped (already justified): 0

        All directives are valid. Nothing to do.
      "
    `);
  });

  it('emits a self-contained HTML document in the html format', async () => {
    await lintCommand.handler!({
      paths: [tempDir],
      verbose: true,
      concurrency: 1,
      'full-reasons': false,
      exclude: DEFAULT_EXCLUDE,
      fix: false,
      mode: 'infer',
      format: 'html',
      _: [],
      $0: '',
    } as never);

    // The whole report is emitted as a single HTML document.
    expect(captured).toHaveLength(1);
    const doc = captured[0];

    expect(doc.startsWith('<!DOCTYPE html>')).toBe(true);
    expect(doc.trimEnd().endsWith('</html>')).toBe(true);
    expect(doc).toContain('<title>React Compiler Lint</title>');
    expect(doc).toContain('<h1 class="banner">React Compiler Lint</h1>');
    // The compilation mode is surfaced in the meta bar for human clarity.
    expect(doc).toContain('<span class="meta-label">Mode</span><span class="meta-value">infer</span>');
    expect(doc).toContain('<details class="scan-log">');
    expect(doc).toContain('<table>');
    expect(doc).toContain('<h2>Summary</h2>');
    expect(doc).toContain('<div class="log-line">');
    // No leftover terminal/markdown noise.
    expect(doc).not.toContain('━━');
    expect(doc).not.toMatch(/\*\*[^*]+\*\*/);
    expect(doc).not.toContain('| Location |');
  });
});
