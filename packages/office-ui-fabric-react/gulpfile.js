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

// let visualTestClean = build.subTask('visualTestClean', (gulp, options, done) => {
//   return del(['visualtests/results/*png']).then(() => done());
// });

// let visualTest = build.subTask('visualtest', (gulp, options, done) => {
//   gulpConnect.server({
//     port: 43210,
//     livereload: false,
//     directoryListing: false
//   });
//   if (!options.args['debug']) {
//     let matchFile = options.args['match'] || '';

//     let casperJs = require('gulp-phantomcss');
//     gulp.src(['lib/**/*' + matchFile + '.visualtest.js'])
//       .pipe(casperJs(
//         {
//           screenshots: 'visualtests/baseline',
//           comparisonResultRoot: 'visualtests/results'
//         })).on('end', done);
//   }
// });


// Always fail on test failures.
build.karma.setConfig({
  failBuildOnErrors: true
});

// Use css modules.
build.sass.setConfig({
  useCSSModules: true,
  moduleExportName: ''
});

// Copy fabric-core to dist to be published with fabric-react.
build.preCopy.setConfig({
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

// Short aliases for subtasks.
build.task('webpack', build.webpack);
build.task('tslint', build.tslint);
build.task('ts', build.typescript);
build.task('sass', build.serial(build.preCopy, build.sass));
build.task('karma', build.karma);
build.task('test', serial(build.sass, build.typescript, build.karma));
// build.task('visualtest', serial(build.sass, build.typescript, build.webpack, visualTestClean, visualTest));

// initialize tasks.
build.initialize(gulp);