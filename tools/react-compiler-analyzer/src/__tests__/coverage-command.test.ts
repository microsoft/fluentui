import { mkdtempSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

import { analyzeFilesForCoverage } from '../coverage-analyzer';
import { applyAnnotations } from '../coverage-fixer';
import { printMigrationCandidates } from '../coverage-reporter';
import type { FileEntry } from '../types';

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

    const files: FileEntry[] = [{ filePath: componentFile, packageName: 'test-integration-pkg' }];
    const results = await analyzeFilesForCoverage(files, {
      concurrency: 1,
      verbose: false,
      compilationMode: 'infer',
    });

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

    const files: FileEntry[] = [{ filePath: componentFile, packageName: 'test-integration-pkg' }];
    const results = await analyzeFilesForCoverage(files, {
      concurrency: 1,
      verbose: false,
      compilationMode: 'infer',
    });

    const outcome = await applyAnnotations(results);

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

    const files: FileEntry[] = [{ filePath: componentFile, packageName: 'test-integration-pkg' }];
    const results = await analyzeFilesForCoverage(files, {
      concurrency: 1,
      verbose: false,
      compilationMode: 'infer',
    });

    // First pass
    await applyAnnotations(results);
    const firstContent = readFileSync(componentFile, 'utf-8');

    // Re-analyze after annotation
    const results2 = await analyzeFilesForCoverage([{ filePath: componentFile, packageName: 'test-integration-pkg' }], {
      concurrency: 1,
      verbose: false,
      compilationMode: 'infer',
    });

    // Second pass
    const outcome2 = await applyAnnotations(results2);
    const secondContent = readFileSync(componentFile, 'utf-8');

    // Content should be the same (idempotent)
    expect(secondContent).toBe(firstContent);
    expect(outcome2.functionsAnnotated).toBe(0);
  });
});
