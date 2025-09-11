import { TempFs } from './fixtures/temp-fs';
import { join, resolve } from 'node:path';
import { mkdirSync, write, writeFileSync } from 'node:fs';

import type { Logger } from '../logger';
import type { Args } from '../shared';

// Minimal logger stub
const logger: Logger = {
  log: () => {},
  info: () => {},
  warn: () => {},
  error: () => {},
  verbose: () => {},
};

function mockGitRoot(root: string) {
  // setup.ts may import either 'node:child_process' or 'child_process', mock both
  jest.doMock('node:child_process', () => {
    const actual = jest.requireActual('node:child_process');
    return { ...actual, execSync: () => Buffer.from(root) };
  });
  jest.doMock('child_process', () => {
    const actual = jest.requireActual('child_process');
    return { ...actual, execSync: () => Buffer.from(root) };
  });
}

async function loadModule() {
  return new Promise<typeof import('../setup')>(resolve => {
    jest.isolateModules(() => {
      const mod = import('../setup');
      resolve(mod);
    });
  });
}

describe('setup()', () => {
  let fs: TempFs;

  afterEach(() => {
    if (fs) {
      fs.cleanup();
      // @ts-expect-error reset
      fs = undefined;
    }
    jest.resetModules();
    jest.restoreAllMocks();
  });

  test('reuses existing prepared project when projectId is provided and scaffold exists', async () => {
    fs = new TempFs('rit-setup-reuse');

    // Origin project (CWD)
    const originPkg = { name: '@scope/origin-proj' };
    writeFileSync(join(fs.tempDir, 'package.json'), JSON.stringify(originPkg));
    writeFileSync(join(fs.tempDir, 'tsconfig.lib.json'), JSON.stringify({ extends: './tsconfig.json' }));

    mockGitRoot(fs.tempDir);

    // React root with node_modules present to satisfy dependency guard
    const reactRoot = join(fs.tempDir, 'tmp/rit/react-18');
    mkdirSync(join(reactRoot, 'node_modules'), { recursive: true });
    writeFileSync(join(reactRoot, 'package.json'), JSON.stringify({}));

    // Prepared project under tmp/rit/react-18/origin-proj-react-18-abc123
    const preparedPath = join(reactRoot, 'origin-proj-react-18-abc123');
    mkdirSync(preparedPath, { recursive: true });
    writeFileSync(
      join(preparedPath, 'package.json'),
      JSON.stringify(
        {
          name: 'origin-proj-react-18-abc123',
          private: true,
          version: '0.0.0',
          scripts: {
            test: 'jest',
            'type-check': 'tsc -p tsconfig.json',
            e2e: 'cypress run --component',
          },
        },
        null,
        2,
      ),
    );

    const { setup } = await loadModule();

    const args: Required<Args> = {
      react: 18,
      configPath: '',
      run: ['test'],
      verbose: false,
      cleanup: true,
      cwd: fs.tempDir,
      prepareOnly: false,
      noInstall: false,
      installDeps: false,
      projectId: 'abc123',
      force: false,
    };

    const project = await setup(args, logger);
    expect(project.projectPath).toBe(preparedPath);
    expect(project.commands).toMatchObject({
      test: 'jest',
      'type-check': 'tsc -p tsconfig.json',
      e2e: 'cypress run --component',
    });
    expect(typeof project.cleanup).toBe('function');
    project.cleanup();
  });

  test('throws precise error when projectId provided but prepared project is missing', async () => {
    fs = new TempFs('rit-setup-reuse-missing');
    writeFileSync(join(fs.tempDir, 'package.json'), JSON.stringify({ name: '@scope/origin-proj' }));
    writeFileSync(join(fs.tempDir, 'tsconfig.lib.json'), JSON.stringify({ extends: './tsconfig.json' }));
    mockGitRoot(fs.tempDir);

    // Ensure react root has node_modules so missing project triggers original missing package error path
    mkdirSync(join(fs.tempDir, 'tmp/rit/react-18/node_modules'), { recursive: true });
    writeFileSync(join(fs.tempDir, 'tmp/rit/react-18/package.json'), JSON.stringify({}));

    const { setup } = await loadModule();

    const args: Required<Args> = {
      react: 18,
      configPath: '',
      run: ['test'],
      verbose: false,
      cleanup: true,
      cwd: fs.tempDir,
      prepareOnly: false,
      noInstall: false,
      installDeps: false,
      projectId: 'abc123',
      force: false,
    };

    const expectedPkgPath = join(fs.tempDir, 'tmp/rit/react-18/origin-proj-react-18-abc123/package.json');
    await expect(setup(args, logger)).rejects.toThrow(
      `No package.json found in prepared project at: ${expectedPkgPath}. Re-run preparation with a supported template.`,
    );
  });

  test('generates templates (tsconfig, jest, swc, cypress) and installs when normal run and node_modules missing', async () => {
    fs = new TempFs('rit-setup-generate-install');

    const originPkg = { name: '@scope/origin-proj' };
    writeFileSync(join(fs.tempDir, 'package.json'), JSON.stringify(originPkg));
    writeFileSync(
      join(fs.tempDir, 'tsconfig.lib.json'),
      JSON.stringify({ include: ['src/index.ts'], compilerOptions: { target: 'ES2020', lib: ['ES2020', 'DOM'] } }),
    );
    writeFileSync(join(fs.tempDir, 'jest.config.js'), 'module.exports = {};');
    writeFileSync(join(fs.tempDir, 'cypress.config.ts'), 'export default {};');

    mockGitRoot(fs.tempDir);

    let runCmdMock: any;
    jest.doMock('../shared', () => {
      const actual = jest.requireActual('../shared');
      runCmdMock = jest.fn().mockResolvedValue(undefined);
      return { ...actual, runCmd: runCmdMock };
    });

    const { setup } = await loadModule();

    const args: Required<Args> = {
      react: 18,
      configPath: '',
      run: ['test'],
      verbose: false,
      cleanup: true,
      cwd: fs.tempDir,
      prepareOnly: false,
      noInstall: false,
      installDeps: false,
      projectId: '',
      force: false,
    };

    const project = await setup(args, logger);
    expect(project.commands).toHaveProperty('test');
    expect(project.commands).toHaveProperty('e2e');
    expect(project.commands).toHaveProperty('type-check');

    const expectedFiles = [
      'tsconfig.json',
      'jest.config.js',
      '.swcrc',
      'cypress.config.ts',
      'tsconfig.cy.json',
      'package.json',
    ];
    for (const f of expectedFiles) {
      expect(require('fs').existsSync(join(project.projectPath, f))).toBe(true);
    }

    const generatedPkg = JSON.parse(require('fs').readFileSync(join(project.projectPath, 'package.json'), 'utf-8'));
    for (const val of Object.values(generatedPkg.scripts ?? {})) {
      expect(String(val).startsWith('node ')).toBe(true);
      expect(String(val)).toContain('node_modules/.bin');
    }

    expect(runCmdMock).toHaveBeenCalled();
    expect(runCmdMock).toHaveBeenCalledWith(
      expect.stringContaining('yarn install'),
      expect.objectContaining({ cwd: expect.stringContaining('tmp/rit/react-18') }),
    );
  });

  test('prepare-only installs when not using --no-install', async () => {
    fs = new TempFs('rit-setup-prepare-only-install');
    writeFileSync(join(fs.tempDir, 'package.json'), JSON.stringify({ name: '@scope/origin-proj' }));
    writeFileSync(join(fs.tempDir, 'tsconfig.lib.json'), JSON.stringify({ include: ['src/index.ts'] }));
    mockGitRoot(fs.tempDir);

    let runCmdMock: any;
    jest.doMock('../shared', () => {
      const actual = jest.requireActual('../shared');
      runCmdMock = jest.fn().mockResolvedValue(undefined);
      return { ...actual, runCmd: runCmdMock };
    });
    const { setup } = await loadModule();

    const args: Required<Args> = {
      react: 18,
      configPath: '',
      run: [],
      verbose: false,
      cleanup: true,
      cwd: fs.tempDir,
      prepareOnly: true,
      noInstall: false,
      installDeps: false,
      projectId: '',
      force: false,
    };

    const project = await setup(args, logger);
    expect(runCmdMock).toHaveBeenCalledWith(
      expect.stringContaining('yarn install'),
      expect.objectContaining({ cwd: expect.stringContaining('tmp/rit/react-18') }),
    );
    expect(require('fs').existsSync(join(project.projectPath, 'tsconfig.json'))).toBe(true);
  });

  test('normal run does not install when node_modules exists at react root', async () => {
    fs = new TempFs('rit-setup-no-install-when-present');
    writeFileSync(join(fs.tempDir, 'package.json'), JSON.stringify({ name: '@scope/origin-proj' }));
    writeFileSync(join(fs.tempDir, 'tsconfig.lib.json'), JSON.stringify({ include: ['src/index.ts'] }));
    mockGitRoot(fs.tempDir);

    const reactRoot = join(fs.tempDir, 'tmp/rit/react-18');
    mkdirSync(join(reactRoot, 'node_modules'), { recursive: true });
    writeFileSync(join(reactRoot, 'package.json'), JSON.stringify({}));

    let runCmdMock: any;
    jest.doMock('../shared', () => {
      const actual = jest.requireActual('../shared');
      runCmdMock = jest.fn().mockResolvedValue(undefined);
      return { ...actual, runCmd: runCmdMock };
    });
    const { setup } = await loadModule();

    const args: Required<Args> = {
      react: 18,
      configPath: '',
      run: ['type-check'],
      verbose: false,
      cleanup: true,
      cwd: fs.tempDir,
      prepareOnly: false,
      noInstall: false,
      installDeps: false,
      projectId: '',
      force: false,
    };

    await setup(args, logger);
    expect(runCmdMock).not.toHaveBeenCalled();
  });

  test('fails reuse run when dependencies missing', async () => {
    fs = new TempFs('rit-setup-reuse-missing-deps');
    writeFileSync(join(fs.tempDir, 'package.json'), JSON.stringify({ name: '@scope/origin-proj' }));
    writeFileSync(join(fs.tempDir, 'tsconfig.lib.json'), JSON.stringify({ include: ['src/index.ts'] }));
    mockGitRoot(fs.tempDir);

    // create prepared project folder WITHOUT node_modules at react root
    const preparedPath = join(fs.tempDir, 'tmp/rit/react-18/origin-proj-react-18-ci');
    mkdirSync(preparedPath, { recursive: true });
    writeFileSync(
      join(preparedPath, 'package.json'),
      JSON.stringify({ name: 'origin-proj-react-18-ci', scripts: { test: 'jest' } }),
    );

    const { setup } = await loadModule();
    const args: Required<Args> = {
      react: 18,
      configPath: '',
      run: ['test'],
      verbose: false,
      cleanup: true,
      cwd: fs.tempDir,
      prepareOnly: false,
      noInstall: false,
      installDeps: false,
      projectId: 'ci',
      force: false,
    };
    await expect(setup(args, logger)).rejects.toThrow(/Aborting run on existing project/);
  });

  test('blocks prepare-only --no-install when deps missing', async () => {
    fs = new TempFs('rit-setup-prepare-only-no-install-missing-deps');
    writeFileSync(join(fs.tempDir, 'package.json'), JSON.stringify({ name: '@scope/origin-proj' }));
    writeFileSync(join(fs.tempDir, 'tsconfig.lib.json'), JSON.stringify({ include: ['src/index.ts'] }));
    mockGitRoot(fs.tempDir);

    const { setup } = await loadModule();
    const args: Required<Args> = {
      react: 18,
      configPath: '',
      run: [],
      verbose: false,
      cleanup: true,
      cwd: fs.tempDir,
      prepareOnly: true,
      noInstall: true,
      installDeps: false,
      projectId: '',
      force: false,
    };
    await expect(setup(args, logger)).rejects.toThrow(/Aborting prepare-only/);
  });
});
