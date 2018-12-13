// @ts-check

const { task, series, parallel, condition, option, argv } = require('just-task');
const { rig } = require('./just-tasks');

option('production');
option('min');

task('clean', rig.clean);
task('copy', rig.copy);
task('jest', rig.jest);
task('tslint', rig.tslint);
task('sass', rig.sass);
task('ts:commonjs', rig.ts.commonJs);
task('ts:esm', rig.ts.esm);
task('ts:amd', rig.ts.amd);
task('webpack', rig.webpack);
task('outdated', rig.outdated);
task('selfupdate', rig.selfupdate);
task('api-extractor', rig.apiExtractor);
task('lint-imports', rig.lintImports);
task('build-codepen-examples', rig.buildCodepenExamples);

task(
  'build',
  series(
    'clean',
    'copy',
    'sass',
    parallel(
      parallel(condition('tslint', () => !argv().min)),
      condition('jest', () => !argv().min),
      series(
        parallel(condition('ts:commonjs', () => !argv().min), 'ts:esm', condition('ts:amd', () => argv().production && !argv().min)),
        condition('lint-imports', () => !argv().min),
        parallel(
          condition('webpack', () => !argv().min),
          condition('api-extractor', () => !argv().min),
          condition('build-codepen-examples', () => !argv().min)
        )
      )
    )
  )
);
