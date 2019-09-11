// @ts-check

// NOTE: this package cannot take @uifabric/build as a dependency because of circular dependency
// So, it will take just-scripts directly.
const { taskPresets, task, series, parallel, option, condition, tscTask, argv } = require('just-scripts');

option('min', { alias: 'npm-install-mode' });

taskPresets.lib();

task('ts', tscTask({ module: 'commonjs', outDir: './lib' }));

task('build', series('clean', parallel('ts', condition('jest', () => !argv().min)))).cached();
