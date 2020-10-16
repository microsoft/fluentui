// react-button has a legacy demo app to help test the IE 11 polyfill (storybook doesn't work in IE).
// Since we're not currently bundling most of the individual component packages, only include the
// serve config for bundling (used by the PR deploy site).
module.exports = require('./webpack.serve.config');
