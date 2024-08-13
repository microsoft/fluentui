import { preset, task, series, getPerfRegressions } from '@fluentui/scripts-tasks';

import { config } from './config/perf-test';

preset();

task('perf-test:bundle', series('clean', 'copy', 'bundle'));
task('run-perf-test', () => getPerfRegressions(config));
task('perf-test', series('run-perf-test'));
