// @ts-check

const { jestTask, argv } = require('just-scripts');
const path = require('path');

const commonArgs = () => {
  const args = argv();
  return {
    ...((process.env.TF_BUILD || process.env.LAGE_PACKAGE_NAME) && { runInBand: true }),
    ...(args.u || args.updateSnapshot ? { updateSnapshot: true } : undefined),
  };
};

exports.jest = () =>
  jestTask({
    ...commonArgs(),
    env: {
      ...process.env,
      NODE_ENV: 'test',
    },
  });

exports.jestDom = () =>
  jestTask({
    runInBand: true,
    config: path.join(process.cwd(), 'jest.dom.config.js'),
  });

exports.jestWatch = () => {
  const args = argv();
  return jestTask({
    ...commonArgs(),
    watch: true,
    _: ['-i', ...(args._ || []).filter(arg => arg !== 'jest-watch')],
  });
};
