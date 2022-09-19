import { task, series } from 'gulp';
import fs from 'fs';

import config from '../../config';
import getScreenerStates from '../../screener/screener.states';

const { paths } = config;

task('screener:states', cb => {
  const states = getScreenerStates();
  const statesJson = JSON.stringify(states, null, 2);
  fs.writeFile(paths.docsDist('screenerStates.json'), statesJson, { encoding: 'utf8' }, err => {
    if (err) {
      cb(err);
    }

    cb();
  });
});

task('screener:build', series('build:docs', 'screener:states'));
