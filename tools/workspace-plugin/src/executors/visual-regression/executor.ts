import { type ExecutorContext, type PromiseExecutor, logger } from '@nx/devkit';
import { spawnSync } from 'node:child_process';
import { existsSync, linkSync, lstatSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import { dirname, isAbsolute, join, relative, sep } from 'node:path';

import { type VisualRegressionExecutorSchema } from './schema';
import { type SharedStorybookManifest, resolveSharedGroups, writeSharedManifest } from './shared-storybook';

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

async function createCaptureView(sharedPath: string, viewPath: string, group: string, hash: string): Promise<number> {
  const manifest = JSON.parse(readFileSync(join(sharedPath, 'vrt-shared.json'), 'utf8')) as SharedStorybookManifest;
  const ids = manifest.groups?.[group];
  if (manifest.hash !== hash || !Array.isArray(ids) || !ids.length || ids.some(id => typeof id !== 'string')) {
    throw new Error(`Shared Storybook fingerprint or story ownership is invalid for ${group}`);
  }
  const index = JSON.parse(readFileSync(join(sharedPath, 'index.json'), 'utf8')) as {
    v: number;
    entries: Record<string, { id: string; type: string }>;
  };
  if (
    index.v !== 5 ||
    !index.entries ||
    ids.some(id => index.entries[id]?.id !== id || index.entries[id]?.type !== 'story')
  ) {
    throw new Error(`Shared Storybook index is missing selected story IDs for ${group}`);
  }
  await rm(viewPath, { force: true, recursive: true });
  const linkAssets = (source: string, destination: string): void => {
    mkdirSync(destination, { recursive: true });
    for (const entry of readdirSync(source, { withFileTypes: true })) {
      if (source === sharedPath && ['index.json', 'stories.json', 'vrt-shared.json'].includes(entry.name)) {
        continue;
      }
      if (entry.isDirectory()) {
        linkAssets(join(source, entry.name), join(destination, entry.name));
      } else if (entry.isFile()) {
        linkSync(join(source, entry.name), join(destination, entry.name));
      } else {
        throw new Error(`Shared Storybook asset is not a regular file: ${entry.name}`);
      }
    }
  };
  linkAssets(sharedPath, viewPath);
  writeFileSync(
    join(viewPath, 'index.json'),
    JSON.stringify({
      ...index,
      entries: Object.fromEntries(ids.map(id => [id, index.entries[id]])),
    }),
  );
  return ids.length;
}

const runExecutor: PromiseExecutor<VisualRegressionExecutorSchema> = async (options, context: ExecutorContext) => {
  const { mode, hostRoot, outputPath, storybookPath } = options;
  let stories = options.stories;
  const building = mode === 'build' || mode === 'build-shared';
  const group =
    isRelativePath(hostRoot) && isRelativePath(outputPath)
      ? groupForOutput(hostRoot, outputPath, building ? 'storybook' : 'screenshots')
      : undefined;
  const sharedCapture =
    mode === 'capture' &&
    isRelativePath(storybookPath) &&
    groupForOutput(hostRoot, storybookPath, 'storybook') === '_shared';
  if (
    (!building && mode !== 'capture') ||
    !group ||
    (mode === 'build' && (!Array.isArray(stories) || stories.length === 0 || !stories.every(isRelativePath))) ||
    (mode === 'build-shared' &&
      (group !== '_shared' || !Array.isArray(options.selectedProjects) || !options.selectedProjects.length)) ||
    (options.addons !== undefined &&
      (!Array.isArray(options.addons) || options.addons.some(addon => typeof addon !== 'string'))) ||
    (options.previewAnnotations !== undefined &&
      (!Array.isArray(options.previewAnnotations) || !options.previewAnnotations.every(isRelativePath))) ||
    (mode === 'capture' &&
      (!isRelativePath(storybookPath) ||
        (!sharedCapture && groupForOutput(hostRoot, storybookPath, 'storybook') !== group) ||
        (sharedCapture &&
          (typeof options.storybookHash !== 'string' || !/^[a-f0-9]{64}$/.test(options.storybookHash))) ||
        !Number.isInteger(options.concurrency ?? 1) ||
        (options.concurrency ?? 1) < 1))
  ) {
    logger.error('Invalid visual regression options: expected host-relative stories and group-scoped output paths.');
    return { success: false };
  }

  const hostPath = join(context.root, hostRoot);
  const output = join(context.root, outputPath);
  let viewPath: string | undefined;
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

    if (building) {
      const groups =
        mode === 'build-shared' ? resolveSharedGroups(options.selectedProjects!, hostRoot, context) : undefined;
      if (groups) {
        stories = [...new Set(Object.values(groups).flat())].sort();
      }
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
      const started = Date.now();
      const result = spawnSync(
        'yarn',
        ['run', '-T', 'storybook', 'build', '--config-dir', configPath, '--output-dir', output],
        { cwd: hostPath, stdio: 'inherit', shell: false },
      );
      if (result.status === 0 && !result.error && groups) {
        const manifest = writeSharedManifest(output, hostPath, groups);
        logger.info(
          JSON.stringify({
            phase: 'shared-build',
            projects: Object.keys(groups),
            hash: manifest.hash,
            seconds: (Date.now() - started) / 1000,
          }),
        );
      }
      return { success: result.status === 0 && !result.error };
    }

    let capturePath = join(context.root, storybookPath!);
    let storyCount: number | undefined;
    if (sharedCapture) {
      viewPath = join(dirname(output), 'shared-preview');
      storyCount = await createCaptureView(capturePath, viewPath, group, options.storybookHash!);
      capturePath = viewPath;
    }
    await rm(output, { force: true, recursive: true });
    const started = Date.now();
    const result = spawnSync(
      'yarn',
      [
        'run',
        '-T',
        'storywright',
        '--browsers',
        'chromium',
        '--url',
        capturePath,
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
    logger.info(
      JSON.stringify({
        phase: 'capture',
        project: group,
        stories: storyCount,
        screenshots: existsSync(output) ? readdirSync(output).filter(file => file.endsWith('.png')).length : 0,
        seconds: (Date.now() - started) / 1000,
        success: result.status === 0 && !result.error,
      }),
    );
    return { success: result.status === 0 && !result.error };
  } catch (error) {
    logger.error(error);
    return { success: false };
  } finally {
    if (viewPath) {
      await rm(viewPath, { force: true, recursive: true });
    }
  }
};

export default runExecutor;
