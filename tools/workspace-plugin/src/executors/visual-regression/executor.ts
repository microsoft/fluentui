import { ExecutorContext, PromiseExecutor, generateFiles, workspaceRoot } from '@nx/devkit';
import { spawnSync, exec } from 'node:child_process';
import { join } from 'node:path';
import { FsTree, flushChanges } from 'nx/src/generators/tree';

import { VisualRegressionExecutorSchema } from './schema';
import { rm } from 'node:fs';

interface NormalizedOptions extends ReturnType<typeof normalizeOptions> {}

const runExecutor: PromiseExecutor<VisualRegressionExecutorSchema> = async (schema, context) => {
  const options = normalizeOptions(schema, context);

  prepareSetup(options);

  const storywrightCmdArgs = Object.entries(options.storywright)
    .map(([flag, value]) => {
      return [`--${flag}`, `${value}`];
    })
    .flat();

  try {
    const rmResult = spawnSync('rm', ['-rf', options.storywright.destpath], {
      cwd: options.project.root,
      stdio: 'inherit',
    });

    const swResult = spawnSync('storywright', [...storywrightCmdArgs], { cwd: options.project.root, stdio: 'inherit' });
    if (swResult.error) {
      return { success: false };
    }

    // spawnSync('rm', ['-rf', options.configRoot], { cwd: options.project.root, stdio: 'inherit' });
    const pwResult = spawnSync('playwright', ['test', '--config', options.configRoot], {
      cwd: options.project.root,
      stdio: 'inherit',
    });
    if (pwResult.error) {
      return { success: false };
    }
  } catch {
    return { success: false };
  }

  return {
    success: true,
  };
};

function prepareSetup(options: NormalizedOptions) {
  const tree = new FsTree(workspaceRoot, false);
  generateFiles(tree, join(__dirname, 'templates'), join(options.project.root, options.configRoot), {
    tmpl: '',
    playwright: options.playwright,
  });
  flushChanges(workspaceRoot, tree.listChanges());
}

function normalizeOptions(schema: VisualRegressionExecutorSchema, context: ExecutorContext) {
  const project = context.projectsConfigurations!.projects[context.projectName!];
  const defaults = {
    // storywright
    storywright: {
      browsers: 'chromium',
      url: 'dist/storybook',
      destpath: 'dist/screenshots',
      waitTimeScreenshot: 500,
      concurrency: 4,
      headless: true,
    },
    playwright: {
      baselinePath: '__snapshots__',
    },
    // playwright
    // config: join(__dirname, 'playwright.config.ts'),
    // misc
    configRoot: 'dist/visual-regression',
  };

  return { ...defaults, ...schema, project };
}

export default runExecutor;
