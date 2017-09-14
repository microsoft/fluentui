'use strict';

// Karma configuration
// Generated on Thu Oct 08 2015 18:13:05 GMT-0700 (PDT)

let path = require('path');
let resources = require('../../scripts/tasks/karma-resources');
let debugRun = (process.argv.indexOf('--debug') > -1);
let webpack = require('../../scripts/tasks/webpack-resources').webpack;

module.exports = function (config) {
  let karmaConfig = {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'sinon-chai'],


    // list of files / patterns to load in the browser
    files: resources.files.concat([path.join('lib', 'common/tests.js')]),

    // list of files to exclude
    exclude: [],


    // webpack config for bundling tests.
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /sinon\/pkg\/sinon/,
            loader: "imports?define=>false,require=>false"
          },
          debugRun ? {} : {
            test: /\.js/,
            exclude: /(test|node_modules|bower_components)/,
            loader: resources.istanbulInstrumenterLoaderPath,
            enforce: 'post'
          }
        ],
      },
      externals: {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      },
      resolve: {
        modules: [
          path.resolve(__dirname, 'lib'),
          path.resolve('../../scripts/node_modules'),
          'node_modules'
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        })
      ]
    },

    webpackMiddleware: {
      noInfo: true
    },

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      [path.join('lib', '/**/*.js')]: ['webpack']
    },

    plugins: resources.plugins.concat([
    ]),

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha-clean', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // on disconnect, makes karma to launch another phantonJs window to restart the testcases
    browserDisconnectTolerance: 5,

    // these settings help reduce the timeouts to begin with.
    browserNoActivityTimeout: 60000,
    browserDisconnectTimeout: 30000,
    captureTimeout: 60000,
  };

  config.set(karmaConfig);
};
