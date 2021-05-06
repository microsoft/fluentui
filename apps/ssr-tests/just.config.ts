import { preset, task, logger } from '@fluentui/scripts';
import { spawn } from 'just-scripts-utils';

preset();

task('mocha', () => {
  const mochaCmd = require.resolve('mocha/bin/mocha');
  logger.info(`Executing: ${mochaCmd} dist/ssr-test.js`);
  return spawn(process.execPath, [mochaCmd, 'dist/ssr-tests.js'], { stdio: 'inherit' });
});

task('build', 'webpack');

task('test', 'mocha');
