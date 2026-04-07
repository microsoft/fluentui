import * as path from 'node:path';
import * as fs from 'node:fs';

import { resolveEntry, readPackageInfo } from './entry-resolver';

const FIXTURES_DIR = path.resolve(__dirname, '../__fixtures__');

describe('resolveEntry', () => {
  it('should resolve from package.json "types" field', () => {
    const result = resolveEntry(undefined, FIXTURES_DIR);

    expect(result).toBe(path.join(FIXTURES_DIR, 'sample-button.d.ts'));
    expect(fs.existsSync(result)).toBe(true);
  });

  it('should accept an explicit entry override', () => {
    const entryPath = path.join(FIXTURES_DIR, 'sample-button.d.ts');
    const result = resolveEntry(entryPath);

    expect(result).toBe(entryPath);
  });

  it('should resolve from package.json when entry override is a directory', () => {
    const result = resolveEntry(FIXTURES_DIR);

    expect(result).toBe(path.join(FIXTURES_DIR, 'sample-button.d.ts'));
  });

  it('should throw when explicit entry does not exist', () => {
    expect(() => resolveEntry('/nonexistent/file.d.ts')).toThrow('Entry file not found');
  });

  it('should throw when no package.json is found', () => {
    expect(() => resolveEntry(undefined, '/')).toThrow('Could not find package.json');
  });
});

describe('readPackageInfo', () => {
  it('should read name and version from package.json', () => {
    const info = readPackageInfo(FIXTURES_DIR);

    expect(info.name).toBe('@fluentui/sample-button');
    expect(info.version).toBe('1.0.0');
  });

  it('should return defaults when no package.json found', () => {
    const info = readPackageInfo('/');

    expect(info.name).toBe('unknown');
    expect(info.version).toBe('0.0.0');
  });
});
