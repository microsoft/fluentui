import { task, series, parallel, src, dest } from 'gulp';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import del from 'del';

import { sh } from '@fluentui/scripts-utils';

import config from '../config';

const { paths } = config;

const packageName = config.package;

// ----------------------------------------
// Clean
// ----------------------------------------

task('bundle:package:clean', () => del([`${paths.packageDist(packageName)}`], { force: true }));

// ----------------------------------------
// Build
// ----------------------------------------

const componentsSrc = [paths.packageSrc(packageName, '**/*.{ts,tsx}')];

// eslint-disable-next-line prefer-arrow-callback
task('copy:readme', function () {
  return src(paths.packages('', 'README.md')).pipe(dest(paths.packages('react-northstar')));
});

task('bundle:package:commonjs', () =>
  src(componentsSrc)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.packageDist(packageName, 'commonjs'))),
);

task('bundle:package:es', () =>
  src(componentsSrc)
    .pipe(sourcemaps.init())
    .pipe(babel({ caller: { useESModules: true } } as any))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.packageDist(packageName, 'es'))),
);

task('bundle:package:types:tsc', () => {
  return sh('tsc -b', paths.packages(packageName));
});
task('bundle:package:types:copy', () => {
  return src(paths.packageDist(packageName, 'dts/src/**/*.d.ts')).pipe(dest(paths.packageDist(packageName, 'es')));
});
task('bundle:package:types:clean', () => {
  return del([`${paths.packageDist(packageName)}/dts`], { force: true });
});

task(
  'bundle:package:types',
  series('bundle:package:types:tsc', 'bundle:package:types:copy', 'bundle:package:types:clean'),
);

// ----------------------------------------
// Default
// ----------------------------------------

task(
  'bundle:package:no-umd',
  series('bundle:package:clean', parallel('bundle:package:commonjs', 'bundle:package:es', 'bundle:package:types')),
);
