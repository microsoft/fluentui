const fs = require('fs');
const path = require('path');
const getResolveAlias = require('@uifabric/build/webpack/getResolveAlias');
const resources = require('@uifabric/build/webpack/webpack-resources');

const packageName = path.basename(process.cwd());
const demoAppPath = path.join('./src', packageName, 'demo/index.tsx');

if (packageName === '@fluentui/react') {
  // Avoid circular dependency
  module.exports = require('@fluentui/public-docsite-resources/webpack.serve.config');
} else if (!fs.existsSync(demoAppPath)) {
  // eslint-disable-next-line no-console
  console.error(`Package ${packageName} does not have a legacy demo app!`);
  process.exit(1);
}

module.exports = resources.createServeConfig({
  entry: demoAppPath,

  output: {
    filename: 'demo-app.js',
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },

  resolve: {
    alias: getResolveAlias(),
  },
});
