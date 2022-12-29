import * as path from 'path';
import * as fs from 'fs';
import { TaskFunction, TscTaskOptions, logger } from 'just-scripts';
import { exec, encodeArgs, spawn } from 'just-scripts-utils';
import { stripJsonComments } from '@nrwl/devkit';

// interface swcCLIArgs {
//   filename: string;
//   'config-file': string;
//   'env-name': string;
//   'no-swcrc': string;
//   ignore: string;
//   only: string;
//   'source-maps': boolean | 'inline' | 'both';
//   'source-map-target': string;
//   'source-root': string;
//   'out-file': string;
//   'out-dir': string;
//   config: string;
// }

function getSwcTaskConfig(options: any) {
  const cwd = process.cwd();
  const swcConfigFile = '.swcrc';
  const swcConfigPath = path.join(cwd, `./${swcConfigFile}`);
  const swcConfig = JSON.parse(stripJsonComments(fs.readFileSync(swcConfigPath, 'utf-8')));

  return { swcConfig, ...options };
}

function swcTask(options: any) {
  console.log('options ', options);
  const outDir = options.outDir;
  const cmd = `npx swc src -d ${outDir} -C module.type=${options.type}`;
  console.log('swc task cli command: ', cmd);
  return exec(cmd);
}

export const swc = {
  commonjs: () => {
    const options = getSwcTaskConfig({
      outDir: 'lib-commonjs',
      type: 'commonjs',
    });

    return swcTask(options);
  },
  esm: () => {
    const options = getSwcTaskConfig({
      outDir: 'lib',
      type: 'es6',
    });

    // Use default tsbuildinfo for this variant
    return swcTask(options);
  },
  amd: () => {
    const options = getSwcTaskConfig({
      target: 'es5',
      outDir: 'lib-amd',
      type: 'amd',
    });

    return swcTask(options);
  },
};
