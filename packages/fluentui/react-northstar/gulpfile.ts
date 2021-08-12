import { task, series, parallel } from 'gulp';
import '../../../gulpfile';

task(
  'bundle:package:no-umd',
  series(
    'bundle:package:clean',
    parallel('copy:readme', 'bundle:package:commonjs', 'bundle:package:es', 'bundle:package:types'),
  ),
);
