// @ts-check

const { jestTask, argv } = require('just-scripts');
const path = require('path');

const commonArgs = () => {
  return {
    ...((process.env.TF_BUILD || process.env.LAGE_PACKAGE_NAME) && { runInBand: true }),
    ...(argv().u || argv().updateSnapshot ? { updateSnapshot: true } : undefined),
  };
};

exports.jest = () =>
  jestTask({
    ...commonArgs(),
    env: {
      ...process.env,
      NODE_ENV: 'test',
      PACKAGE_NAME: argv().package,
    },
  });

exports.jestDom = () =>
  jestTask({
    runInBand: true,
    config: path.join(process.cwd(), 'jest.dom.config.js'),
  });

exports.jestWatch = () => {
  return jestTask({
    ...commonArgs(),
    watch: true,
    _: ['-i', ...(argv()._ || []).filter(arg => arg !== 'jest-watch')],
    env: {
      ...process.env,
      PACKAGE_NAME: argv().package,
    },
  });
};
