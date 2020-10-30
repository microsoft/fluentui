const resources = require('@fluentui/scripts/webpack/webpack-resources');

// react-button has a legacy demo app to help test the IE 11 polyfill (storybook doesn't work in IE).
module.exports = resources.createLegacyDemoAppConfig();
