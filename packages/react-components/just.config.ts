import { preset, task } from '@fluentui/scripts';

preset();

// TODO: figure out where this should actually go
// (for v8 it's in public-docsite-resources)
task('generate-json', () => {
  // delay load in case it's not compiled yet
  const { generatePageJsonFiles } = require('@fluentui/api-docs');
  generatePageJsonFiles(require('./config/api-docs'));
});
