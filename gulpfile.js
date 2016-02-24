'use strict';

let build = require('@ms/ms-core-build');
let gulp = require('gulp');
let ftp = require('vinyl-ftp');
let git = require('git-rev');
let debug = require('gulp-debug');
let gutil = require('gulp-util');
let os = require('os');
let currentbranch;

build.initializeTasks(
  gulp,
  require('./config')
);

gulp.task('deploy', ['bundle'],  function() {
  return git.branch(function(branch) {
    currentbranch = os.hostname().split('.')[0] + '-' + branch.replace('/', '-');
    let ftpConnection = ftp.create({
      host: 'waws-prod-bay-049.ftp.azurewebsites.windows.net',
      user: "odsp-int\\designdev",
      pass: 'RealHumanBeans13',
      parallel: 10,
      secure: true
    });
    let globs = [
      './index.html',
      './dist/**/*'
    ];
    let stream = gulp.src( globs, { base: '.', buffer: false })
      .pipe(ftpConnection.newer( './' ) ) // only upload newer files
      .pipe(ftpConnection.dest( '/site/wwwroot/fabric-react/' + currentbranch ))
      .pipe(debug({title: "Moving File to Azure"}));
    if (process.env.masterBuildLink) {
      currentBranch = 'master';
    }
    gutil.log('http://odsp-int.azurewebsites.net/fabric-react/' + currentbranch + '/');
    return stream;
  });
});
