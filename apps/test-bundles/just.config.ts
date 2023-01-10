import { preset, task, resolveCwd } from '@fluentui/scripts-tasks';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - parallel-webpack has no types
import { run } from 'parallel-webpack';

preset();

// This pacakge doesn't currently have any files that are included in the eslint task
// (it only runs on src, not config files)
task('code-style', 'prettier');

task('bundle', done => {
  run(resolveCwd('webpack.config.js'), {}, done);
});
