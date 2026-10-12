import { type ExecutorContext } from '@nx/devkit';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

import executor from './executor';
import { type VisualRegressionExecutorSchema } from './schema';

jest.mock('node:child_process', () => ({
  ...jest.requireActual('node:child_process'),
  spawnSync: jest.fn(),
}));

const spawnMock = spawnSync as jest.MockedFunction<typeof spawnSync>;
const hostRoot = 'apps/vr-tests-react-components';
const storybookPath = `${hostRoot}/dist/visual-regression/react-button-vrt/storybook`;
const outputPath = `${hostRoot}/dist/visual-regression/react-button-vrt/screenshots`;

describe('Visual regression executor', () => {
  let root: string;
  let context: ExecutorContext;

  beforeEach(() => {
    root = mkdtempSync(join(tmpdir(), 'visual-regression-'));
    const configPath = join(root, hostRoot, '.storybook');
    mkdirSync(configPath, { recursive: true });
    writeFileSync(
      join(configPath, 'main.js'),
      "module.exports = { stories: ['../src/**/*.stories.tsx'], webpackFinal: () => 'original webpack' };\n",
    );
    writeFileSync(join(configPath, 'preview.js'), 'export const parameters = { layout: "none" };\n');
    writeFileSync(join(configPath, 'manager.js'), 'export const addons = [];\n');
    context = {
      root,
      cwd: root,
      isVerbose: false,
      projectName: 'react-button',
      nxJsonConfiguration: {},
      projectGraph: { nodes: {}, dependencies: {} },
    } as ExecutorContext;
    spawnMock.mockReset();
    spawnMock.mockReturnValue({ status: 0 } as ReturnType<typeof spawnSync>);
  });

  afterEach(() => {
    rmSync(root, { recursive: true, force: true });
  });

  it('builds selected host stories with the original main, preview and manager config', async () => {
    const options: VisualRegressionExecutorSchema = {
      mode: 'build',
      hostRoot,
      stories: ['src/stories/Button/**/*.stories.tsx'],
      outputPath: storybookPath,
    };

    expect(await executor(options, context)).toEqual({ success: true });

    const configPath = join(root, dirname(storybookPath), 'config');
    const main = require(join(configPath, 'main.js'));
    expect(main.stories).toEqual([join(root, hostRoot, 'src/stories/Button/**/*.stories.tsx')]);
    expect(main.webpackFinal()).toBe('original webpack');
    expect(readFileSync(join(configPath, 'preview.js'), 'utf8')).toContain(
      join(root, hostRoot, '.storybook/preview.js'),
    );
    expect(readFileSync(join(configPath, 'manager.js'), 'utf8')).toContain(
      join(root, hostRoot, '.storybook/manager.js'),
    );
    expect(spawnMock).toHaveBeenCalledWith(
      'yarn',
      ['run', '-T', 'storybook', 'build', '--config-dir', configPath, '--output-dir', join(root, storybookPath)],
      { cwd: join(root, hostRoot), stdio: 'inherit', shell: false },
    );
    expect(readFileSync(join(root, hostRoot, '.storybook/main.js'), 'utf8')).toContain('../src/**/*.stories.tsx');
  });

  it('uses an explicit preview-only preset instead of the host docs addon', async () => {
    const annotation = '.storybook/preview-granular.ts';
    const result = await executor(
      {
        mode: 'build',
        hostRoot,
        stories: ['src/stories/Button/**/*.stories.tsx'],
        outputPath: storybookPath,
        addons: [],
        previewAnnotations: [annotation],
      },
      context,
    );

    expect(result).toEqual({ success: true });
    const main = require(join(root, dirname(storybookPath), 'config/main.js'));
    expect(main.addons).toEqual([]);
    expect(main.previewAnnotations(['existing-preview'])).toEqual([
      'existing-preview',
      join(root, hostRoot, annotation),
    ]);
  });

  it('cleans only capture output and invokes StoryWright with the original capture options', async () => {
    const oldScreenshot = join(root, outputPath, 'old.png');
    mkdirSync(dirname(oldScreenshot), { recursive: true });
    writeFileSync(oldScreenshot, 'stale');
    mkdirSync(join(root, storybookPath), { recursive: true });
    const options: VisualRegressionExecutorSchema = {
      mode: 'capture',
      hostRoot,
      storybookPath,
      outputPath,
      concurrency: 2,
    };

    expect(await executor(options, context)).toEqual({ success: true });
    expect(existsSync(oldScreenshot)).toBe(false);
    expect(existsSync(join(root, storybookPath))).toBe(true);
    expect(spawnMock).toHaveBeenCalledWith(
      'yarn',
      [
        'run',
        '-T',
        'storywright',
        '--browsers',
        'chromium',
        '--url',
        join(root, storybookPath),
        '--destpath',
        join(root, outputPath),
        '--waitTimeScreenshot',
        '500',
        '--concurrency',
        '2',
        '--headless',
        'true',
        '--bailOnStoriesError',
        '--stepsApi',
        'parameters',
      ],
      { cwd: join(root, hostRoot), stdio: 'inherit', shell: false },
    );
  });

  it('propagates a failed process and defaults capture concurrency to one', async () => {
    spawnMock.mockReturnValue({ status: 1 } as ReturnType<typeof spawnSync>);

    expect(await executor({ mode: 'capture', hostRoot, storybookPath, outputPath }, context)).toEqual({
      success: false,
    });
    expect(spawnMock.mock.calls[0][1]).toContain('1');
  });

  it('does not follow a symlinked output parent into source files', async () => {
    const sourcePath = join(root, hostRoot, 'src');
    mkdirSync(sourcePath);
    writeFileSync(join(sourcePath, 'screenshots'), 'source');
    const groupPath = join(root, hostRoot, 'dist', 'visual-regression');
    mkdirSync(groupPath, { recursive: true });
    symlinkSync(sourcePath, join(groupPath, 'react-button-vrt'));

    expect(await executor({ mode: 'capture', hostRoot, storybookPath, outputPath }, context)).toEqual({
      success: false,
    });
    expect(existsSync(join(sourcePath, 'screenshots'))).toBe(true);
    expect(spawnMock).not.toHaveBeenCalled();
  });

  it.each([
    { mode: 'capture', hostRoot, storybookPath, outputPath: `${hostRoot}/src` },
    { mode: 'capture', hostRoot, storybookPath, outputPath: '../outside' },
    { mode: 'capture', hostRoot: '../outside', storybookPath, outputPath },
    { mode: 'capture', hostRoot, storybookPath: '/tmp/other', outputPath },
    { mode: 'build', hostRoot, outputPath: storybookPath },
    { mode: 'build', hostRoot, stories: ['../../other/**/*.stories.tsx'], outputPath: storybookPath },
  ] as VisualRegressionExecutorSchema[])(
    'rejects missing or unsafe options before touching files: %j',
    async options => {
      const sourceFile = join(root, hostRoot, 'src', 'keep.txt');
      mkdirSync(dirname(sourceFile), { recursive: true });
      writeFileSync(sourceFile, 'source');

      expect(await executor(options, context)).toEqual({ success: false });
      expect(existsSync(sourceFile)).toBe(true);
      expect(spawnMock).not.toHaveBeenCalled();
    },
  );
});
