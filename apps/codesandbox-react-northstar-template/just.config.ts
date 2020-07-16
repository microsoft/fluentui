const { preset, just } = require('@uifabric/build');
const { task } = just;

preset();

task('build', 'ts:commonjs-only');
