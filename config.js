'use strict';

module.exports = {
  serve: {
    initialPage: '/'
  },
  build: {
    paths: {
      templateMatch: [ 'src/**/*.txt' ],
      amdLibFolder: 'lib-amd'
    },
    copyTo: {
      'dist': [
        'src/**/*.png',
        'node_modules/react/dist/react.js',
        'node_modules/react-dom/dist/react-dom.js',
        'node_modules/systemjs/dist/system.src.js'
      ]
    },
  },
  test: {
    include: [ 'lib/tests.js' ]
  },
  bundle: {
    entries: [
      {
        useWebpack: true,
        outputPath: 'dist',
        webpackConfig: require('./webpack.config')
      }
    ]
  }
};
