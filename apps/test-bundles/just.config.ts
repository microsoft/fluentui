import * as path from 'path';
import { preset, task, series } from '@fluentui/scripts-tasks';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - parallel-webpack has no types
import { run } from 'parallel-webpack';

import { bundleSizeCollect } from './scripts/bundle-size-collect';
import { mergeBundleSizes } from './scripts/merge-bundlesizes';

preset();

// This pacakge doesn't currently have any files that are included in the eslint task
// (it only runs on src, not config files)
task('code-style', 'prettier');

task('bundle-size-collect', () => {
  const packageName = process.env.PACKAGE ?? '';
  bundleSizeCollect({ packageName });
});

task('bundle', done => {
  const configPath = path.join(__dirname, 'webpack.config.js');
  const options = {};
  run(configPath, options, done);
});

task('bundle-size-merge', () => {
  const root = path.join(__dirname, 'dist');
  mergeBundleSizes(
    [path.join(root, 'react/bundlesize.json'), path.join(root, 'react-northstar/bundlesize.json')],
    path.join(root, 'bundlesizes.json'),
  );
});

task('bundle-size', series('bundle', 'bundle-size-collect'));
