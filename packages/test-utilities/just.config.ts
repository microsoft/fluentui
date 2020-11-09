import { preset, task, series } from '@fluentui/scripts';

preset();

task('build', series('clean', 'ts')).cached();
