import * as fs from 'fs';
import * as path from 'path';

import { TscTaskOptions, logger, tscTask } from 'just-scripts';
// eslint-disable-next-line import/no-extraneous-dependencies
import { exec } from 'just-scripts-utils';

import { getJustArgv } from './argv';
import { getTsPathAliasesConfig, getTsPathAliasesConfigV8 } from './utils';

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

  const { isUsingV8pathAliases, tsConfigFileV8 } = getTsPathAliasesConfigV8();

  if (isUsingV8pathAliases) {
    logger.info(`📣 TSC: V8 package is using TS path aliases. Overriding tsconfig settings.`);
    options.baseUrl = '.';
    options.rootDir = './src';
    options.project = tsConfigFileV8;
  }

  const { isUsingTsSolutionConfigs, tsConfigFile, tsConfig } = getTsPathAliasesConfig();

  if (isUsingTsSolutionConfigs && tsConfig) {
    logger.info(`📣 TSC: package is using TS path aliases. Overriding tsconfig settings.`);

    const tsConfigOutDir = tsConfig.compilerOptions.outDir as string;

    options.outDir = `${tsConfigOutDir}/${options.outDir}`;
    options.project = tsConfigFile;
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

export function typeCheck() {
  const cwd = process.cwd();

  const tsConfigPath = path.join(cwd, 'tsconfig.json');
  const tempPath = path.join(cwd, 'temp');

  if (!fs.existsSync(tsConfigPath)) {
    return;
  }

  const tsConfigContent = fs.readFileSync(tsConfigPath, 'utf-8');

  const tsConfig = JSON.parse(tsConfigContent);
  const isUsingTsSolutionConfigs = Boolean(tsConfig.references);

  if (!isUsingTsSolutionConfigs) {
    return;
  }

  if (!fs.existsSync(tempPath)) {
    fs.mkdirSync(tempPath);
  }

  tsConfig.compilerOptions.paths = {};

  fs.writeFileSync(tsConfigPath, JSON.stringify(tsConfig, null, 2), 'utf-8');

  const cmd = 'tsc';
  const args = ['-b', '--pretty', tsConfigPath];
  const program = `${cmd} ${args.join(' ')}`;

  return exec(program)
    .catch(err => {
      console.error(err.stdout);
      process.exit(1);
    })
    .finally(() => {
      // delete tsConfig.compilerOptions.paths;
      fs.writeFileSync(tsConfigPath, tsConfigContent, 'utf-8');
    });
}
