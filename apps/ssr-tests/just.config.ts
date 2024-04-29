import { preset, task, logger, spawn } from '@fluentui/scripts-tasks';

preset();

task('mocha', () => {
  const mochaCmd = require.resolve('mocha/bin/mocha');
  logger.info(`Executing: ${mochaCmd} dist/ssr-test.js`);
  return spawn(process.execPath, [mochaCmd, 'dist/ssr-tests.js'], { stdio: 'inherit' });
});

task('build', 'webpack');

task('test', 'mocha');
