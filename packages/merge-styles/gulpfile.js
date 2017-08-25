'use strict';

let gulp = require('gulp');
let build = require('@microsoft/web-library-build');

build.task('tslint', build.tslint);
build.task('sass', build.sass);
build.task('karma', build.karma);
build.task('webpack', build.webpack);

// initialize tasks.
build.initialize(gulp);

// Always fail on test failures.
build.karma.setConfig({
  failBuildOnErrors: true
});
