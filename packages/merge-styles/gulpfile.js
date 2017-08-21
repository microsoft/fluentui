'use strict';

let gulp = require('gulp');
let path = require('path');
let build = require('@microsoft/web-library-build');
let buildConfig = build.getConfig();

let isProduction = process.argv.indexOf('--production') >= 0;
let isClean = process.argv.indexOf('clean') >= 0;

// initialize tasks.
build.initialize(gulp);

/* Configure lint rules */
let rules = Object.assign(
  {},
  require('./node_modules/@microsoft/gulp-core-build-typescript/lib/defaultTslint.json').rules,
  require('./node_modules/office-ui-fabric-react-tslint/tslint.json').rules,
  require('./tslint.json').rules
);
build.tslint.setConfig({
  lintConfig: { rules },
  displayAsWarning: false
});

// Configure TypeScript.
build.TypeScriptConfiguration.setTypescriptCompiler(require('typescript'));

// Disable unnecessary steps.
build.preCopy.isEnabled = () => false;
build.postCopy.isEnabled = () => false;
build.text.isEnabled = () => false;
build.sass.isEnabled = () => false;

let packageFolder = buildConfig.packageFolder || '';
let distFolder = buildConfig.distFolder;

if (isProduction || isClean) {
  build.setConfig({
    libAMDFolder: path.join(packageFolder, 'lib-amd')
  });
}

build.task('tslint', build.tslint);
