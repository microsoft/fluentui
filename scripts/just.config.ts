import { task, series, parallel, condition, option, argv, addResolvePath, resolveCwd } from 'just-scripts';

import path from 'path';
import fs from 'fs';

import { clean } from './tasks/clean';
import { copy } from './tasks/copy';
import { jest, jestWatch } from './tasks/jest';
import { sass } from './tasks/sass';
import { ts } from './tasks/ts';
import { tslint } from './tasks/tslint';
import { webpack, webpackDevServer } from './tasks/webpack';
import { verifyApiExtractor, updateApiExtractor } from './tasks/api-extractor';
import lintImports from './tasks/lint-imports';
import prettier from './tasks/prettier';
import bundleSizeCollect from './tasks/bundle-size-collect';
import checkForModifiedFiles from './tasks/check-for-modified-files';
import generateVersionFiles from './tasks/generate-version-files';
import generatePackageManifestTask from './tasks/generate-package-manifest';
import { postprocessTask } from './tasks/postprocess';
import { postprocessAmdTask } from './tasks/postprocess-amd';
import { postprocessCommonjsTask } from './tasks/postprocess-commonjs';
import { startStorybookTask, buildStorybookTask } from './tasks/storybookTask';

/** Do only the bare minimum setup of options and resolve paths */
export function basic() {
  // this adds a resolve path for the build tooling deps like TS from the scripts folder
  addResolvePath(__dirname);

  option('production');

  option('webpackConfig', { alias: 'w' });

  // Build only commonjs (not other TS variants) but still run other tasks
  option('commonjs');

  option('cached', { default: false });
}

export function preset() {
  basic();

  task('clean', clean);
  task('copy', copy);
  task('jest', jest);
  task('jest-watch', jestWatch);
  task('sass', sass);
  task('ts:postprocess', postprocessTask());
  task('postprocess:amd', postprocessAmdTask);
  task('postprocess:commonjs', postprocessCommonjsTask);
  task('ts:commonjs', ts.commonjs);
  task('ts:esm', ts.esm);
  task('ts:amd', series(ts.amd, 'postprocess:amd'));
  task('tslint', tslint);
  task('ts:commonjs-only', ts.commonjsOnly);
  task('webpack', webpack);
  task('webpack-dev-server', webpackDevServer);
  task('api-extractor:verify', verifyApiExtractor);
  task('api-extractor:update', updateApiExtractor);
  task('lint-imports', lintImports);
  task('prettier', prettier);
  task('bundle-size-collect', bundleSizeCollect);
  task('check-for-modified-files', checkForModifiedFiles);
  task('generate-version-files', generateVersionFiles);
  task('generate-package-manifest', generatePackageManifestTask);
  task('storybook:start', startStorybookTask());
  task('storybook:build', buildStorybookTask());

  task('ts:compile', () => {
    return argv().commonjs ? 'ts:commonjs-only' : parallel('ts:commonjs', 'ts:esm', condition('ts:amd', () => !!argv().production));
  });

  task('ts', series('ts:compile', 'ts:postprocess'));

  task('test', condition('jest', () => fs.existsSync(path.join(process.cwd(), 'jest.config.js'))));

  task('lint', parallel('lint-imports', 'tslint'));

  task('code-style', series('prettier', 'tslint'));
  task('update-api', series('clean', 'copy', 'sass', 'ts', 'api-extractor:update'));

  task('dev:storybook', series('clean', 'copy', 'sass', 'storybook:start'));
  task('dev', series('clean', 'copy', 'sass', 'webpack-dev-server'));

  task('build:node-lib', series('clean', 'copy', 'ts:commonjs-only')).cached();

  task(
    'build',
    series(
      'clean',
      'copy',
      'sass',
      'ts',
      condition('api-extractor:verify', () => fs.existsSync(path.join(process.cwd(), 'config/api-extractor.json')))
    )
  ).cached();

  task(
    'bundle',
    parallel(
      condition('webpack', () => !!resolveCwd('webpack.config.js')),
      condition('storybook:build', () => !!resolveCwd('./.storybook/main.js'))
    )
  );

  task('no-op', () => {}).cached();
}
