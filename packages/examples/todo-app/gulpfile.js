'use strict';

let build = require('@microsoft/web-library-build');

build.tslint.isEnabled = () => false;
build.karma.isEnabled = () => false;

/* Configure TypeScript 2.0. */
build.typescript.setConfig({ typescript: require('typescript') });

build.initialize(require('gulp'));
