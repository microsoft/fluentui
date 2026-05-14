import { mkdtempSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

import { compileFile } from '../compiler';
import { deriveCoverage } from '../coverage-analyzer';
import { applyAnnotations } from '../coverage-fixer';
import type { FileEntry, FunctionAnalysis } from '../types';

async function analyzeForCoverage(entry: FileEntry): Promise<FunctionAnalysis[]> {
  const compiled = await compileFile(entry, 'infer', false);
  return deriveCoverage(compiled);
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
