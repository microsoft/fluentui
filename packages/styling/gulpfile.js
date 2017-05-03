'use strict';

let build = require('@microsoft/web-library-build');
let gulp = require('gulp');

// Configure TypeScript.
build.TypeScriptConfiguration.setTypescriptCompiler(require('typescript'));

// Configure custom lint overrides.
let rules = Object.assign(
  {},
  require('./node_modules/@microsoft/gulp-core-build-typescript/lib/defaultTslint.json').rules,
  require('../../tslint.json').rules
);
build.tslint.setConfig({ lintConfig: { rules } });

// Disable all unnecessary tasks.
build.sass.isEnabled = () => false;
build.karma.isEnabled = () => false;
build.text.isEnabled = () => false;
build.preCopy.isEnabled = () => false;
build.webpack.isEnabled = () => false;

// Until typings work.
//build.apiExtractor.isEnabled = () => false;

// initialize tasks.
build.initialize(gulp);