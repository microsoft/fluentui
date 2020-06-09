const { preset, just } = require('@uifabric/build');
const { task, series } = just;

preset();

task('build', series('clean', 'ts')).cached();
