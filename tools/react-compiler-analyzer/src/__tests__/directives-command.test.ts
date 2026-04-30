import { mkdtempSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

import { analyzeFiles } from '../analyzer';
import { applyFixes } from '../fixer';
import type { FileEntry } from '../types';

describe('directives command integration', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = mkdtempSync(join(tmpdir(), 'directives-cmd-test-'));
    mkdirSync(join(tempDir, 'src'), { recursive: true });
    writeFileSync(join(tempDir, 'package.json'), JSON.stringify({ name: 'test-directives-pkg' }));
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

    const files: FileEntry[] = [{ filePath: componentFile, packageName: 'test-directives-pkg' }];
    const results = await analyzeFiles(files, { concurrency: 1, verbose: false });

    expect(results.length).toBe(1);
    expect(results[0].status).toBe('redundant');
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

    const files: FileEntry[] = [{ filePath: componentFile, packageName: 'test-directives-pkg' }];
    const results = await analyzeFiles(files, { concurrency: 1, verbose: false });

    expect(results.length).toBe(1);
    expect(results[0].status).toBe('active');
    expect(results[0].compilerEvent).toBe('CompileSuccess');
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

    const files: FileEntry[] = [{ filePath: componentFile, packageName: 'test-directives-pkg' }];
    const results = await analyzeFiles(files, { concurrency: 1, verbose: false });

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

    const files: FileEntry[] = [{ filePath: componentFile, packageName: 'test-directives-pkg' }];
    const results = await analyzeFiles(files, { concurrency: 1, verbose: false });
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

    const files: FileEntry[] = [{ filePath: componentFile, packageName: 'test-directives-pkg' }];
    const results = await analyzeFiles(files, { concurrency: 1, verbose: false });
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

    const files: FileEntry[] = [{ filePath: componentFile, packageName: 'test-directives-pkg' }];

    // First pass
    const results1 = await analyzeFiles(files, { concurrency: 1, verbose: false });
    await applyFixes(results1);
    const firstContent = readFileSync(componentFile, 'utf-8');

    // Second pass — re-analyze the fixed file
    const results2 = await analyzeFiles(files, { concurrency: 1, verbose: false });
    const fixResult2 = await applyFixes(results2);
    const secondContent = readFileSync(componentFile, 'utf-8');

    expect(secondContent).toBe(firstContent);
    expect(fixResult2.filesModified).toBe(0);
  });
});
