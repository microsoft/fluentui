'use strict';

let build = require('web-library-build');
let gulp = require('gulp');

/** @todo: disable lint config. */
build.tslint.setConfig({ lintConfig: require('./tslint.json') });

// process *.Example.tsx as text.
build.text.setConfig({ textMatch: [ 'src/**/*.txt', 'src/**/*.Example.tsx' ] });

// configure amd libraries to be built when the production flag is present.
if (process.argv.indexOf('--production') >= 0) {
  build.setConfig({
    libAMDFolder: 'lib-amd'
  });
}

/** @todo: Enable css modules when ready. */
// build.sass.setConfig({ useCSSModules: true });

// initialize tasks.
build.initialize(gulp);

/** @todo: This probably be deleted before we ship... RealHumanBeans13... yeah... */
gulp.task('deploy', ['bundle'],  function() {
  let ftp = require('vinyl-ftp');
  let git = require('git-rev');
  let debug = require('gulp-debug');
  let gutil = require('gulp-util');
  let os = require('os');
  let currentbranch;

  return git.branch(function(branch) {
    currentbranch = os.hostname().split('.')[0] + '-' + branch.replace('/', '-');
    let ftpConnection = ftp.create({
      host: 'waws-prod-bay-049.ftp.azurewebsites.windows.net',
      user: "fabricreact\\FabricReactControls",
      pass: 'Po1ntBarrow',
      parallel: 10,
      secure: true
    });
    let globs = [
      './index.html',
      './dist/**/*'
    ];
    if (process.env.masterBuildLink) {
      currentbranch = 'master';
    }
    let stream = gulp.src( globs, { base: '.', buffer: false })
      .pipe(ftpConnection.newer( './' ) ) // only upload newer files
      .pipe(ftpConnection.dest( '/site/wwwroot/fabric-react/' + currentbranch ))
      .pipe(debug({ title: 'Copying file to Azure' }));
    gutil.log('http://fabricreact.azurewebsites.net/fabric-react/' + currentbranch + '/');
    return stream;
  });
});
