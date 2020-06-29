const { argv } = require('just-scripts');
const fs = require('fs');
const path = require('path');

const storybook = require('@storybook/react/standalone');

module.exports.startStorybookTask = function startStorybookTask(options) {
  options = options || {};
  // This shouldn't be necessary but is needed due to strange logic in
  // storybook lib/core/src/server/config/utils.js
  process.env.NODE_ENV = 'development';

  return async function() {
    let { port, quiet, ci } = argv();

    port = options.port || port;
    quiet = options.quiet || quiet;
    ci = options.ci || ci;

    const localConfigDir = path.join(process.cwd(), '.storybook');

    await storybook({
      mode: 'dev',
      staticDir: [path.join(process.cwd(), 'static')],
      configDir: fs.existsSync(localConfigDir)
        ? localConfigDir
        : path.resolve(__dirname, '../../packages/examples/.storybook'),
      port: port || 3000,
      quiet,
      ci,
    });
  };
};

module.exports.buildStorybookTask = function buildStorybookTask(options) {
  options = options || {};
  return async function() {
    let { port, quiet, ci } = argv();

    port = options.port || port;
    quiet = options.quiet || quiet;
    ci = options.ci || ci;

    await storybook({
      mode: 'static',
      staticDir: [path.join(process.cwd(), 'static')],
      configDir: path.join(process.cwd(), '.storybook'),
      outputDir: path.join(process.cwd(), 'dist-storybook'),
      quiet,
      port: port || 3000,
      ci,
    });
  };
};
