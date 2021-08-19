import { preset, task, series } from '@fluentui/scripts';

preset();

task('generate-json', () => {
  // delay load in case it's not compiled yet
  const { generatePageJsonFiles } = require('@fluentui/api-docs');
  generatePageJsonFiles(require('./config/api-docs'));
});

// copied from scripts/just.config.js with addition of generate-json
task('build', series('clean', 'copy', 'sass', 'generate-json', 'ts')).cached();
task('dev', series('copy', 'sass', 'generate-json', 'webpack-dev-server'));
