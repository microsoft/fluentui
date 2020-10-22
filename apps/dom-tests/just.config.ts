import { preset, task, series } from '@fluentui/scripts';
import { jestDom } from '@fluentui/scripts/tasks/jest';
import { webpackDevServerWithCompileResolution } from '@fluentui/scripts/tasks/webpack';

preset();

task('jest-dom', jestDom);

task(
  'jest-dom-with-webpack',
  series(webpackDevServerWithCompileResolution, 'jest-dom', webpackDevServerWithCompileResolution.done),
);
