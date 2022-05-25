import fs from 'fs';
import * as path from 'path';
import { tscTask, TscTaskOptions, resolveCwd, logger } from 'just-scripts';
import { getJustArgv } from './argv';

const libPath = path.resolve(process.cwd(), 'lib');
const srcPath = path.resolve(process.cwd(), 'src');
// Temporary hack: only use tsbuildinfo file for things under packages/fluentui
const useTsBuildInfo =
  /[\\/]packages[\\/]fluentui[\\/]/.test(process.cwd()) && path.basename(process.cwd()) !== 'perf-test-northstar';

function prepareTsTaskConfig(options: TscTaskOptions) {
  // docs say pretty is on by default, but it's actually disabled when tsc is run in a
  // non-TTY context (which is what just-scripts tscTask does)
  // https://github.com/nrwl/nx/issues/9069#issuecomment-1048028504
  options.pretty = true;

  if (getJustArgv().production) {
    // sourceMap must be true for inlineSources and sourceRoot to work
    options.inlineSources = true;
    options.sourceRoot = path.relative(libPath, srcPath);
    options.sourceMap = true;
  }

  const tsConfigLib = 'tsconfig.lib.json';
  const isUsingTsSolutionConfigs = fs.existsSync(resolveCwd(tsConfigLib));

  if (isUsingTsSolutionConfigs) {
    // For converged packages (which use TS path aliases), explicitly set `baseUrl` and `rootDir` to current package root.
    // > - This is a temporary workaround for current way of building packages via lage and just scripts.
    // > - Without setting baseUrl we would get all aliased packages build within outDir
    // > - Without setting rootDir we would get output dir mapping following path from monorepo root
    logger.info(`📣 TSC: package is using TS path aliases. Overriding tsconfig settings.`);
    options.baseUrl = '.';
    options.rootDir = './src';
    options.project = tsConfigLib;
  }

  return options;
}

export const ts = {
  commonjs: () => {
    const options = prepareTsTaskConfig({
      outDir: 'lib-commonjs',
      module: 'commonjs',
      ...(useTsBuildInfo && { tsBuildInfoFile: '.commonjs.tsbuildinfo' }),
    });

    return tscTask(options);
  },
  esm: () => {
    const options = prepareTsTaskConfig({
      outDir: 'lib',
      module: 'esnext',
    });

    // Use default tsbuildinfo for this variant
    return tscTask(options);
  },
  amd: () => {
    const options = prepareTsTaskConfig({
      target: 'es5',
      outDir: 'lib-amd',
      module: 'amd',
      ...(useTsBuildInfo && { tsBuildInfoFile: '.amd.tsbuildinfo' }),
    });

    return tscTask(options);
  },
  commonjsOnly: () => {
    // Use default tsbuildinfo for this variant (since it's the only variant)
    const options = prepareTsTaskConfig({
      outDir: 'lib',
      module: 'commonjs',
    });

    return tscTask(options);
  },
};
