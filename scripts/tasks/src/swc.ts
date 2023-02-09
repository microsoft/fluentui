import { exec } from 'child_process';
import { promisify } from 'util';

import type { Options as SwcOptions } from '@swc/core';
import { logger } from 'just-scripts';

const execAsync = promisify(exec);

type Options = SwcOptions & { module: { type: 'es6' | 'commonjs' | 'amd' } };

function swcCli(options: Options) {
  const { outputPath, module } = options;
  const swcCliBin = 'npx swc';
  const sourceDirMap = {
    es6: 'src',
    commonjs: 'lib',
    amd: 'lib',
  };
  const sourceDir = sourceDirMap[options.module.type];

  const cmd = `${swcCliBin} ${sourceDir} --out-dir ${outputPath} --config module.type=${module?.type}`;
  logger.info(`Running swc CLI: ${cmd}`);

  return execAsync(cmd);
}

export const swc = {
  commonjs: () => {
    const options: Options = {
      configFile: true,
      outputPath: 'lib-commonjs',
      module: { type: 'commonjs' },
    };

    return swcCli(options);
  },
  esm: () => {
    const options: Options = {
      configFile: true,
      outputPath: 'lib',
      module: { type: 'es6' },
    };

    return swcCli(options);
  },
  amd: () => {
    const options: Options = {
      configFile: true,
      outputPath: 'lib-amd',
      module: { type: 'amd' },
    };

    return swcCli(options);
  },
};
