import { preset, task } from '@fluentui/scripts';

preset();

task('build', 'build:node-lib').cached();
