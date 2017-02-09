'use strict';

let gulp = require('gulp');
let path = require('path');
let build = require('@microsoft/web-library-build');
let buildConfig = build.getConfig();

let isProduction = process.argv.indexOf('--production') >= 0;
let isClean = process.argv.indexOf('clean') >= 0;

build.tslint.setConfig({ lintConfig: require('./tslint.json') });

/* Configure TypeScript 2.0. */
build.typescript.setConfig({ typescript: require('typescript') });

/** Disable webpack. */
build.webpack.isEnabled = () => false;

/** Disable tests until we need them. */
build.karma.isEnabled = () => false;

let packageFolder = buildConfig.packageFolder || '';
let distFolder = buildConfig.distFolder;

if (isProduction || isClean) {
  build.setConfig({
    libAMDFolder: path.join(packageFolder, 'lib-amd')
  });
}
// initialize tasks.
build.initialize(gulp);
