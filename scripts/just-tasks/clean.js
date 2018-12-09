// @ts-check

const path = require('path');
const { task } = require('just-task');
const { cleanTask } = require('just-task-preset');

task(
  'clean',
  cleanTask(
    [
      'lib',
      'temp',
      'dist',
      'lib-amd',
      'lib-commonjs',
      'lib-es2015', // Keep this in clean for actually cleaning up legacy content.
      'coverage',
      'src/**/*.scss.ts'
    ].map(p => path.join(process.cwd(), p))
  )
);
