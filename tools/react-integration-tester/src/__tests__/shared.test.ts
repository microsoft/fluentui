import { TempFs } from './fixtures/temp-fs';
import { getMergedTemplate, getPreparedTemplate, runCmd, readCommandsFromPreparedProject } from '../shared';
import { join } from 'node:path';

describe('shared module', () => {
  const origCwd = process.cwd();
  let fs: TempFs;

  afterEach(() => {
    process.chdir(origCwd);
    if (fs) {
      fs.cleanup();
      // @ts-expect-error reset ref for safety
      fs = undefined;
    }
    jest.restoreAllMocks();
  });

  describe('getMergedTemplate', () => {
    test('returns built-in template when no configPath provided', () => {
      const merged = getMergedTemplate(18, '');
      // Basic shape checks
      expect(merged.commands).toHaveProperty('e2e');
      expect(merged.commands).toHaveProperty('test');
      expect(merged.commands).toHaveProperty('type-check');
      expect(merged.dependencies).toHaveProperty('react');
      expect(merged.dependencies).toHaveProperty('typescript');
    });

    test('applies overrides from config, including typeCheck -> type-check mapping and dependency merge', () => {
      fs = new TempFs('rit-shared-merged-overrides');
      process.chdir(fs.tempDir);
      const cfgPath = join(fs.tempDir, 'rit.config.js');
      fs.createFileSync(
        'rit.config.js',
        [
          'module.exports = {',
          '  react: {',
          '    "18": {',
          '      commands: {',
          "        typeCheck: 'tsc -p tsconfig.json --pretty',",
          "        test: 'jest --runInBand',",
          '      },',
          "      dependencies: { react: '18.100.0', '@types/react': '18.100.0', 'left-pad': '1.3.0' }",
          '    }',
          '  }',
          '};',
        ].join('\n'),
      );

      const merged = getMergedTemplate(18, cfgPath);
      expect(merged.commands['type-check']).toBe('tsc -p tsconfig.json --pretty');
      expect(merged.commands['test']).toBe('jest --runInBand');
      // Built-in e2e should remain unless explicitly overridden
      expect(merged.commands).toHaveProperty('e2e');
      // Dependencies are merged and allow overrides
      expect(merged.dependencies['react']).toBe('18.100.0');
      expect(merged.dependencies['left-pad']).toBe('1.3.0');
    });
  });

  describe('getPreparedTemplate', () => {
    const dummyPaths = (overrides?: Partial<{ jestConfig: string | null; cypressConfig: string | null }>) => ({
      packageJson: '/tmp/pkg.json',
      tsConfig: '/tmp/tsconfig.json',
      jestConfig:
        overrides && Object.prototype.hasOwnProperty.call(overrides, 'jestConfig')
          ? (overrides.jestConfig as string | null)
          : '/tmp/jest.config.js',
      cypressConfig:
        overrides && Object.prototype.hasOwnProperty.call(overrides, 'cypressConfig')
          ? (overrides.cypressConfig as string | null)
          : '/tmp/cypress.config.js',
    });

    test('keeps all commands when both setups exist', () => {
      const prepared = getPreparedTemplate(18, '', dummyPaths());
      expect(prepared.hasJestSetup).toBe(true);
      expect(prepared.hasCypressSetup).toBe(true);
      expect(prepared.commands).toHaveProperty('test');
      expect(prepared.commands).toHaveProperty('e2e');
      expect(prepared.commands).toHaveProperty('type-check');
    });

    test('filters out e2e when no cypress setup', () => {
      const prepared = getPreparedTemplate(18, '', dummyPaths({ cypressConfig: null }));
      expect(prepared.hasCypressSetup).toBe(false);
      expect(prepared.commands).not.toHaveProperty('e2e');
      expect(prepared.commands).toHaveProperty('test');
    });

    test('filters out test when no jest setup', () => {
      const prepared = getPreparedTemplate(18, '', dummyPaths({ jestConfig: null }));
      expect(prepared.hasJestSetup).toBe(false);
      expect(prepared.commands).not.toHaveProperty('test');
      expect(prepared.commands).toHaveProperty('e2e');
    });
  });

  describe('runCmd', () => {
    test('resolves on exit code 0', async () => {
      fs = new TempFs('rit-shared-runcmd-success');
      process.chdir(fs.tempDir);
      await expect(runCmd('node -e "process.exit(0)"', { cwd: fs.tempDir })).resolves.toBeUndefined();
    });

    test('rejects on non-zero exit code', async () => {
      fs = new TempFs('rit-shared-runcmd-fail');
      process.chdir(fs.tempDir);
      await expect(runCmd('node -e "process.exit(2)"', { cwd: fs.tempDir })).rejects.toThrow(
        /Command failed with exit code 2/,
      );
    });
  });

  describe('readCommandsFromPreparedProject', () => {
    test('returns only known commands and warns for missing ones', () => {
      fs = new TempFs('rit-shared-readcmds');
      process.chdir(fs.tempDir);
      const pkg = {
        name: 'test-proj',
        private: true,
        version: '0.0.0',
        scripts: {
          test: 'jest',
          'type-check': 'tsc -p tsconfig.json',
          // intentionally leave out e2e
          build: 'tsc -b',
        },
      };
      fs.createFileSync('package.json', JSON.stringify(pkg, null, 2));

      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      const result = readCommandsFromPreparedProject(fs.tempDir);
      expect(result).toEqual({ test: 'jest', 'type-check': 'tsc -p tsconfig.json' });
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Warning: The following commands are not available in the prepared project:'),
      );
    });

    test('no warning when all known commands present', () => {
      fs = new TempFs('rit-shared-readcmds-all');
      process.chdir(fs.tempDir);
      const pkg = {
        name: 'test-proj',
        private: true,
        version: '0.0.0',
        scripts: {
          test: 'jest',
          'type-check': 'tsc -p tsconfig.json',
          e2e: 'cypress run --component',
        },
      };
      fs.createFileSync('package.json', JSON.stringify(pkg, null, 2));

      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      const result = readCommandsFromPreparedProject(fs.tempDir);
      expect(result).toEqual({ test: 'jest', 'type-check': 'tsc -p tsconfig.json', e2e: 'cypress run --component' });
      expect(warnSpy).not.toHaveBeenCalled();
    });
  });
});
