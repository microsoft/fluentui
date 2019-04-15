// @ts-check

const { argv } = require('just-task');
const { jestTask } = require('just-scripts');

exports.jest = () =>
  jestTask({
    ...(process.env.TF_BUILD && { runInBand: true }),
    ...(process.env.TF_BUILD || argv().production ? { coverage: true } : undefined),
    ...(argv().u || argv().updateSnapshot ? { updateSnapshot: true } : undefined)
  });

exports.jestWatch = () => {
  const args = argv();
  return jestTask({
    ...(process.env.TF_BUILD && { runInBand: true }),
    ...(process.env.TF_BUILD || args.production ? { coverage: true } : undefined),
    ...(args.u || args.updateSnapshot ? { updateSnapshot: true } : undefined),
    watch: true,
    _: ['-i', ...(args._ || []).filter(arg => arg !== 'jest-watch')]
  });
};
