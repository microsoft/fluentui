import { type ExecutorContext, type PromiseExecutor, logger } from '@nx/devkit';
import { spawnSync } from 'node:child_process';
import { existsSync, lstatSync, mkdirSync, writeFileSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import { dirname, isAbsolute, join, relative, sep } from 'node:path';

import { type VisualRegressionExecutorSchema } from './schema';

function isRelativePath(path: unknown): path is string {
  return (
    typeof path === 'string' &&
    path.length > 0 &&
    !isAbsolute(path) &&
    !path.includes('\\') &&
    !path.includes(':') &&
    path.split('/').every(part => part.length > 0 && part !== '.' && part !== '..')
  );
}

function hasSymlink(root: string, path: string): boolean {
  let current = root;
  for (const part of relative(root, path).split(sep)) {
    current = join(current, part);
    if (lstatSync(current, { throwIfNoEntry: false })?.isSymbolicLink()) {
      return true;
    }
  }
  return false;
}

function groupForOutput(hostRoot: string, outputPath: string, leaf: string): string | undefined {
  const parts = relative(hostRoot, outputPath).split(sep);
  return parts.length === 4 && parts[0] === 'dist' && parts[1] === 'visual-regression' && parts[2] && parts[3] === leaf
    ? parts[2]
    : undefined;
}

const runExecutor: PromiseExecutor<VisualRegressionExecutorSchema> = async (options, context: ExecutorContext) => {
  const { mode, hostRoot, outputPath, storybookPath, stories } = options;
  const group =
    isRelativePath(hostRoot) && isRelativePath(outputPath)
      ? groupForOutput(hostRoot, outputPath, mode === 'build' ? 'storybook' : 'screenshots')
      : undefined;
  if (
    (mode !== 'build' && mode !== 'capture') ||
    !group ||
    (mode === 'build' && (!Array.isArray(stories) || stories.length === 0 || !stories.every(isRelativePath))) ||
    (options.addons !== undefined &&
      (!Array.isArray(options.addons) || options.addons.some(addon => typeof addon !== 'string'))) ||
    (options.previewAnnotations !== undefined &&
      (!Array.isArray(options.previewAnnotations) || !options.previewAnnotations.every(isRelativePath))) ||
    (mode === 'capture' &&
      (!isRelativePath(storybookPath) ||
        groupForOutput(hostRoot, storybookPath, 'storybook') !== group ||
        !Number.isInteger(options.concurrency ?? 1) ||
        (options.concurrency ?? 1) < 1))
  ) {
    logger.error('Invalid visual regression options: expected host-relative stories and group-scoped output paths.');
    return { success: false };
  }

  const hostPath = join(context.root, hostRoot);
  const output = join(context.root, outputPath);
  try {
    if (
      !existsSync(join(hostPath, '.storybook', 'main.js')) ||
      hasSymlink(context.root, hostPath) ||
      hasSymlink(context.root, output) ||
      (mode === 'capture' && hasSymlink(context.root, join(context.root, storybookPath!)))
    ) {
      logger.error('Visual regression host config is missing or an input/output path crosses a symlink.');
      return { success: false };
    }

    if (mode === 'build') {
      const configPath = join(dirname(output), 'config');
      const originalConfig = join(hostPath, '.storybook');
      mkdirSync(configPath, { recursive: true });
      writeFileSync(
        join(configPath, 'main.js'),
        `const hostMain = require(${JSON.stringify(
          join(originalConfig, 'main.js'),
        )});\nmodule.exports = { ...hostMain, stories: ${JSON.stringify(stories!.map(story => join(hostPath, story)))}${
          options.addons === undefined ? '' : `, addons: ${JSON.stringify(options.addons)}`
        }${
          options.previewAnnotations === undefined
            ? ''
            : `, previewAnnotations: (entries = []) => [...entries, ...${JSON.stringify(
                options.previewAnnotations.map(annotation => join(hostPath, annotation)),
              )}]`
        } };\n`,
      );
      for (const filename of ['preview.js', 'manager.js']) {
        const source = join(originalConfig, filename);
        if (existsSync(source)) {
          writeFileSync(join(configPath, filename), `export * from ${JSON.stringify(source)};\n`);
        }
      }
      const result = spawnSync(
        'yarn',
        ['run', '-T', 'storybook', 'build', '--config-dir', configPath, '--output-dir', output],
        { cwd: hostPath, stdio: 'inherit', shell: false },
      );
      return { success: result.status === 0 && !result.error };
    }

    await rm(output, { force: true, recursive: true });
    const result = spawnSync(
      'yarn',
      [
        'run',
        '-T',
        'storywright',
        '--browsers',
        'chromium',
        '--url',
        join(context.root, storybookPath!),
        '--destpath',
        output,
        '--waitTimeScreenshot',
        '500',
        '--concurrency',
        String(options.concurrency ?? 1),
        '--headless',
        'true',
        '--bailOnStoriesError',
        '--stepsApi',
        'parameters',
      ],
      { cwd: hostPath, stdio: 'inherit', shell: false },
    );
    return { success: result.status === 0 && !result.error };
  } catch (error) {
    logger.error(error);
    return { success: false };
  }
};

export default runExecutor;
