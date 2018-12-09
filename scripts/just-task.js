// @ts-check

const path = require('path');
const { task, series, parallel, condition, option, argv } = require('just-task');

require('./just-tasks/ts');
require('./just-tasks/clean');
require('./just-tasks/jest');
require('./just-tasks/copy');
require('./just-tasks/sass');
require('./just-tasks/tslint');

option('production');

task(
  'build',
  series(
    'clean',
    'copy',
    'sass',
    parallel(
      'tslint',
      'jest',
      'ts:commonjs',
      'ts:esm',
      condition('ts:amd', () => {
        return argv().production;
      })
    )
  )
);
