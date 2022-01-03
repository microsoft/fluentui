import { jestTask, JestTaskOptions } from 'just-scripts';
import * as path from 'path';
import unparse from 'yargs-unparser';
import { getJustArgv, JustArgs } from './argv';

const commonJestTask = (options: JestTaskOptions = {}) => {
  const {
    runInBand = !!(process.env.TF_BUILD || process.env.LAGE_PACKAGE_NAME),
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
    runInBand: true,
    config: path.join(process.cwd(), 'jest.dom.config.js'),
  });

export const jestWatch = () => {
  return commonJestTask({ watch: true });
};
