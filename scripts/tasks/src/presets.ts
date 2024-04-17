import fs from 'fs';
import path from 'path';

import { addResolvePath, condition, option, parallel, series, task } from 'just-scripts';

import { apiExtractor } from './api-extractor';
import { JustArgs, getJustArgv } from './argv';
import { babel } from './babel';
import { clean } from './clean';
import { copy, copyCompiledFactory } from './copy';
import { eslint } from './eslint';
import { generateApi } from './generate-api';
import { jest as jestTask, jestWatch } from './jest';
import { lintImportTaskAll, lintImportTaskAmdOnly } from './lint-imports';
import { getRawMetadata } from './metadata-utils';
import { postprocessTask } from './postprocess';
import { postprocessAmdTask } from './postprocess-amd';
import { prettier } from './prettier';
import { sass } from './sass';
import { buildStorybookTask, startStorybookTask } from './storybook';
import { swc } from './swc';
import { ts } from './ts';
import { typeCheck } from './type-check';
import { verifyPackaging } from './verify-packaging';
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
  const metadata = getRawMetadata(process.cwd());

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  task('no-op', () => {}).cached!();
  task('clean', clean);
  task('copy', copy);
  task('copy-compiled', copyCompiledFactory(metadata));
  task('jest', jestTask);
  task('jest-watch', jestWatch);
  task('sass', sass(metadata.hasSass()));
  task('ts:postprocess', postprocessTask());
  task('postprocess:amd', postprocessAmdTask);
  task('ts:commonjs', ts.commonjs);
  task('ts:esm', ts.esm);
  task('ts:amd', series(ts.amd, 'postprocess:amd'));
  task('eslint', eslint);
  task('webpack', webpack);
  task('webpack-dev-server', webpackDevServer(args));
  task('api-extractor', apiExtractor);
  task('lint-imports:all', lintImportTaskAll);
  task('lint-imports:amd', lintImportTaskAmdOnly);
  task('prettier', prettier);
  task('storybook:start', startStorybookTask());
  task('storybook:build', buildStorybookTask());
  task('babel:postprocess', babel);
  task('generate-api', generateApi);
  task('type-check', typeCheck);
  task('verify-packaging', () => verifyPackaging(args));

  task('ts:compile', () => {
    const moduleFlag = args.module;
    // default behaviour
    if (!moduleFlag) {
      return parallel(
        'ts:commonjs',
        'ts:esm',
        condition('ts:amd', () => !!args.production && !metadata.isConverged()),
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
      condition('babel:postprocess', () => metadata.hasBabel()),
    );
  });

  task(
    'test',
    condition('jest', () => fs.existsSync(path.join(process.cwd(), 'jest.config.js'))),
  );

  task('lint', 'eslint');

  task('swc:commonjs', swc.commonjs);
  task('swc:esm', swc.esm);
  task('swc:amd', swc.amd);

  task('swc:compile', () => {
    const moduleFlag = args.module;
    return series(
      'swc:esm',
      condition('babel:postprocess', () => metadata.hasBabel()),
      resolveModuleCompilation(moduleFlag),
    );
  });

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
      condition('lint-imports:all', () => !metadata.isConverged() && metadata.shipsAMD()),
      condition('lint-imports:amd', () => metadata.isConverged() && metadata.shipsAMD()),
    ),
  ).cached!();

  task('build:react-components', () => {
    return series(
      'clean',
      'copy',
      condition('sass', () => metadata.hasSass()),
      parallel('swc:compile', 'generate-api'),
    );
  }).cached!();

  task(
    'bundle',
    condition('webpack', () => fs.existsSync(path.join(process.cwd(), 'webpack.config.js'))),
  );

  function resolveModuleCompilation(moduleFlag?: JustArgs['module']) {
    // default behaviour
    if (!moduleFlag) {
      return parallel(
        'swc:commonjs',
        condition('swc:amd', () => Boolean(args.production) && !metadata.isConverged()),
      );
    }

    return parallel(
      condition('swc:commonjs', () => moduleFlag.cjs),
      condition('swc:amd', () => moduleFlag.amd),
    );
  }
}

if (process.cwd() === __dirname) {
  // load the preset if this is being run within the scripts package
  preset();
}
