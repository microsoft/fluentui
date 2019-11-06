const { preset, just } = require('@uifabric/build');
const { task, series, logger } = just;
const { spawn } = require('just-scripts-utils');

preset();

task('mocha', () => {
  const mochaCmd = require.resolve('mocha/bin/mocha');
  logger.info(`Executing: ${mochaCmd} dist/ssr-test.js`);
  return spawn(process.execPath, [mochaCmd, 'dist/ssr-tests.js'], { stdio: 'inherit' });
});

task('build', series('webpack', 'mocha')).cached();
