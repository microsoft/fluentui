module.exports = {

  istanbulInstrumenterLoaderPath: require.resolve('istanbul-instrumenter-loader'),

  files: [
    require.resolve('phantomjs-polyfill/bind-polyfill.js')
  ],

  plugins: [
    require('karma-webpack'),
    require('karma-mocha'),
    require('karma-coverage'),
    require('karma-mocha-clean-reporter'),
    require('karma-phantomjs-launcher'),
    require('karma-sinon-chai')
  ],

  webpack: require('webpack')
};
