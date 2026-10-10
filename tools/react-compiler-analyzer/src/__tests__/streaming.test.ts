import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

import { compileFiles, compileFilesStreaming } from '../compiler';
import { deriveCoverage } from '../coverage-analyzer';
import { sortByLocation } from '../commands/shared';
import type { FileEntry } from '../types';

const COMPONENT = (name: string) => `import { useState } from 'react';

export function ${name}({ label }: { label: string }) {
  const [count, setCount] = useState(0);
  return <div onClick={() => setCount(c => c + 1)}>{label} {count}</div>;
}
`;

describe('compileFilesStreaming', () => {
  let tempDir: string;
  let files: FileEntry[];

  beforeEach(() => {
    tempDir = mkdtempSync(join(tmpdir(), 'streaming-'));
    mkdirSync(join(tempDir, 'src'), { recursive: true });
    files = [];
    // Enough files, with varying sizes, that workers finish out of input order.
    for (let i = 0; i < 12; i++) {
      const filePath = join(tempDir, 'src', `C${String(i).padStart(2, '0')}.tsx`);
      writeFileSync(filePath, COMPONENT(`C${i}`).repeat(i % 3 === 0 ? 4 : 1));
      files.push({ filePath, packageName: 'stream-pkg' });
    }
  });

  const options = { concurrency: 4, verbose: false, compilationMode: 'infer' as const };

  it('invokes the callback exactly once per file', async () => {
    const seen: string[] = [];
    await compileFilesStreaming(files, options, result => {
      seen.push(result.filePath);
    });

    expect(seen).toHaveLength(files.length);
    expect(new Set(seen).size).toBe(files.length);
  });

  it('produces the same coverage as collecting every result up front', async () => {
    const collected = (await compileFiles(files, options)).flatMap(r => deriveCoverage(r));

    const streamed: ReturnType<typeof deriveCoverage> = [];
    await compileFilesStreaming(files, options, result => {
      streamed.push(...deriveCoverage(result));
    });

    expect(sortByLocation(streamed)).toEqual(sortByLocation(collected));
  });

  it('supports an async callback', async () => {
    let count = 0;
    await compileFilesStreaming(files, options, async () => {
      await Promise.resolve();
      count++;
    });
    expect(count).toBe(files.length);
  });

  it('yields a stable order across runs once sorted', async () => {
    async function run() {
      const out: ReturnType<typeof deriveCoverage> = [];
      await compileFilesStreaming(files, options, result => {
        out.push(...deriveCoverage(result));
      });
      return sortByLocation(out).map(r => `${r.filePath}:${r.line}:${r.column}`);
    }

    expect(await run()).toEqual(await run());
  });
});

describe('sortByLocation', () => {
  it('orders by package, then file, then line, then column', () => {
    const sorted = sortByLocation([
      { packageName: 'b', filePath: 'a.ts', line: 1, column: 0 },
      { packageName: 'a', filePath: 'z.ts', line: 1, column: 0 },
      { packageName: 'a', filePath: 'a.ts', line: 9, column: 0 },
      { packageName: 'a', filePath: 'a.ts', line: 2, column: 4 },
      { packageName: 'a', filePath: 'a.ts', line: 2, column: 1 },
    ]);

    expect(sorted.map(r => `${r.packageName}/${r.filePath}:${r.line}:${r.column}`)).toEqual([
      'a/a.ts:2:1',
      'a/a.ts:2:4',
      'a/a.ts:9:0',
      'a/z.ts:1:0',
      'b/a.ts:1:0',
    ]);
  });

  it('tolerates entries without a column', () => {
    const sorted = sortByLocation([
      { packageName: 'a', filePath: 'a.ts', line: 3 },
      { packageName: 'a', filePath: 'a.ts', line: 1 },
    ]);
    expect(sorted.map(r => r.line)).toEqual([1, 3]);
  });
});
