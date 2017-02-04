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

/** @todo: disable lint config. */
build.tslint.setConfig({ lintConfig: require('./tslint.json') });

/* Configure TypeScript 2.0. */
build.typescript.setConfig({ typescript: require('typescript') });

/* Shortcut aliases to run specific individual subtasks. */
build.task('webpack', build.webpack);
build.task('tslint', build.tslint);
build.task('ts', build.typescript);

let packageFolder = buildConfig.packageFolder || '';
let distFolder = buildConfig.distFolder;

build.postCopy.setConfig({
  copyTo: {
    [distFolder]: [
      'src/**/*.png',
      'node_modules/react/dist/react.js',
      'node_modules/react-dom/dist/react-dom.js'
    ]
  }
});

// process *.Example.tsx as text.
build.text.setConfig({ textMatch: ['src/**/*.txt', 'src/**/*.Example.tsx', 'src/**/*.Props.ts'] });

/* Define deploy subtask */
gulp.task('install-deploy', function (cb) {
  let prompt = require('gulp-prompt');

  gulp.src('index.html')
    .pipe(prompt.prompt([{
      type: 'input',
      name: 'host',
      message: 'Please enter hostname (ftp.example.com)'
    },
    {
      type: 'input',
      name: 'user',
      message: 'Please enter username (exampleusername)'
    },
    {
      type: 'input',
      name: 'password',
      message: 'Please enter password (examplepassword)'
    },
    {
      type: 'input',
      name: 'deployurl',
      message: 'Enter deploy URL (http://example.com/website-subfolder/)'
    },
    {
      type: 'input',
      name: 'deploybasepath',
      message: 'Please deployment base path (/wwwroot/base/path/website-subfolder/)'
    },
    {
      type: 'input',
      name: 'secureconnection',
      message: 'Secure connection? (Type true or false)',
      choices: ["true", "false"]
    },
    {
      type: 'input',
      name: 'idletimeout',
      message: 'Enter Idle timeout in milleseconds(1000)'
    }], function (res) {
      let ftpdata = {
        "host": res.host,
        "user": res.user,
        "password": res.password,
        "deployurl": res.deployurl,
        "deploybasepath": res.deploybasepath,
        "secureconnection": res.secureconnection,
        "idletimeout": res.idletimeout
      };
      fs.writeFileSync(configFile, JSON.stringify(ftpdata));
      cb();
    }));
});

gulp.task('deploy', ['bundle'], function (cb) {
  let ftp = require('vinyl-ftp');
  let git = require('git-rev');
  let debug = require('gulp-debug');
  let gutil = require('gulp-util');
  let os = require('os');
  let currentBranch;
  let json;
  let data;
  let uploadPath;

  try {
    json = fs.readFileSync(configFile, 'utf8');
    data = JSON.parse(json);

    git.branch(function (branch) {
      currentBranch = os.hostname().split('.')[0] + '-' + branch.replace('/', '-');
      let ftpConnection = ftp.create({
        host: data.host,
        user: data.user,
        pass: data.password,
        parallel: 10,
        secure: (data.secureconnection == "true") ? true : false,
        idleTimeout: data.idletimeout
      });
      let globs = [
        './index.html',
        './dist/**/*'
      ];
      if (process.env.masterBuildLink || isProduction) {
        currentBranch = 'master';
      }
      let uploadPath = data.deploybasepath + currentBranch;
      let stream = gulp.src(globs, { base: '.', buffer: false })
        .pipe(debug({ title: 'Copying file to server' }))
        .pipe(ftpConnection.dest(uploadPath))
        .on('error', function (er) {
          console.log(er);
        })
        .on("end", function () {
          gutil.log(data.deployurl + currentBranch + '/');
          cb();
        });
    });
  }
  catch (err) {
    gutil.log("Please run gulp install-deploy before deploying");
  }
});

/** @todo: Enable css modules when ready. */
// build.sass.setConfig({ useCSSModules: true });

// alternative serve approach.
// Set up a "rushBuild" subTask that will spawn rush build
let exec = require('child_process').exec;

let rushBuild = build.subTask('rushbuild', (gulp, options, done) => {
  let child = exec('rush build --to office-ui-fabric-react' + (isProduction ? ' --production' : ''));

  child.stdout.on('data', data => process.stdout.write(data));
  child.on('close', done);
});

const sourceMatch = [
  'src/**/*.{ts,tsx,scss,js,txt,html}',
  '!src/**/*.scss.ts'
];

build.task('serve', serial(
  rushBuild,
  build.serve,
  build.watch(sourceMatch, serial(
    rushBuild,
    build.reload
  ))));

// initialize tasks.
build.initialize(gulp);
