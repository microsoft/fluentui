// *** UNDER HEAVY CONSTRUCTION ***
// add / modify gulp tasks as your own peril - we're migrating to just for our build tasks!
// expect gulp tasks to be converted to just within the next 2-3 weeks!

import { task, parallel } from 'gulp';
import * as path from 'path';
import * as tsPaths from 'tsconfig-paths';

import config from './scripts/config';

const { compilerOptions } = require(config.paths.docs('tsconfig.json'));

// add node_modules/.bin to the path so we can invoke .bin CLIs in tasks
process.env.PATH = process.env.PATH + path.delimiter + path.resolve(__dirname, 'node_modules', '.bin');

tsPaths.register({
  baseUrl: config.path_base,
  paths: compilerOptions.paths,
});

// load tasks in order of dependency usage
require('./scripts/gulp/tasks/bundle');
require('./scripts/gulp/tasks/component-info');
require('./scripts/gulp/tasks/docs');
require('./scripts/gulp/tasks/screener');
require('./scripts/gulp/tasks/stats');
require('./scripts/gulp/tasks/test-unit');
require('./scripts/gulp/tasks/perf');
require('./scripts/gulp/tasks/test-e2e');
require('./scripts/gulp/tasks/test-circulars');
require('./scripts/gulp/tasks/test-dependencies');

// global tasks
task('build', parallel('build:docs'));
