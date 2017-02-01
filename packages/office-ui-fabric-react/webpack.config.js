let isProduction = process.argv.indexOf('--production') >= 0;
let configs = [
  require('./webpack.demo.config')
];

// Only produce the CDN bundle in production builds.
if (isProduction) {
  configs.push(
    require('./webpack.lib.config')
  );
}

module.exports = configs;