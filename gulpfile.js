'use strict';

let build = require('web-library-build');
let gulp = require('gulp');

/** @todo: disable lint config. */
build.tslint.setConfig({ lintConfig: require('./tslint.json') });


build.postCopy.setConfig({
  copyTo: {
    'dist': [
      'src/**/*.png',
      'node_modules/react/dist/react.js',
      'node_modules/react-dom/dist/react-dom.js',
      'node_modules/office-ui-fabric/dist/fabric.min.css'
    ],
  }
});

// process *.Example.tsx as text.
build.text.setConfig({ textMatch: ['src/**/*.txt', 'src/**/*.Example.tsx', 'src/**/*.Props.ts'] });

let isProduction = process.argv.indexOf( '--production' ) >= 0;
let isNuke = process.argv.indexOf( 'nuke' ) >= 0;

if (isProduction || isNuke) {
  build.setConfig({
    libAMDFolder: 'lib-amd'
  });
}

/** @todo: Enable css modules when ready. */
// build.sass.setConfig({ useCSSModules: true });

build.task('tslint', build.tslint);

// initialize tasks.
build.initialize(gulp);
