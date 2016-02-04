'use strict';

module.exports = {
  serve: {
    initialPage: '/'
  },
  build: {
    paths: {
      lessMatch: [ 'src/**/*.less' ],
      sassMatch: [ 'src/**/*.scss' ]
    },
    copyTo: {
      'dist': [
        'node_modules/react/dist/react.js',
        'node_modules/react-dom/dist/react-dom.js',
        'node_modules/office-ui-fabric/dist/css/fabric.css',
        'node_modules/office-ui-fabric/dist/css/fabric.components.css',
        'node_modules/systemjs/dist/system.src.js'
      ]
    }
  },
  test: {
    include: [ 'lib/tests.js' ]
  },
  bundle: {
    entries: [
      {
        entry: './lib/index.js',
        outputPath: 'dist/office-ui-fabric-react.js',
        exclude: [ 'react', 'react-dom' ],
        isStandalone: true,
        useWebpack: true
      },
      {
        entry: './lib/demo/index.js',
        outputPath: 'dist/demo.bundle.js',
        exclude: [ 'react', 'react-dom', 'office-ui-fabric-react' ],
        isStandalone: true,
        useWebpack: true
      }
    ]
  }
};
