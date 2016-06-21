'use strict';

let build = require('web-library-build');
let gulp = require('gulp');

/** @todo: disable lint config. */
build.tslint.setConfig({ lintConfig: require('./tslint.json') });


build.postCopy.setConfig({
  copyTo: {
    'dist': [ 'src/**/*.png' ]
  }
});

// process *.Example.tsx as text.
build.text.setConfig({ textMatch: ['src/**/*.txt', 'src/**/*.Example.tsx', 'src/**/*.Props.ts'] });

let isProduction = process.argv.indexOf( '--production' ) >= 0;
let isNuke = process.argv.indexOf( 'nuke' ) >= 0;

if (isProduction || isNuke) {
  build.setConfig({
    libAMDFolder: 'lib-amd'
  });
}

/** @todo: Enable css modules when ready. */
// build.sass.setConfig({ useCSSModules: true });

build.task('tslint', build.tslint);

// initialize tasks.
build.initialize(gulp);

/** @todo: This probably be deleted before we ship... RealHumanBeans13... yeah... */
gulp.task('deploy', ['bundle'],  function(cb) {
  let ftp = require('vinyl-ftp');
  let git = require('git-rev');
  let debug = require('gulp-debug');
  let gutil = require('gulp-util');
  let os = require('os');
  let currentBranch;

  git.branch(function(branch) {
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
    let stream = gulp.src( globs, { base: '.', buffer: false })
      .pipe(debug({ title: 'Copying file to Azure' }))
      .pipe(ftpConnection.dest( '/site/wwwroot/fabric-react/' + currentBranch ))
      .on("end", function() {
        gutil.log('http://fabricreact.azurewebsites.net/fabric-react/' + currentBranch + '/');
        cb();
      });
  });
});
