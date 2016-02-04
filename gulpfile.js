'use strict';

let build = require('@ms/ms-core-build');
let gulp = require('gulp');

build.initializeTasks(
  gulp,
  require('./config')
);
