import { preset, task, series, getPerfRegressions } from '@fluentui/scripts-tasks';

import { config } from './config/perf-test';

preset();

task('run-perf-test', () => getPerfRegressions(config));
task('perf-test', series('build', 'bundle', 'run-perf-test'));
