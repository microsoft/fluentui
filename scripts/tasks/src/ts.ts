import * as path from 'path';

import { TscTaskOptions, logger, tscTask } from 'just-scripts';

import { getJustArgv } from './argv';
import { getTsPathAliasesConfig, getTsPathAliasesConfigUsedOnlyForDx } from './utils';

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

  const { isUsingPathAliasesForDx, tsConfigFileForCompilation } = getTsPathAliasesConfigUsedOnlyForDx();

  if (isUsingPathAliasesForDx()) {
    logger.info(`📣 TSC: Project is using TS path aliases for DX. Disabling aliases for build.`);
    options.baseUrl = '.';
    options.rootDir = './src';
    options.project = tsConfigFileForCompilation;

    return options;
  }

  const { isUsingTsSolutionConfigs, tsConfigFileNames, tsConfigs } = getTsPathAliasesConfig();

  if (isUsingTsSolutionConfigs && tsConfigs.lib) {
    logger.info(`📣 TSC: package is using TS path aliases. Overriding tsconfig settings.`);

    const tsConfigOutDir = tsConfigs.lib.compilerOptions.outDir as string;

    options.outDir = `${tsConfigOutDir}/${options.outDir}`;
    options.project = tsConfigFileNames.lib;
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
};
