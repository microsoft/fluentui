import { preset, task, series } from '@fluentui/scripts-tasks';
import { generatePageJsonFiles } from '@fluentui/api-docs';

preset();

task('generate-json', () => generatePageJsonFiles(require('./config/api-docs')));

// copied from scripts/just.config.js with addition of generate-json
task('build', series('clean', 'copy', 'sass', 'generate-json', 'ts', 'lint-imports:all')).cached!();
task('dev', series('copy', 'sass', 'generate-json', 'webpack-dev-server'));
