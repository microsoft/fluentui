import { preset, task, series } from '@fluentui/scripts';

preset();

task('build', series('clean', 'copy')).cached();
