import { preset, task, series } from '@fluentui/scripts-tasks';
import { copyTypes } from './scripts/copyTypes';

preset();

task('copy-types', copyTypes);

// These have to be manually re-defined because we need to chain copy-types after copy, and
// chain() doesn't work if the task chained against is in the middle of the series...
task('dev', series('clean', 'copy', 'copy-types', 'sass', 'webpack-dev-server'));
task('build', series('clean', 'copy', 'copy-types', 'ts', 'lint-imports:all')).cached!();
