import { parallel, task } from 'gulp';

export function preset() {
  // load tasks in order of dependency usage
  require('./tasks/bundle');
  require('./tasks/component-info');
  require('./tasks/docs');
  require('./tasks/stats');
  require('./tasks/test-unit');
  require('./tasks/test-e2e');
  require('./tasks/test-circulars');
  require('./tasks/test-dependencies');

  // global tasks
  task('build', parallel('build:docs'));
}
