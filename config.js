'use strict';

module.exports = {
  serve: {
    initialPage: '/'
  },
  build: {
    paths: {
      templateMatch: [ 'src/**/*.txt', 'src/**/*.Example.tsx' ],
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
    include: [ 'lib/tests.js' ],
    useWebpack: true
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
