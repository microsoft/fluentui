import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { dedupeFileEntries, discoverAllFiles, locatePackage } from '../discovery';

describe('nearest package discovery', () => {
  it('attributes files under one scan root to their nearest named package', async () => {
    const root = mkdtempSync(join(tmpdir(), 'rca-discovery-'));
    const a = join(root, 'packages', 'a');
    const b = join(root, 'packages', 'b');
    mkdirSync(join(a, 'src'), { recursive: true });
    mkdirSync(join(b, 'src'), { recursive: true });
    writeFileSync(join(root, 'package.json'), JSON.stringify({ name: 'workspace' }));
    writeFileSync(join(a, 'package.json'), JSON.stringify({ name: 'a' }));
    writeFileSync(join(b, 'package.json'), JSON.stringify({ name: 'b' }));
    writeFileSync(join(a, 'src', 'A.ts'), 'export const a = 1;');
    writeFileSync(join(b, 'src', 'B.ts'), 'export const b = 1;');

    const previous = process.cwd();
    process.chdir(root);
    try {
      const files = await discoverAllFiles(root, 'workspace', [], false);
      expect(files.map(file => file.packageName)).toEqual(['a', 'b']);
      expect(files.map(file => file.packageRoot)).toEqual([a, b]);
    } finally {
      process.chdir(previous);
    }
  });

  it('walks past malformed and unnamed inner manifests', async () => {
    const root = mkdtempSync(join(tmpdir(), 'rca-discovery-'));
    const inner = join(root, 'inner');
    mkdirSync(inner);
    writeFileSync(join(root, 'package.json'), JSON.stringify({ name: 'outer' }));
    writeFileSync(join(inner, 'package.json'), '{ malformed');
    const filePath = join(inner, 'A.ts');
    writeFileSync(filePath, '');
    expect(await locatePackage(filePath, root)).toEqual({ packageName: 'outer', packageRoot: root });
  });

  it('finds the package manifest when invoked below the package root', async () => {
    const root = mkdtempSync(join(tmpdir(), 'rca-discovery-'));
    const src = join(root, 'src');
    mkdirSync(src);
    writeFileSync(join(root, 'package.json'), JSON.stringify({ name: 'nested-cwd' }));
    const filePath = join(src, 'A.ts');
    writeFileSync(filePath, 'export const a = 1;');

    const previous = process.cwd();
    process.chdir(src);
    try {
      await expect(discoverAllFiles(src, 'nested-cwd', [], false)).resolves.toEqual([
        { filePath, packageName: 'nested-cwd', packageRoot: root },
      ]);
    } finally {
      process.chdir(previous);
    }
  });

  it('deduplicates overlapping inputs with a stable file order', () => {
    expect(
      dedupeFileEntries([
        { filePath: '/z.ts', packageName: 'z', packageRoot: '/' },
        { filePath: '/a.ts', packageName: 'a', packageRoot: '/' },
        { filePath: '/z.ts', packageName: 'z', packageRoot: '/' },
      ]).map(file => file.filePath),
    ).toEqual(['/a.ts', '/z.ts']);
  });
});
