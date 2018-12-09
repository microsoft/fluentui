// @ts-check

const path = require('path');
const { task, series, parallel, condition, option, argv } = require('just-task');

require('./just-tasks/ts');
require('./just-tasks/clean');
require('./just-tasks/jest');
require('./just-tasks/copy');
require('./just-tasks/sass');
require('./just-tasks/tslint');
require('./just-tasks/webpack');

option('production');
option('min');

task(
  'build',
  series(
    'clean',
    'copy',
    'sass',
    parallel(
      condition('tslint', () => !argv().min),
      condition('jest', () => !argv().min),
      condition('ts:commonjs', () => !argv().min),
      'ts:esm',
      condition('ts:amd', () => argv().production && !argv().min)
    ),
    condition('webpack', () => !argv().min)
  )
);
