let isProduction = process.argv.indexOf('--production') >= 0;
let configs = [];

// Only produce the CDN bundle in production builds.
if (isProduction) {
  configs.push(
    require('./webpack.lib.config')
  );
}

module.exports = configs;