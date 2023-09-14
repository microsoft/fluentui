import { preset, task, series } from '@fluentui/scripts-tasks';

preset();

task('build', series('clean', 'copy')).cached!();
