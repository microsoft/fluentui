const { preset, just } = require('@uifabric/build');
const { task, series, condition, argv } = just;

preset();

task('build', series('clean', 'ts:commonjs-only', condition('jest', () => !argv().min))).cached();
