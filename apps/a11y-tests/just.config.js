const { preset, just } = require('@uifabric/build');
const { task, series, parallel, condition, argv } = just;

preset();

task('build', series('clean', 'ts:commonjs-only'));
