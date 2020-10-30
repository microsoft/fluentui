import { task, series, parallel, src, dest } from 'gulp';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import del from 'del';

import config from '../../config';
import sh from '../sh';

const { paths } = config;

const packageName = config.package;

// ----------------------------------------
// Clean
// ----------------------------------------

task('bundle:package:clean', () =>
  del(
    [
      `${paths.packageDist(packageName)}/es/*`,
      `${paths.packageDist(packageName)}/commonjs/*`,
      `${paths.packageDist(packageName)}/dts`,
    ],
    { force: true },
  ),
);

// ----------------------------------------
// Build
// ----------------------------------------

const componentsSrc = [paths.packageSrc(packageName, '**/*.{ts,tsx}')];

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
task('bundle:package:types', series('bundle:package:types:tsc', 'bundle:package:types:copy'));

// ----------------------------------------
// Default
// ----------------------------------------

task(
  'bundle:package:no-umd',
  series('bundle:package:clean', parallel('bundle:package:commonjs', 'bundle:package:es', 'bundle:package:types')),
);
