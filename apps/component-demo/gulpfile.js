'use strict';

let build = require('@microsoft/web-library-build');
let serial = build.serial;

build.tslint.isEnabled = () => false;
build.karma.isEnabled = () => false;

/* Configure TypeScript 2.0. */
build.typescript.setConfig({ typescript: require('typescript') });

// Set up a "rushBuild" subTask that will spawn rush build
let fs = require('fs');
let spawn = require('child_process').spawn;
let rawStdout = new fs.SyncWriteStream(1, { autoClose: false });

let rushBuild = build.subTask('rushbuild', (gulp, options, done) => {
  let child = spawn(
    'rush',
    ['build', '--to', 'component-demo']
  );

  child.stdout.on('data', data => rawStdout.write(data));
  child.on('close', done);
});

const sourceMatch = [
  'src/**/*.{ts,tsx,scss,js,txt,html}',
  '!src/**/*.scss.ts'
];

build.task('serve', serial(
  build.serve,
  build.watch(sourceMatch, serial(
    rushBuild,
    build.reload
  ))));

build.initialize(require('gulp'));


