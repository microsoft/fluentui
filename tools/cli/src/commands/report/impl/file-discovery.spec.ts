import { execSync } from 'node:child_process';

import * as fg from 'fast-glob';

import { discoverSourceFiles, filterSourceFiles } from './file-discovery';

jest.mock('node:child_process', () => ({
  execSync: jest.fn(),
}));

jest.mock('fast-glob', () => ({
  globSync: jest.fn(),
}));

const mockExecSync = execSync as jest.MockedFunction<typeof execSync>;
const mockGlobSync = fg.globSync as jest.MockedFunction<typeof fg.globSync>;

describe('file-discovery', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('discoverSourceFiles', () => {
    it('should return .ts and .tsx files from git ls-files output', () => {
      mockExecSync.mockReturnValue(
        [
          'src/App.tsx',
          'src/utils.ts',
          'src/styles.css',
          'src/index.ts',
          'README.md',
          'package.json',
          'src/types.d.ts',
        ].join('\n') + '\n',
      );

      const files = discoverSourceFiles('/mock/root');

      expect(files).toHaveLength(3);
      expect(files).toEqual(
        expect.arrayContaining([
          expect.stringContaining('App.tsx'),
          expect.stringContaining('utils.ts'),
          expect.stringContaining('index.ts'),
        ]),
      );
    });

    it('should exclude .d.ts declaration files', () => {
      mockExecSync.mockReturnValue('src/types.d.ts\nsrc/globals.d.ts\nsrc/main.ts\n');

      const files = discoverSourceFiles('/mock/root');

      expect(files).toHaveLength(1);
      expect(files[0]).toContain('main.ts');
    });

    it('should return absolute paths', () => {
      mockExecSync.mockReturnValue('src/App.tsx\n');

      const files = discoverSourceFiles('/mock/root');

      expect(files[0]).toMatch(/^\/mock\/root/);
    });

    it('should return empty array on git error', () => {
      mockExecSync.mockImplementation(() => {
        throw new Error('Not a git repository');
      });

      const files = discoverSourceFiles('/mock/root');

      expect(files).toEqual([]);
    });

    it('should handle empty git output', () => {
      mockExecSync.mockReturnValue('');

      const files = discoverSourceFiles('/mock/root');

      expect(files).toEqual([]);
    });

    it('should pass correct git arguments', () => {
      mockExecSync.mockReturnValue('');

      discoverSourceFiles('/mock/root');

      expect(mockExecSync).toHaveBeenCalledWith(
        'git ls-files --cached --others --exclude-standard',
        expect.objectContaining({ cwd: '/mock/root' }),
      );
    });
  });

  describe('filterSourceFiles', () => {
    const ROOT = '/project';
    const files = [
      '/project/src/App.tsx',
      '/project/src/utils.ts',
      '/project/src/components/Button.tsx',
      '/project/src/components/Input.tsx',
      '/project/test/App.test.tsx',
      '/project/test/utils.test.ts',
    ];

    it('should return all files when no include/exclude is provided', () => {
      expect(filterSourceFiles(files, ROOT)).toEqual(files);
    });

    it('should return all files when include and exclude are empty arrays', () => {
      expect(filterSourceFiles(files, ROOT, [], [])).toEqual(files);
    });

    it('should include only files matching include patterns', () => {
      mockGlobSync.mockReturnValueOnce(['src/components/Button.tsx', 'src/components/Input.tsx']);

      const result = filterSourceFiles(files, ROOT, ['src/components/**']);

      expect(mockGlobSync).toHaveBeenCalledWith(
        ['src/components/**'],
        expect.objectContaining({ cwd: ROOT, dot: true, onlyFiles: true }),
      );
      expect(result).toHaveLength(2);
      expect(result).toEqual(['/project/src/components/Button.tsx', '/project/src/components/Input.tsx']);
    });

    it('should support multiple include patterns', () => {
      mockGlobSync.mockReturnValueOnce(['src/App.tsx', 'src/components/Button.tsx', 'src/components/Input.tsx']);

      const result = filterSourceFiles(files, ROOT, ['src/App.tsx', 'src/components/**']);

      expect(result).toHaveLength(3);
    });

    it('should exclude files matching exclude patterns', () => {
      mockGlobSync.mockReturnValueOnce(['test/App.test.tsx', 'test/utils.test.ts']);

      const result = filterSourceFiles(files, ROOT, undefined, ['test/**']);

      expect(result).toHaveLength(4);
      expect(result.every(f => !f.includes('/test/'))).toBe(true);
    });

    it('should support wildcard exclude patterns', () => {
      mockGlobSync.mockReturnValueOnce(['test/App.test.tsx', 'test/utils.test.ts']);

      const result = filterSourceFiles(files, ROOT, undefined, ['**/*.test.*']);

      expect(result).toHaveLength(4);
      expect(result.every(f => !f.includes('.test.'))).toBe(true);
    });

    it('should apply both include and exclude together', () => {
      // include call
      mockGlobSync.mockReturnValueOnce([
        'src/App.tsx',
        'src/utils.ts',
        'src/components/Button.tsx',
        'src/components/Input.tsx',
      ]);
      // exclude call
      mockGlobSync.mockReturnValueOnce(['src/utils.ts']);

      const result = filterSourceFiles(files, ROOT, ['src/**'], ['src/utils.ts']);

      expect(result).toHaveLength(3);
      expect(result).not.toContain('/project/src/utils.ts');
    });

    it('should return empty when include matches nothing from discovered files', () => {
      mockGlobSync.mockReturnValueOnce([]);

      const result = filterSourceFiles(files, ROOT, ['nonexistent/**']);

      expect(result).toEqual([]);
    });

    it('should support extension-based patterns', () => {
      mockGlobSync.mockReturnValueOnce([
        'src/App.tsx',
        'src/components/Button.tsx',
        'src/components/Input.tsx',
        'test/App.test.tsx',
      ]);

      const result = filterSourceFiles(files, ROOT, ['**/*.tsx']);

      expect(result).toHaveLength(4);
      expect(result.every(f => f.endsWith('.tsx'))).toBe(true);
    });
  });
});
