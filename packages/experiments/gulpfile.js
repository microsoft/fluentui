'use strict';

let build = require('@microsoft/web-library-build');
let gulp = require('gulp');

// Short aliases for subtasks.
build.task('webpack', build.webpack);
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
  useCSSModules: true,
  moduleExportName: ''
});

//