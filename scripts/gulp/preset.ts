import { task, parallel } from 'gulp';
import * as path from 'path';
import * as fs from 'fs';
import * as tsPaths from 'tsconfig-paths';

function registerTsPaths() {
  const { compilerOptions } = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../../tsconfig.base.v0.json'), 'utf-8'),
  );
  tsPaths.register({
    baseUrl: __dirname,
    paths: compilerOptions.paths,
  });
}
export function preset() {
  // add node_modules/.bin to the path so we can invoke .bin CLIs in tasks
  process.env.PATH = process.env.PATH + path.delimiter + path.resolve(__dirname, '../..', 'node_modules', '.bin');

  registerTsPaths();

  // load tasks in order of dependency usage
  require('./tasks/bundle');
  require('./tasks/component-info');
  require('./tasks/docs');
  require('./tasks/stats');
  require('./tasks/test-unit');
  require('./tasks/perf');
  require('./tasks/test-e2e');
  require('./tasks/test-circulars');
  require('./tasks/test-dependencies');

  // global tasks
  task('build', parallel('build:docs'));
}
