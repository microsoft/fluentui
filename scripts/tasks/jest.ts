import { jestTask, argv, JestTaskOptions } from 'just-scripts';
import * as path from 'path';

/**
 * Partial support of native jest CLI arguments https://jestjs.io/docs/en/cli
 * > Why partial support only? just jestTask limits support to only those specified as return value of this function
 */
const commonArgs = (): JestTaskOptions => {
  const args: JestTaskOptions = argv();
  return {
    ...((process.env.TF_BUILD || process.env.LAGE_PACKAGE_NAME || args.runInBand) && { runInBand: true }),
    ...((args.u || args.updateSnapshot) && { updateSnapshot: true }),
    clearCache: args.clearCache,
    config: args.config,
    watch: args.watch,
    coverage: args.coverage,
    passWithNoTests: args.passWithNoTests === undefined ? true : args.passWithNoTests,
    testNamePattern: args.testNamePattern,
    testPathPattern: args.testPathPattern,

    // Just specific config
    nodeArgs: args.nodeArgs,
    // pass forward positional args (to narrow down tests to be run)
    _: (args._ || []).filter(arg => arg !== 'jest' && arg !== 'jest-watch'),
  };
};

const commonJestTask = (options: JestTaskOptions = {}) => {
  return jestTask({
    ...commonArgs(),
    env: {
      ...process.env,
      NODE_ENV: 'test',
      PACKAGE_NAME: argv().package,
    },
    ...options,
  });
};

export const jest = () => {
  return commonJestTask();
};

export const jestDom = () =>
  jestTask({
    runInBand: true,
    config: path.join(process.cwd(), 'jest.dom.config.js'),
  });

export const jestWatch = () => {
  return commonJestTask({ watch: true });
};
