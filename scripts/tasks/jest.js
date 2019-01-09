// @ts-check

const { argv } = require('just-task');
const { jestTask } = require('just-task-preset');

exports.jest = () =>
  jestTask({
    ...(process.env.TRAVIS && { runInBand: true }),
    ...(process.env.TRAVIS || argv().production ? { coverage: true } : undefined),
    ...(argv().u || argv().updateSnapshot ? { updateSnapshot: true } : undefined)
  });

exports.jestWatch = () =>
  jestTask({
    ...(process.env.TRAVIS && { runInBand: true }),
    ...(process.env.TRAVIS || argv().production ? { coverage: true } : undefined),
    ...(argv().u || argv().updateSnapshot ? { updateSnapshot: true } : undefined),
    _: ['--watch', '-i', ...(argv()._ ? argv()._.filter(arg => arg !== 'jest-watch') : [])]
  });
