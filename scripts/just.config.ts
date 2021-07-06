import { task, series, parallel, condition, option, argv, addResolvePath } from 'just-scripts';
import { Arguments } from 'yargs-parser';

import path from 'path';
import fs from 'fs';

import { babel } from './tasks/babel';
import { clean } from './tasks/clean';
import { copy } from './tasks/copy';
import { jest as jestTask, jestWatch } from './tasks/jest';
import { sass } from './tasks/sass';
import { ts } from './tasks/ts';
import { eslint } from './tasks/eslint';
import { webpack, webpackDevServer } from './tasks/webpack';
import { apiExtractor } from './tasks/api-extractor';
import { lintImports } from './tasks/lint-imports';
import { prettier } from './tasks/prettier';
import { checkForModifiedFiles } from './tasks/check-for-modified-files';
import { generateVersionFiles } from './tasks/generate-version-files';
import { postprocessTask } from './tasks/postprocess';
import { postprocessAmdTask } from './tasks/postprocess-amd';
import { postprocessCommonjsTask } from './tasks/postprocess-commonjs';
import { startStorybookTask, buildStorybookTask } from './tasks/storybook';

interface BasicPresetArgs extends Arguments {
  babel: boolean;
  production: boolean;
  webpackConfig: string;
  commonjs: boolean;
  cached: boolean;
  registry: string;
  push: boolean;
  package: string;
  min: boolean;
}

function getJustArgv() {
  return argv() as Partial<BasicPresetArgs>;
}

/** Do only the bare minimum setup of options and resolve paths */
function basicPreset() {
  // this adds a resolve path for the build tooling deps like TS from the scripts folder
  addResolvePath(__dirname);

  option('production');

  option('webpackConfig', { alias: 'w' });

  // Build only commonjs (not other TS variants) but still run other tasks
  option('commonjs');

  option('cached', { default: false } as any);

  option('registry', { default: 'https://registry.npmjs.org' } as any);

  option('push', { default: true } as any);

  option('package', { alias: 'p' });
}

export function preset() {
  basicPreset();

  task('no-op', () => {}).cached();
  task('clean', clean);
  task('copy', copy);
  task('jest', jestTask);
  task('jest-watch', jestWatch);
  task('sass', sass);
  task('ts:postprocess', postprocessTask());
  task('postprocess:amd', postprocessAmdTask);
  task('postprocess:commonjs', postprocessCommonjsTask);
  task('ts:commonjs', series(ts.commonjs, 'postprocess:commonjs'));
  task('ts:esm', ts.esm);
  task('ts:amd', series(ts.amd, 'postprocess:amd'));
  task('eslint', eslint);
  task('ts:commonjs-only', ts.commonjsOnly);
  task('webpack', webpack);
  task('webpack-dev-server', webpackDevServer(getJustArgv()));
  task('api-extractor', apiExtractor());
  task('lint-imports', lintImports);
  task('prettier', prettier);
  task('check-for-modified-files', checkForModifiedFiles);
  task('generate-version-files', generateVersionFiles);
  task('storybook:start', startStorybookTask());
  task('storybook:build', buildStorybookTask());
  task('babel:postprocess', babel);

  task('ts:compile', () => {
    const args = getJustArgv();

    return args.commonjs
      ? 'ts:commonjs-only'
      : parallel(
          condition('ts:commonjs', () => !args.min),
          'ts:esm',
          condition('ts:amd', () => !!args.production),
        );
  });

  task('ts', () => {
    return series(
      'ts:compile',
      'ts:postprocess',
      condition('babel:postprocess', () => fs.existsSync(path.join(process.cwd(), '.babelrc.json'))),
    );
  });

  task(
    'test',
    condition('jest', () => fs.existsSync(path.join(process.cwd(), 'jest.config.js'))),
  );

  task('lint', parallel('lint-imports', 'eslint'));

  task('code-style', series('prettier', 'lint'));

  task('dev:storybook', series('storybook:start'));
  task('dev', series('copy', 'sass', 'webpack-dev-server'));

  task('build:node-lib', series('clean', 'copy', 'ts:commonjs-only')).cached();

  task(
    'build',
    series(
      'clean',
      'copy',
      'sass',
      'ts',
      condition('api-extractor', () => !getJustArgv().min),
    ),
  ).cached();

  task(
    'bundle',
    condition('webpack', () => fs.existsSync(path.join(process.cwd(), 'webpack.config.js'))),
  );
}

preset.basic = basicPreset;

if (process.cwd() === __dirname) {
  // load the preset if this is being run within the scripts package
  preset();
}
