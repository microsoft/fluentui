const perfTest = require('./tasks/perf-test');
const { preset, just } = require('@uifabric/build');
const { task, series } = just;

preset();

task('run-perf-test', perfTest);
task('perf-test', series('build', 'run-perf-test'));
