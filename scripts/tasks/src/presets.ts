import fs from 'fs';
import path from 'path';

import { isConvergedPackage, shipsAMD } from '@fluentui/scripts-monorepo';
import { addResolvePath, condition, option, parallel, series, task } from 'just-scripts';

import { apiExtractor } from './api-extractor';
import { getJustArgv } from './argv';
import { babel } from './babel';
import { clean } from './clean';
import { copy, copyCompiled } from './copy';
import { eslint } from './eslint';
import { jest as jestTask, jestWatch } from './jest';
import { lintImportTaskAll, lintImportTaskAmdOnly } from './lint-imports';
import { postprocessTask } from './postprocess';
import { postprocessAmdTask } from './postprocess-amd';
import { prettier } from './prettier';
import { sass } from './sass';
import { buildStorybookTask, startStorybookTask } from './storybook';
import { ts } from './ts';
import { webpack, webpackDevServer } from './webpack';

/** Do only the bare minimum setup of options and resolve paths */
function basicPreset() {
  // this adds a resolve path for the build tooling deps like TS from the scripts folder
  addResolvePath(__dirname);

  option('production');

  option('webpackConfig', { alias: 'w' });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  option('cached', { default: false } as any);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  option('registry', { default: 'https://registry.npmjs.org' } as any);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  option('push', { default: true } as any);

  option('package', { alias: 'p' });
}

export function preset() {
  basicPreset();

  const args = getJustArgv();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  task('no-op', () => {}).cached!();
  task('clean', clean);
  task('copy', copy);
  task('copy-compiled', copyCompiled);
  task('jest', jestTask);
  task('jest-watch', jestWatch);
  task('sass', sass());
  task('ts:postprocess', postprocessTask());
  task('postprocess:amd', postprocessAmdTask);
  task('ts:commonjs', ts.commonjs);
  task('ts:esm', ts.esm);
  task('ts:amd', series(ts.amd, 'postprocess:amd'));
  task('eslint', eslint);
  task('webpack', webpack);
  task('webpack-dev-server', webpackDevServer(args));
  task('api-extractor', apiExtractor());
  task('lint-imports:all', lintImportTaskAll);
  task('lint-imports:amd', lintImportTaskAmdOnly);
  task('prettier', prettier);
  task('storybook:start', startStorybookTask());
  task('storybook:build', buildStorybookTask());
  task('babel:postprocess', babel);

  task('ts:compile', () => {
    const moduleFlag = args.module;
    // default behaviour
    if (!moduleFlag) {
      return parallel(
        'ts:commonjs',
        'ts:esm',
        condition('ts:amd', () => !!args.production && !isConvergedPackage()),
      );
    }

    return parallel(
      condition('ts:commonjs', () => moduleFlag.cjs),
      condition('ts:esm', () => moduleFlag.esm),
      condition('ts:amd', () => moduleFlag.amd),
    );
  });

  task('ts', () => {
    return series(
      'ts:compile',
      'copy-compiled',
      'ts:postprocess',
      condition('babel:postprocess', () => fs.existsSync(path.join(process.cwd(), '.babelrc.json'))),
    );
  });

  task(
    'test',
    condition('jest', () => fs.existsSync(path.join(process.cwd(), 'jest.config.js'))),
  );

  task('lint', 'eslint');

  task('code-style', series('prettier', 'lint'));

  task('dev:storybook', series('storybook:start'));
  task('dev', series('copy', 'sass', 'webpack-dev-server'));

  task('build:node-lib', series('clean', 'copy', 'ts:commonjs')).cached!();

  task(
    'build',
    series(
      'clean',
      'copy',
      'sass',
      'ts',
      'api-extractor',
      condition('lint-imports:all', () => !isConvergedPackage() && shipsAMD()),
      condition('lint-imports:amd', () => isConvergedPackage() && shipsAMD()),
    ),
  ).cached!();

  task(
    'bundle',
    condition('webpack', () => fs.existsSync(path.join(process.cwd(), 'webpack.config.js'))),
  );
}

if (process.cwd() === __dirname) {
  // load the preset if this is being run within the scripts package
  preset();
}
