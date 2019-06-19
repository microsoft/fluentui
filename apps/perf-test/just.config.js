const perfTest = require('./tasks/perf-test');
const { preset, just } = require('@uifabric/build');
const { task } = just;

preset();

task('perf-test', perfTest);
