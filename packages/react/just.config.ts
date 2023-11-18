import { task, webpackDevServerTask, preset } from '@fluentui/scripts-tasks';

preset();

task(
  'mf',
  webpackDevServerTask({
    config: 'webpack.mf.config.js',
  }),
);
