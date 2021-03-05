import { series, task } from 'gulp';

// Build off normal tasks
import '../../../gulpfile';

task('test', series('test:e2e'));
