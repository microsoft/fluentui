'use strict';

let build = require('@microsoft/web-library-build');
let serial = build.serial;
let parallel = build.parallel;
let buildConfig = build.getConfig();
let gulp = require('gulp');
let configFile = "./ftpconfig.json";
let fs = require('fs');
let path = require('path');
let del = require('del');
let gulpConnect = require('gulp-connect');

let isProduction = process.argv.indexOf('--production') >= 0;
let isNuke = process.argv.indexOf('nuke') >= 0;
let {
  libFolder,
  distFolder,
  packageFolder = ''
} = buildConfig;

// Configure custom lint overrides.
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
// build.typescript.setConfig({ typescript: require('typescript') });
build.TypeScriptConfiguration.setTypescriptCompiler(require('typescript'));
// Use css modules.
build.sass.setConfig({
  useCSSModules: true,
  moduleExportName: ''
});

// Use Karma Tests - Disable during develoment if prefered
// Set to false for experiments. Tests don't need to pass for code to live in experiments
build.karma.isEnabled = () => false;

// Disable unnecessary subtasks.
build.preCopy.isEnabled = () => false;

// Until typings work.
//build.apiExtractor.isEnabled = () => false;

// Copy fabric-core to dist to be published with fabric-react.
build.postCopy.setConfig({
  shouldFlatten: false,
  copyTo: {
    [path.join(distFolder, 'sass')]: [
      'node_modules/office-ui-fabric-core/dist/sass/**/*.*'
    ],
    [path.join(distFolder, 'css')]: [
      'node_modules/office-ui-fabric-core/dist/css/**/*.*'
    ]
  }
});

// Produce AMD bits in lib-amd on production builds.
if (isProduction || isNuke) {
  build.setConfig({
    libAMDFolder: path.join(packageFolder, 'lib-amd')
  });
}

// Short aliases for subtasks.
build.task('webpack', build.webpack);
build.task('tslint', build.tslint);
build.task('ts', build.typescript);
build.task('sass', build.sass);

// initialize tasks.
build.initialize(gulp);