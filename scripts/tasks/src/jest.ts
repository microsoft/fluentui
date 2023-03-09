import * as path from 'path';

import { JestTaskOptions, jestTask } from 'just-scripts';
// eslint-disable-next-line import/no-extraneous-dependencies
import { spawn } from 'just-scripts-utils';
import unparse from 'yargs-unparser';

import { JustArgs, getJustArgv } from './argv';

const commonJestTask = (options: JestTaskOptions = {}) => {
  const {
    // runInBand = !!(process.env.TF_BUILD || process.env.LAGE_PACKAGE_NAME),
    runInBand,
    passWithNoTests = true,
    nodeArgs,
    _ = [],
    // args for our just preset which should not be passed through to jest
    cached,
    commonjs,
    min,
    package: packageName,
    production,
    push,
    registry,
    // these args without explicit handling will be passed directly through to jest
    ...otherArgs
  } = getJustArgv() as JustArgs & JestTaskOptions;

  return jestRaw({ runInBand, ...otherArgs } as unknown as JestPluginConfig);

  return jestTask({
    runInBand,
    passWithNoTests,
    nodeArgs, // Just-specific config

    _: [
      // jestTask doesn't have explicit support for all jest args (https://jestjs.io/docs/en/cli),
      // so unparse any extra args and pass them through here
      ...unparse({ ...otherArgs, _: [] }),
      // and pass any positional args (to narrow down tests to be run)
      ..._.filter(arg => arg !== 'jest' && arg !== 'jest-watch'),
    ],

    env: {
      ...process.env,
      NODE_ENV: 'test',
      PACKAGE_NAME: packageName,
    },
    ...options,
  });
};

export const jest = () => {
  return commonJestTask();
};

export const jestDom = () =>
  jestTask({
    // runInBand: true,
    config: path.join(process.cwd(), 'jest.dom.config.js'),
  });

export const jestWatch = () => {
  return commonJestTask({ watch: true });
};

export type JestPluginConfig = {
  config: string;
  cache?: boolean;
  coverage?: boolean;
  detectLeaks?: boolean;
  maxWorkers?: number;
  rootDir?: string;
  runInBand?: boolean;
  testNamePattern?: string;
  testFilePattern?: string;
  verbose?: boolean;
  watchAll?: boolean;
  watch?: boolean;
};

const jestRaw = (config: JestPluginConfig) => () => {
  const cache = config.cache !== undefined ? config.cache : true;
  // process.env.NODE_ENV = 'test';
  // Alias env variables as Azure Pipelines do not set it
  // process.env.CI = process.env.TF_BUILD ? 'true' : undefined;

  // in watch mode jest never exits
  // let the gulp task complete to prevent blocking subsequent tasks
  const args = [
    // `jest --config ${config.config}`,
    config.watch && '--watch',
    config.coverage && '--coverage',
    config.watchAll && '--watchAll',
    config.runInBand && '--runInBand',
    config.maxWorkers && `--maxWorkers=${config.maxWorkers}`,
    config.detectLeaks && '--detectLeaks',
    config.testNamePattern && `--testNamePattern="${config.testNamePattern}"`,
    config.rootDir && `--rootDir ${config.rootDir}`,
    config.verbose && '--verbose',
    cache === false && '--no-cache',
    config.testFilePattern, // !!! THIS ITEM MUST GO LAST IN THE ARRAY !!!
  ].filter(Boolean) as string[];
  console.log(`jest ${args.join(' ')}`);
  return spawn('jest', args, { stdio: 'inherit' });
};
