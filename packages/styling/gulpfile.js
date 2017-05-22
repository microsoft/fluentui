'use strict';

let build = require('@microsoft/sp-build-web');
let gulp = require('gulp');

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
build.tslint.setConfig({ lintConfig: { rules } });

// Disable all unnecessary tasks.
build.sass.isEnabled = () => false;
build.karma.isEnabled = () => false;
build.text.isEnabled = () => false;
build.preCopy.isEnabled = () => false;

// Until typings work.
build.apiExtractor.isEnabled = () => false;

