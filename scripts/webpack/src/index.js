module.exports = {
  ...require('./storybook-webpack.config'),
  ...require('./getResolveAlias'),
  resources: require('./webpack-resources'),
};
