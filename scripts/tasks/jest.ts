import { jestTask, argv, JestTaskOptions } from 'just-scripts';
import * as path from 'path';

/**
 * Partial support of native jest CLI arguments https://jestjs.io/docs/en/cli
 * > Why partial support only? just jestTask limits support to only those specified as return value of this function
 */
const commonArgs = (): JestTaskOptions => {
  return {
    ...((process.env.TF_BUILD || process.env.LAGE_PACKAGE_NAME || argv().runInBand) && { runInBand: true }),
    ...((argv().u || argv().updateSnapshot) && { updateSnapshot: true }),
    clearCache: argv().clearCache,
    config: argv().config,
    watch: argv().watch,
    coverage: argv().coverage,
    passWithNoTests: argv().coverage,
    testNamePattern: argv().testNamePattern,
    testPathPattern: argv().testPathPattern,

    // Just specific config
    nodeArgs: argv().nodeArgs,
  };
};

export const jest = () =>
  jestTask({
    ...commonArgs(),
    env: {
      ...process.env,
      NODE_ENV: 'test',
      PACKAGE_NAME: argv().package,
    },
  });

export const jestDom = () =>
  jestTask({
    runInBand: true,
    config: path.join(process.cwd(), 'jest.dom.config.js'),
  });

export const jestWatch = () => {
  return jestTask({
    ...commonArgs(),
    watch: true,
    _: [...(argv()._ || []).filter(arg => arg !== 'jest-watch')],
    env: {
      ...process.env,
      PACKAGE_NAME: argv().package,
    },
  });
};
