import { task, series, parallel, src, dest } from 'gulp';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import { log, PluginError } from 'gulp-util';
import del from 'del';
import webpack from 'webpack';

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
      `${paths.packageDist(packageName)}/umd/*`,
      `${paths.packageDist(packageName)}/dts`,
    ],
    { force: true },
  ),
);

// ----------------------------------------
// Build
// ----------------------------------------
const componentsSrc = [
  paths.packageSrc(packageName, '**/*.{ts,tsx}'),
  `!${paths.packageSrc(packageName, '**/umd.ts')}`,
];

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

task('bundle:package:umd', cb => {
  process.env.NODE_ENV = 'build';
  const webpackUMDConfig = require('../../webpack/webpack.config.umd').default;
  const compiler = webpack(webpackUMDConfig(packageName));

  compiler.run((err, stats) => {
    const { errors, warnings } = stats.toJson();

    log(stats.toString(config.compiler_stats));

    if (err) {
      log('Webpack compiler encountered a fatal error.');
      throw new PluginError('webpack', err.toString());
    }
    if (errors.length > 0) {
      log('Webpack compiler encountered errors.');
      throw new PluginError('webpack', errors.toString());
    }
    if (warnings.length > 0) {
      throw new PluginError('webpack', warnings.toString());
    }

    cb(err);
  });
});

// ----------------------------------------
// Default
// ----------------------------------------

task(
  'bundle:package:no-umd',
  series('bundle:package:clean', parallel('bundle:package:commonjs', 'bundle:package:es', 'bundle:package:types')),
);
task('bundle:package', series('bundle:package:no-umd', 'bundle:package:umd'));
