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

build.postCopy.setConfig({
  copyTo: {
    [distFolder + '/images']: [
      'src/images/**/*'
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

// @todo: Make sure these credentials are removed before this repo is ever made public
gulp.task('deploy', ['bundle'], function (cb) {
  let ftp = require('vinyl-ftp');
  let git = require('git-rev');
  let debug = require('gulp-debug');
  let gutil = require('gulp-util');
  let os = require('os');
  let currentBranch;

  git.branch(function (branch) {
    currentBranch = os.hostname().split('.')[0] + '-' + branch.replace('/', '-');
    let ftpConnection = ftp.create({
      host: 'waws-prod-bay-049.ftp.azurewebsites.windows.net',
      user: "fabricreact\\$fabricreact",
      pass: 'GwncXS8DEF2WmAQ8bF9JpvX4osSk8ssMGdHeEkhiSdyu9KiPdZD109Phy3Ye',
      parallel: 10,
      secure: true,
      idleTimeout: 10000
    });
    let globs = [
      './index.html',
      './dist/**/*'
    ];
    if (process.env.masterBuildLink || isProduction) {
      currentBranch = 'master';
    }
    let stream = gulp.src(globs, { base: '.', buffer: false })
      .pipe(debug({ title: 'Copying file to Azure' }))
      .pipe(ftpConnection.dest('/site/wwwroot/fabric-react/' + currentBranch))
      .on("end", function () {
        gutil.log('http://fabricreact.azurewebsites.net/fabric-react/' + currentBranch + '/');
        cb();
      });
  });
});

let defaultTasks = build.serial(
  build.preCopy,
  build.sass,
  build.parallel(build.typescript, build.tslint, build.text),
  build.postCopy,
  build.webpack
);

build.task('default', defaultTasks);

// initialize tasks.
build.initialize(gulp);
