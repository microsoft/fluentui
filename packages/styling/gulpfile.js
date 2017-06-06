'use strict';

let build = require('@microsoft/sp-build-web');
let path = require('path');
let gulp = require('gulp');
let buildConfig = build.getConfig();

let isProduction = process.argv.indexOf('--production') >= 0;
let isClean = process.argv.indexOf('clean') >= 0;

// initialize tasks.
build.initialize(gulp);

// Configure TypeScript
build.TypeScriptConfiguration.setTypescriptCompiler(require('typescript'));

// Configure custom lint overrides.
let rules = Object.assign(
  {},
  require('@microsoft/gulp-core-build-typescript/lib/defaultTslint.json').rules,
  require('./node_modules/office-ui-fabric-react-tslint/tslint.json').rules,
  require('./tslint.json').rules
);
build.tslint.setConfig({
  lintConfig: { rules },
  displayAsWarning: false
});

// Disable all unnecessary tasks.
build.sass.isEnabled = () => false;
build.karma.isEnabled = () => false;
build.text.isEnabled = () => false;
build.preCopy.isEnabled = () => false;

let packageFolder = buildConfig.packageFolder || '';
let distFolder = buildConfig.distFolder;

if (isProduction || isClean) {
  build.setConfig({
    libAMDFolder: path.join(packageFolder, 'lib-amd')
  });
}

// Until typings work.
build.apiExtractor.isEnabled = () => false;
