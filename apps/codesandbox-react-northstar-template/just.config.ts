import { preset, task } from '@fluentui/scripts';

preset();

task('build', 'ts:commonjs-only');
