'use strict';

let build = require('@microsoft/web-library-build');
let serial = build.serial;
let buildConfig = build.getConfig();
let gulp = require('gulp');
let configFile = "./ftpconfig.json";
let fs = require('fs');
let path = require('path');

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
  require('../../tslint.json').rules,
  require('./tslint.json').rules
);
build.tslint.setConfig({ lintConfig: { rules } });

// Configure TypeScript 2.0.
build.typescript.setConfig({ typescript: require('typescript') });

// Use css modules.
build.sass.setConfig({
  useCSSModules: true,
  moduleExportName: ''
});

// Use Karma Tests - Disable during develoment if prefered
build.karma.isEnabled = () => true;

// Disable unnecessary subtasks.
build.preCopy.isEnabled = () => false;

// Until typings work.
//build.apiExtractor.isEnabled = () => false;

// Copy fabric-core to dist to be published with fabric-react.
build.postCopy.setConfig({
  shouldFlatten: false,
  copyTo: {
    [path.join(distFolder, 'sass')]: [
      'node_modules/office-ui-fabric-core/dist/sass/*.*'
    ],
    [path.join(distFolder, 'css')]: [
      'node_modules/office-ui-fabric-core/dist/css/*.*'
    ],
    [libFolder]: [
      'src/**/*.Example.tsx',
      'src/**/*.Props.ts'
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