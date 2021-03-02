import { preset, task } from '@fluentui/scripts';

preset();

task('build', 'build:node-lib').cached();

// a11y-tests disabled until occasional local and CI timeout issue can be resolved.
task('test', 'no-op');
