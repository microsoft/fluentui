const { preset, just } = require('@uifabric/build');
const { task, series } = just;

preset();
// TODO remove, fix tests on windows environments
task('build', series('clean', 'copy', 'ts:commonjs-only')).cached();
