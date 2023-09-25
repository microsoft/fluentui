import { preset, task, series } from '@fluentui/scripts-tasks';

preset();

task('build', series('build:react-components', 'copy')).cached?.();
