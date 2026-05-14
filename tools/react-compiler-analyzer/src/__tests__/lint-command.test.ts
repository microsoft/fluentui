import { mkdtempSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

import { analyzeNoMemoDirectives, deriveMemoDirectiveStatuses } from '../analyzer';
import { compileFile } from '../compiler';
import { applyFixes } from '../fixer';
import type { CompilationMode, DirectiveAnalysis, FileEntry } from '../types';

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
