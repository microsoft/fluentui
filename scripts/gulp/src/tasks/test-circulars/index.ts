import path from 'path';
import fs from 'fs';
import { task, series } from 'gulp';
import webpackPlugin from '../../plugins/gulp-webpack';

import config from '../../config';

import { cyclesToSkip } from './config';
import { buildWebpackConfig, configureCircularDependencyCheckPlugin, isCycleToSkip } from './utils';

const entryFilePath = config.paths.packageDist('react-northstar', 'es', 'index.js');
const outputFilePath = path.resolve(__dirname, 'result.js');

task('test:circulars:run', done => {
  const webpackConfig = buildWebpackConfig({
    entryFilePath,
    outputFilePath,
    plugins: [
      configureCircularDependencyCheckPlugin(({ paths, compilation }) => {
        const absolutePathsCycle = paths.map(filePath => config.paths.base(filePath));
        if (isCycleToSkip(absolutePathsCycle, cyclesToSkip)) {
          return;
        }

        const relativePathsCycle = absolutePathsCycle.map(absolutePath =>
          path.relative(config.paths.base(), absolutePath),
        );
        compilation.errors.push(new Error(relativePathsCycle.join(' -> ')));
      }),
    ],
  });

  webpackPlugin(webpackConfig, done, () => {
    if (fs.existsSync(outputFilePath)) {
      fs.unlinkSync(outputFilePath);
    }
  });
});

task('test:circulars', series('test:circulars:run'));
