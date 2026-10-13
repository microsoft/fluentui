import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

import * as fg from 'fast-glob';

import { discoverSourceFiles, filterSourceFiles } from './file-discovery';

jest.mock('node:child_process', () => ({
  execSync: jest.fn(),
}));

jest.mock('fast-glob', () => ({
  ...jest.requireActual('fast-glob'),
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

    it('should report an actionable error when git discovery fails', () => {
      mockExecSync.mockImplementation(() => {
        throw Object.assign(new Error('Git access denied'), {
          status: 128,
          stderr: 'fatal: detected dubious ownership in repository',
        });
      });

      expect(() => discoverSourceFiles('/mock/root')).toThrow(/git.*\/mock\/root.*Git access denied/i);
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

    it('discovers a child path inside a parent Git repository', () => {
      const root = fs.mkdtempSync(path.join(os.tmpdir(), 'fluentui-usage-git-'));
      const child = path.join(root, 'apps', 'consumer');
      try {
        fs.mkdirSync(path.join(child, 'src'), { recursive: true });
        fs.writeFileSync(path.join(child, 'src', 'App.tsx'), 'export const App = 1;\n');
        const realExecSync = jest.requireActual<typeof import('node:child_process')>('node:child_process').execSync;
        realExecSync('git init -q', { cwd: root });
        mockExecSync.mockImplementation((command, options) => realExecSync(command, options as never));

        expect(discoverSourceFiles(child)).toEqual([path.join(child, 'src', 'App.tsx')]);
      } finally {
        fs.rmSync(root, { recursive: true, force: true });
      }
    });

    it('discovers source in a non-Git directory while respecting nested gitignore rules', () => {
      const root = fs.mkdtempSync(path.join(os.tmpdir(), 'fluentui-usage-nongit-'));
      try {
        for (const directory of ['src', 'src/nested', 'build', 'node_modules/lib', '.git']) {
          fs.mkdirSync(path.join(root, directory), { recursive: true });
        }
        fs.writeFileSync(path.join(root, '.gitignore'), 'build/\nsrc/ignored.ts\n');
        fs.writeFileSync(path.join(root, 'src', 'nested', '.gitignore'), '*.ts\n!keep.ts\n');
        for (const file of [
          'src/App.tsx',
          'src/ignored.ts',
          'src/types.d.ts',
          'src/nested/keep.ts',
          'src/nested/skip.ts',
          'build/generated.ts',
          'node_modules/lib/index.ts',
          '.git/hidden.ts',
        ]) {
          fs.writeFileSync(path.join(root, file), 'export const value = 1;\n');
        }
        const realExecSync = jest.requireActual<typeof import('node:child_process')>('node:child_process').execSync;
        mockExecSync.mockImplementation((command, options) => realExecSync(command, options as never));

        expect(discoverSourceFiles(root).sort()).toEqual(
          [path.join(root, 'src', 'App.tsx'), path.join(root, 'src', 'nested', 'keep.ts')].sort(),
        );
      } finally {
        fs.rmSync(root, { recursive: true, force: true });
      }
    });

    it('discovers source when the Git executable is unavailable', () => {
      const root = fs.mkdtempSync(path.join(os.tmpdir(), 'fluentui-usage-no-git-'));
      try {
        fs.writeFileSync(path.join(root, 'App.tsx'), 'export const App = 1;\n');
        mockExecSync.mockImplementation(() => {
          throw Object.assign(new Error('git: command not found'), {
            status: 127,
            stderr: 'sh: git: command not found',
          });
        });

        expect(discoverSourceFiles(root)).toEqual([path.join(root, 'App.tsx')]);
      } finally {
        fs.rmSync(root, { recursive: true, force: true });
      }
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

    it('should compare Windows paths using glob-style separators', () => {
      const windowsStyleFiles = ['/project/src\\App.tsx', '/project/test\\App.test.tsx'];
      mockGlobSync.mockReturnValueOnce(['src/App.tsx']);

      const result = filterSourceFiles(windowsStyleFiles, ROOT, ['src/**']);

      expect(result).toEqual(['/project/src\\App.tsx']);
    });
  });
});
