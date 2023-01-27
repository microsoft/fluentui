import type { Options } from '@swc/core';
import { logger } from 'just-scripts';
// eslint-disable-next-line import/no-extraneous-dependencies
import { exec } from 'just-scripts-utils';

function swcCli(options: Options) {
  const { outputPath, module } = options;

  const cmd = `npx swc ${outputPath} --out-dir ${outputPath} --config module.type=${module?.type}`;
  logger.info(`Running swc CLI: ${cmd}`);

  return exec(cmd);
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
