import { preset, task, resolveCwd } from '@fluentui/scripts';
import { run } from 'parallel-webpack';

preset();

// This pacakge doesn't currently have any files that are included in the eslint task
// (it only runs on src, not config files)
task('code-style', 'prettier');

task('bundle', done => {
  run(resolveCwd('webpack.config.js'), {}, done);
});
