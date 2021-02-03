import { task, webpackDevServerTask, preset } from '@fluentui/scripts';

preset();

task(
  'mf',
  webpackDevServerTask({
    config: 'webpack.mf.config.js',
  }),
);
