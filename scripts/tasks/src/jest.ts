import { logger } from 'just-scripts';
// eslint-disable-next-line import/no-extraneous-dependencies
import { spawn } from 'just-scripts-utils';

import { JustArgs, getJustArgv } from './argv';

const commonJestTask = (options: JestTaskConfig = {}) => {
  const {
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
  } = getJustArgv() as JustArgs & JestTaskConfig;

  return jestTask({ ...options, ...otherArgs });
};

export const jest = () => {
  return commonJestTask();
};

export const jestWatch = () => {
  return commonJestTask({ watch: true });
};

type JestTaskConfig = {
  config?: string;
  passWithNoTests?: boolean;
  cache?: boolean;
  clearCache?: boolean;
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
  updateSnapshot?: boolean;
  u?: boolean;
};

/**
 *
 * custom jest task as just-scripts jest task doesn't support maxWorkers setup and others
 */
const jestTask = (config: JestTaskConfig) => () => {
  const cmd = 'jest';
  const cache = config.cache !== undefined ? config.cache : true;
  const passWithNoTests = config.passWithNoTests !== undefined ? config.passWithNoTests : true;
  const args = [
    cache === false && '--no-cache',
    passWithNoTests && '--passWithNoTests',
    config.config && `--config ${config.config}`,
    config.rootDir && `--rootDir ${config.rootDir}`,
    config.watch && '--watch',
    config.watchAll && '--watchAll',
    config.clearCache && '--clearCache',
    config.coverage && '--coverage',
    config.runInBand && '--runInBand',
    config.maxWorkers && `--maxWorkers=${config.maxWorkers}`,
    config.detectLeaks && '--detectLeaks',
    config.testNamePattern && `--testNamePattern="${config.testNamePattern}"`,
    (config.updateSnapshot || config.u) && '--updateSnapshot',
    config.verbose && '--verbose',
    config.testFilePattern,
  ].filter(Boolean) as string[];

  logger.info(cmd, args.join(' '));

  return spawn(cmd, args, { stdio: 'inherit' });
};
