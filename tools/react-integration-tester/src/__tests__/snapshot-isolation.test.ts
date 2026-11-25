import { TempFs } from './fixtures/temp-fs';
import { join, relative, resolve, sep } from 'node:path';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { spawn, spawnSync } from 'node:child_process';
import * as ejs from 'ejs';

const templatesDir = resolve(__dirname, '../files');
const jestBin = require.resolve('jest/bin/jest');
const repoNodeModules = resolve(__dirname, '../../../../node_modules');
const testFilesCount = 30;

function renderTemplate(name: string, data: Record<string, unknown>, outFile: string) {
  const templatePath = join(templatesDir, `${name}.template`);
  writeFileSync(outFile, ejs.render(readFileSync(templatePath, 'utf-8'), data, { filename: templatePath }));
}

function snapshotContent(i: number) {
  return `// Jest Snapshot v1, https://jestjs.io/docs/snapshot-testing\n\nexports[\`case ${i} 1\`] = \`"value"\`;\n`;
}

function snapshotPath(projectRoot: string, i: number) {
  return join(projectRoot, 'src', `case${i}`, '__snapshots__', `case${i}.test.js.snap`);
}

function createOriginProject(workspaceRoot: string) {
  const projectRoot = join(workspaceRoot, 'proj');
  writeFileSync(join(workspaceRoot, 'jest.preset.js'), 'module.exports = {};');
  writeFileSync(join(workspaceRoot, 'tsconfig.base.json'), JSON.stringify({ compilerOptions: { paths: {} } }));
  mkdirSync(projectRoot, { recursive: true });
  writeFileSync(
    join(projectRoot, 'jest.config.js'),
    `module.exports = { testEnvironment: 'node', transform: {}, modulePathIgnorePatterns: ['<rootDir>/dist/'] };`,
  );

  for (let i = 0; i < testFilesCount; i++) {
    const testDir = join(projectRoot, 'src', `case${i}`);
    mkdirSync(join(testDir, '__snapshots__'), { recursive: true });
    writeFileSync(
      join(testDir, `case${i}.test.js`),
      `test('case ${i}', () => { expect('value').toMatchSnapshot(); expect(${i}).toBe(${i}); });\n`,
    );
    writeFileSync(snapshotPath(projectRoot, i), snapshotContent(i));
  }

  return projectRoot;
}

function scaffoldProject(workspaceRoot: string, projectRoot: string, react: number) {
  const reactRoot = join(workspaceRoot, 'tmp/rit', `react-${react}`);
  const projectPath = join(reactRoot, `proj-react-${react}-ci`);
  mkdirSync(projectPath, { recursive: true });

  // forward slashes keep Windows paths valid inside the generated JS string literals
  const toPosixRelative = (from: string, to: string) => relative(from, to).split(sep).join('/');
  const tmpl = {
    react,
    relativePathToProjectRoot: toPosixRelative(projectPath, projectRoot),
    relativePathToWorkspaceRoot: toPosixRelative(projectPath, workspaceRoot),
    usedNodeModulesDirRelative: toPosixRelative(projectPath, reactRoot),
    jest: { pathToProjectConfig: 'jest.config.js' },
  };
  renderTemplate('jest.config.js', tmpl, join(projectPath, 'jest.config.js'));
  renderTemplate('jest.mock-snapshots.js', tmpl, join(projectPath, 'jest.mock-snapshots.js'));
  renderTemplate('jest.snapshot-resolver.js', tmpl, join(projectPath, 'jest.snapshot-resolver.js'));

  return projectPath;
}

function runJest(projectPath: string) {
  return new Promise<{ code: number | null; output: string }>(resolvePromise => {
    const child = spawn(
      process.execPath,
      [jestBin, '--config', join(projectPath, 'jest.config.js'), '--passWithNoTests', '-u', '--no-cache', '-w', '2'],
      {
        cwd: projectPath,
        // pin default (mocked) mode so an inherited RIT_SKIP_SNAPSHOTS=false can't disable isolation
        env: { ...process.env, NODE_PATH: repoNodeModules, FORCE_COLOR: '0', RIT_SKIP_SNAPSHOTS: 'true' },
      },
    );
    let output = '';
    child.stdout.on('data', chunk => (output += chunk));
    child.stderr.on('data', chunk => (output += chunk));
    child.on('exit', code => resolvePromise({ code, output }));
  });
}

function loadGeneratedConfig(projectPath: string, skipSnapshots: string | undefined) {
  const env: NodeJS.ProcessEnv = { ...process.env, NODE_PATH: repoNodeModules };
  delete env['RIT_SKIP_SNAPSHOTS'];
  if (skipSnapshots !== undefined) {
    env['RIT_SKIP_SNAPSHOTS'] = skipSnapshots;
  }
  const result = spawnSync(
    process.execPath,
    ['-e', 'process.stdout.write(JSON.stringify(require(process.argv[1])))', join(projectPath, 'jest.config.js')],
    { env, encoding: 'utf-8' },
  );
  if (result.status !== 0) {
    throw new Error(result.stderr);
  }
  return JSON.parse(result.stdout) as {
    snapshotResolver?: string;
    modulePathIgnorePatterns?: string[];
    coverageDirectory?: string;
  };
}

describe('jest snapshot isolation', () => {
  let fs: TempFs;

  afterEach(() => {
    fs?.cleanup();
  });

  test('resolver maps origin tests into scaffold-local snapshots and back', () => {
    fs = new TempFs('rit-snapshot-resolver');
    const projectRoot = createOriginProject(fs.tempDir);
    const projectPath = scaffoldProject(fs.tempDir, projectRoot, 18);
    const resolver = jest.requireActual(join(projectPath, 'jest.snapshot-resolver.js'));

    const testPath = join(projectRoot, 'src/case0/case0.test.js');
    const outsideTestPath = join(fs.tempDir, 'other/outside.test.js');

    expect(resolver.resolveSnapshotPath(testPath, '.snap')).toBe(
      join(projectPath, 'snapshots/src/case0/case0.test.js.snap'),
    );
    const reservedMarkerPaths = [
      join(projectRoot, 'src/__rit_parent__/marker.test.js'),
      join(projectRoot, 'src/__rit___rit_parent__/escaped.test.js'),
      join(projectRoot, 'src/__rit_other/prefixed.test.js'),
      join(fs.tempDir, '__rit_parent__/outside-marker.test.js'),
    ];

    for (const path of [testPath, outsideTestPath, resolver.testPathForConsistencyCheck, ...reservedMarkerPaths]) {
      const resolvedSnapshot = resolver.resolveSnapshotPath(path, '.snap');
      expect(resolvedSnapshot.startsWith(join(projectPath, 'snapshots'))).toBe(true);
      expect(resolver.resolveTestPath(resolvedSnapshot, '.snap')).toBe(path);
    }
  });

  test('isolates snapshots by default, keeps coverage scaffold-local, and restores origin snapshots on opt-in', () => {
    fs = new TempFs('rit-snapshot-config');
    const projectRoot = createOriginProject(fs.tempDir);
    const projectPath = scaffoldProject(fs.tempDir, projectRoot, 18);

    const mocked = loadGeneratedConfig(projectPath, undefined);
    expect(mocked.snapshotResolver).toBe(join(projectPath, 'jest.snapshot-resolver.js'));
    expect(mocked.modulePathIgnorePatterns).toEqual(['<rootDir>/dist/', '\\.snap$']);
    expect(mocked.coverageDirectory).toBe(join(projectPath, 'coverage'));

    const optIn = loadGeneratedConfig(projectPath, 'false');
    expect(optIn.snapshotResolver).toBeUndefined();
    expect(optIn.modulePathIgnorePatterns).toEqual(['<rootDir>/dist/']);
    expect(optIn.coverageDirectory).toBe(join(projectPath, 'coverage'));
  });

  test('concurrent `jest -u` runs for multiple React versions never touch origin snapshots', async () => {
    fs = new TempFs('rit-snapshot-race');
    const projectRoot = createOriginProject(fs.tempDir);
    const projectPaths = [17, 18].map(react => scaffoldProject(fs.tempDir, projectRoot, react));

    for (let round = 0; round < 2; round++) {
      const results = await Promise.all(projectPaths.map(projectPath => runJest(projectPath)));

      for (const result of results) {
        expect(result.output).not.toContain('ENOENT');
        expect(result.output).toContain(`Tests:       ${testFilesCount} passed`);
        expect(result.code).toBe(0);
      }
      for (let i = 0; i < testFilesCount; i++) {
        expect(readFileSync(snapshotPath(projectRoot, i), 'utf-8')).toBe(snapshotContent(i));
      }
      for (const projectPath of projectPaths) {
        expect(existsSync(join(projectPath, 'snapshots')) ? readdirSync(join(projectPath, 'snapshots')) : []).toEqual(
          [],
        );
      }
    }
  }, 60_000);
});
