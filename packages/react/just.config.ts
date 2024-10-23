import { task, webpackDevServerTask, preset } from '@fluentui/scripts-tasks';

preset();

task('build', 'build:react-with-umd');
task(
  'mf',
  webpackDevServerTask({
    config: 'webpack.mf.config.js',
  }),
);
