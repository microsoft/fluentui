'use strict';

let gulp = require('gulp');
let path = require('path');
let build = require('@microsoft/web-library-build');
let buildConfig = build.getConfig();

let isProduction = process.argv.indexOf('--production') >= 0;
let isClean = process.argv.indexOf('clean') >= 0;

/* Configure lint rules */
let rules = Object.assign(
  {},
  require('./node_modules/@microsoft/gulp-core-build-typescript/lib/defaultTslint.json').rules,
  require('../../tslint.json').rules,
  require('./tslint.json').rules
);
build.tslint.setConfig({ lintConfig: { rules } });

/* Configure TypeScript 2.0. */
build.typescript.setConfig({ typescript: require('typescript') });

// Use css modules.
build.sass.setConfig({ useCSSModules: true });

/** Disable webpack. */
build.webpack.isEnabled = () => false;

let packageFolder = buildConfig.packageFolder || '';
let distFolder = buildConfig.distFolder;

if (isProduction || isClean) {
  build.setConfig({
    libAMDFolder: path.join(packageFolder, 'lib-amd')
  });
}

build.task('tslint', build.tslint);

// initialize tasks.
build.initialize(gulp);
