import chalk from 'chalk';
import _ from 'lodash';
import glob from 'glob';
import minimatch from 'minimatch';
import path from 'path';

import getScreenerSteps from './screener.steps';
import config from '../config';

const examplePaths = glob.sync('packages/fluentui/docs/src/examples/**/*.tsx', {
  ignore: ['**/index.tsx', '**/*.knobs.tsx', '**/BestPractices/*.tsx', '**/Playground.tsx'],
});

const pathFilter = process.env.SCREENER_FILTER;
const filteredPaths: string[] = minimatch.match(examplePaths, pathFilter || '*', {
  matchBase: true,
});

if (pathFilter) {
  console.log(chalk.bgGreen.black(' --filter '), pathFilter);
  filteredPaths.forEach(filteredPath => console.log(`${_.repeat(' ', 10)} ${filteredPath}`));
}

const getStateForPath = (examplePath: string) => {
  const { name: exampleNameWithoutExtension, base: exampleNameWithExtension, dir: exampleDir } = path.parse(
    examplePath,
  );

  const rtl = exampleNameWithExtension.endsWith('.rtl.tsx');
  const exampleUrl = _.kebabCase(exampleNameWithoutExtension);

  const pageUrl = `http://${config.server_host}:${config.server_port}/maximize/${exampleUrl}/${rtl}`;

  return {
    url: pageUrl,
    name: exampleNameWithExtension,

    // https://www.npmjs.com/package/screener-runner#testing-interactions
    steps: getScreenerSteps(pageUrl, `${exampleDir}/${exampleNameWithoutExtension}.steps`),
  };
};

const screenerStates = filteredPaths.reduce((states, examplePath) => {
  states.push(getStateForPath(examplePath));
  return states;
}, [] as ReturnType<typeof getStateForPath>[]);

export default screenerStates;
