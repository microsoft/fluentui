// @ts-check

const { preset, just } = require('@uifabric/build');
const { task, series, parallel, argv, condition } = just;
const copyTypes = require('./scripts/copyTypes');

preset();

task('copy-types', copyTypes);

// These have to be manually re-defined because we need to chain copy-types after copy, and
// chain() doesn't work if the task chained against is in the middle of the series...
task('dev', series('clean', 'copy', 'copy-types', 'sass', 'webpack-dev-server'));
task(
  'build',
  series(
    'clean',
    'copy',
    'copy-types',
    parallel(
      condition('validate', () => !argv().min),
      series('ts', parallel(condition('webpack', () => !argv().min), condition('lint-imports', () => !argv().min)))
    )
  )
).cached();
