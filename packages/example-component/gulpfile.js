let build = require('@microsoft/web-library-build');
let gulp = require('gulp');

build.tslint.setConfig({ lintConfig: require('../../tslint.json') });

/* Disable the gcb-webpack build */
build.webpack.isEnabled = () => false;

build.initialize(gulp);
