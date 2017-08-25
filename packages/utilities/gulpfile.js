'use strict';

let gulp = require('gulp');
let build = require('@microsoft/web-library-build');

build.task('sass', build.sass);
build.task('karma', build.karma);

// initialize tasks.
build.initialize(gulp);

// Always fail on test failures.
build.karma.setConfig({
  failBuildOnErrors: true
});

// Use css modules.
build.sass.setConfig({
  useCSSModules: true
});

//