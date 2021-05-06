import { series, task } from 'gulp';
import '../../../gulpfile';

task('test', series('test:circulars'));
