const path = require('path');

// your app's webpack.config.js
const custom = require('@uifabric/build/config/storybook/webpack.config');

module.exports = {
  webpackFinal: config => {
    return custom({ config });
  }
};
