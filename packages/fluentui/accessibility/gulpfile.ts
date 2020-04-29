import { parallel, series, task } from 'gulp';

// Build off normal tasks
import '../../../gulpfile';

// Redefine test and test:watch to build behavior json file beforehand
task('test', series('build:docs:behavior-info', 'test:jest'));
task('test:watch', series('build:docs:behavior-info', parallel('test:jest:watch', 'watch:docs:behavior-info')));
