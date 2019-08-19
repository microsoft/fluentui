// @ts-check

const { jestTask, argv } = require('just-scripts');
const path = require('path');

exports.jest = () =>
  jestTask({
    ...(process.env.TF_BUILD && { runInBand: true }),
    ...(argv().u || argv().updateSnapshot ? { updateSnapshot: true } : undefined)
  });

exports.jestDom = () =>
  jestTask({
    runInBand: true,
    config: path.join(process.cwd(), 'jest.dom.config.js')
  });

exports.jestWatch = () => {
  const args = argv();
  return jestTask({
    ...(process.env.TF_BUILD && { runInBand: true }),
    ...(args.u || args.updateSnapshot ? { updateSnapshot: true } : undefined),
    watch: true,
    _: ['-i', ...(args._ || []).filter(arg => arg !== 'jest-watch')]
  });
};

exports.jestDom = () =>
  jestTask({
    runInBand: true,
    config: path.join(process.cwd(), 'jest.dom.config.js')
  });
