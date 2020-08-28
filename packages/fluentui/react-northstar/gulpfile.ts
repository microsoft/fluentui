import { parallel, series, task } from 'gulp';

// Build off normal tasks
import '../../../gulpfile';

// Redefine test and test:watch to build info json files beforehand
task('test', series('build:component-info', 'test:jest'));
task('test:watch', series('build:component-info', parallel('test:jest:watch', 'watch:component-info')));
