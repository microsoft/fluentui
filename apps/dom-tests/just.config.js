const { preset, just } = require('@uifabric/build');
const { jestDom } = require('@uifabric/build/tasks/jest');
const { webpackDevServerWithCompileResolution } = require('@uifabric/build/tasks/webpack');
const { task, series } = just;

preset();

task('jest-dom', jestDom);

task('jest-dom-with-webpack', series(webpackDevServerWithCompileResolution, 'jest-dom', webpackDevServerWithCompileResolution.done));
