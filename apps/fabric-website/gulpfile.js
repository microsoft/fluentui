'use strict';

let build = require('@microsoft/web-library-build');
let gulp = require('gulp');
let buildConfig = build.getConfig();
let distFolder = buildConfig.distFolder;
let path = require('path');
let packageFolder = buildConfig.packageFolder || '';
let isProduction = process.argv.indexOf('--production') >= 0;
let isNuke = process.argv.indexOf('nuke') >= 0;


/** @todo: disable lint config. */
build.tslint.setConfig({
  lintConfig: require('./tslint.json'),
  sourceMatch: ['src/**/*.ts', 'src/**/*.tsx', '!src/**/*.scss.tsx']
});

// Configure custom lint overrides.
let rules = Object.assign(
  {},
  require('./node_modules/@microsoft/gulp-core-build-typescript/lib/defaultTslint.json').rules,
  require('../../tslint.json').rules,
  require('./tslint.json').rules
);
build.tslint.setConfig({
  lintConfig: { rules },
  sourceMatch: ['src/**/*.ts', 'src/**/*.tsx', '!src/**/*.scss.tsx']
});


/* Configure TypeScript 2.0. */
build.typescript.setConfig({ typescript: require('typescript') });

build.task('webpack', build.webpack);

build.task('tslint', build.tslint);
build.task('ts', build.typescript);

build.text.setConfig({ textMatch: ['src/**/*.txt', 'src/**/*.Example.tsx', 'src/**/*.Props.ts'] });

build.postCopy.setConfig({
  copyTo: {
    [distFolder]: [
      'src/**/*.png',
      'node_modules/react/dist/react.js',
      'node_modules/react-dom/dist/react-dom.js'
    ]
  }
});


isProduction && build.postCopy.setConfig({
  copyTo: {
    [path.join(distFolder, 'sass')]: [
      'node_modules/office-ui-fabric-core/dist/sass/*.*'
    ],
    [path.join(distFolder, 'css')]: [
      'node_modules/office-ui-fabric-core/dist/css/*.*'
    ]
  }
});

// process *.Example.tsx as text.
build.text.setConfig({ textMatch: ['src/**/*.txt', 'src/**/*.Example.tsx', 'src/**/*.Props.ts'] });

if (isProduction || isNuke) {
  build.setConfig({
    libAMDFolder: path.join(packageFolder, 'lib-amd')
  });
}

let defaultTasks = build.serial(
  build.preCopy,
  build.sass,
  build.parallel(build.typescript, build.tslint, build.text),
  build.postCopy,
  build.webpack
);

// TODO: remove this! There are a number of lint errors to fix.
build.tslint.isEnabled = () => false;

build.task('default', defaultTasks);

// initialize tasks.
build.initialize(gulp);
