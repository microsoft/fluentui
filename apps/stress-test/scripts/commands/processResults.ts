import * as yargs from 'yargs';
import { CLIProcessResultsOptions, ProcessedBrowserData, TachometerBenchmark } from '../utils/types';
import fs from 'fs-extra';
import * as path from 'path';
import configureYargs from '../utils/configureYargs.js';
import { getResultsDir, readDirJson } from '../utils/paths.js';

const command = 'process-results';

const handler: (argv: CLIProcessResultsOptions) => void = argv => {
  const { scenario } = argv;

  const resultsDir = getResultsDir(scenario);
  const files = readDirJson(resultsDir);

  const browserData: ProcessedBrowserData = {
    scenario,
    testCases: {},
  };

  for (const file of files) {
    const contents = fs.readFileSync(path.join(resultsDir, file), {
      encoding: 'utf8',
    });
    const json = JSON.parse(contents);
    const benchmark = json.benchmarks[0];
    const browser = benchmark.browser.name;

    const [, testCase, size] = benchmark.name.split(' - ');

    browserData.testCases[testCase] = browserData.testCases[testCase] || { sizes: {} };
    browserData.testCases[testCase].sizes[size] = browserData.testCases[testCase].sizes[size] || { browsers: {} };

    browserData.testCases[testCase].sizes[size].browsers[browser] = json.benchmarks.map((bm: TachometerBenchmark) => {
      const [bmTarget, bmTestCase, bmSize] = bm.name.split(' - ');

      return {
        name: bm.name,
        mean: bm.mean,
        differences: bm.differences,
        samples: bm.samples,
        target: bmTarget,
        testCase: bmTestCase,
        size: bmSize,
      };
    });
  }

  const js = `
    export const data = ${JSON.stringify(browserData, null, 4)};
  `;
  fs.writeFileSync(path.join(resultsDir, 'processed-results.js'), js, { encoding: 'utf8' });
};

const api: yargs.CommandModule = {
  command,
  describe: 'Processes test results for display with charts and graphs.',
  builder: y => {
    return configureYargs(command, y);
  },
  handler: argv => {
    const args = { scenario: argv.scenario as string };
    handler(args);
  },
};

export default api;
