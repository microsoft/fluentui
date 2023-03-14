const { resources } = require('@fluentui/scripts-webpack');

module.exports = resources.createLegacyDemoAppConfig({
  test: [/\.chartingworker\.ts$/],
  use: {
    loader: 'worker-loader',
    //options: { inline: 'no-fallback' },
    // options: {
    //   experimentalWatchApi: true,
    //   transpileOnly: true,
    // },
  },
  //exclude: [/node_modules/, /\.scss.ts$/, /\.test.tsx?$/],
  //loader: "worker-loader",
});
