// @ts-check

const { task, thunk, argv } = require('just-task');
const { jestTask } = require('just-task-preset');

task(
  'jest',
  thunk(() => {
    return jestTask({
      ...(process.env.TRAVIS && { runInBand: true }),
      ...(process.env.TRAVIS || argv().production ? { coverage: true } : undefined),
      ...(argv().u || argv().updateSnapshot ? { updateSnapshot: true } : undefined)
    });
  })
);
