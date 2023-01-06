import { preset, task } from '@fluentui/scripts-tasks';

preset();
task('build', 'build:node-lib').cached!();
