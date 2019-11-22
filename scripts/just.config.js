// @ts-check

const { task, series, parallel, condition, option, argv, addResolvePath, resolveCwd } = require('just-scripts');

const path = require('path');
const fs = require('fs');

const { clean } = require('./tasks/clean');
const { copy } = require('./tasks/copy');
const { jest, jestWatch } = require('./tasks/jest');
const { sass } = require('./tasks/sass');
const { ts } = require('./tasks/ts');
const { tslint } = require('./tasks/tslint');
const { webpack, webpackDevServer } = require('./tasks/webpack');
const { verifyApiExtractor, updateApiExtractor } = require('./tasks/api-extractor');
const lintImports = require('./tasks/lint-imports');
const prettier = require('./tasks/prettier');
const bundleSizeCollect = require('./tasks/bundle-size-collect');
const checkForModifiedFiles = require('./tasks/check-for-modified-files');
const generateVersionFiles = require('./tasks/generate-version-files');
const generatePackageManifestTask = require('./tasks/generate-package-manifest');
const { postprocessAmdTask } = require('./tasks/postprocess-amd');
const { postprocessCommonjsTask } = require('./tasks/postprocess-commonjs');

/** Do only the bare minimum setup of options and resolve paths */
function basicPreset() {
  // this adds a resolve path for the build tooling deps like TS from the scripts folder
  addResolvePath(__dirname);

  option('production');

  // Adds an alias for 'npm-install-mode' for backwards compatibility
  option('min', { alias: 'npm-install-mode' });

  option('webpackConfig', { alias: 'w' });

  // Build only commonjs (not other TS variants) but still run other tasks
  option('commonjs');

  option('cached', { default: false });
}

module.exports = function preset() {
  basicPreset();

  task('clean', clean);
  task('copy', copy);
  task('jest', jest);
  task('jest-watch', jestWatch);
  task('sass', sass);
  task('postprocess:amd', postprocessAmdTask);
  task('postprocess:commonjs', postprocessCommonjsTask);
  task('ts:commonjs', ts.commonjs);
  task('ts:esm', ts.esm);
  task('ts:amd', series(ts.amd, 'postprocess:amd'));
  task('tslint', tslint);
  task('ts:commonjs-only', ts.commonjsOnly);
  task('webpack', webpack);
  task('webpack-dev-server', webpackDevServer);
  task('verify-api-extractor', verifyApiExtractor);
  task('update-api-extractor', updateApiExtractor);
  task('lint-imports', lintImports);
  task('prettier', prettier);
  task('bundle-size-collect', bundleSizeCollect);
  task('check-for-modified-files', checkForModifiedFiles);
  task('generate-version-files', generateVersionFiles);
  task('generate-package-manifest', generatePackageManifestTask);
  task('ts', () => {
    return argv().commonjs
      ? 'ts:commonjs-only'
      : parallel('ts:commonjs', 'ts:esm', condition('ts:amd', () => argv().production && !argv().min));
  });

  task('validate', fs.existsSync(path.join(process.cwd(), 'jest.config.js')) ? series('tslint', 'jest') : 'tslint');
  task('code-style', series('prettier', 'tslint'));
  task('update-api', series('clean', 'copy', 'sass', 'ts', 'update-api-extractor'));
  task('dev', series('clean', 'copy', 'sass', 'webpack-dev-server'));

  task('build:node-lib', series('clean', 'copy', series(condition('validate', () => !argv().min), 'ts:commonjs-only'))).cached();

  task(
    'build',
    series(
      'clean',
      'copy',
      'sass',
      parallel(
        condition('validate', () => !argv().min),
        series(
          'ts',
          parallel(
            condition('webpack', () => !argv().min && !!resolveCwd('webpack.config.js')),
            condition('lint-imports', () => !argv().min)
          )
        )
      )
    )
  ).cached();

  task('no-op', () => {}).cached();
};

module.exports.basic = basicPreset;
