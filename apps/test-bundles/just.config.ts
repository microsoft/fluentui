const { preset, just } = require('@uifabric/build');
const { task, resolveCwd } = just;
const { run } = require('parallel-webpack');

preset();

// This pacakge doesn't currently have any files that are included in the eslint task
// (it only runs on src, not config files)
task('code-style', 'prettier');

task('bundle', done => {
  run(resolveCwd('webpack.config.js'), {}, done);
});
