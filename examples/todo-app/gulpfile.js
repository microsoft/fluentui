'use strict';

let build = require('web-library-build');

build.tslint.isEnabled = () => false;
build.sass.isEnabled =() => true;

build.initialize(require('gulp'));
