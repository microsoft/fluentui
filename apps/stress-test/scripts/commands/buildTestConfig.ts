import * as yargs from 'yargs';
import { CLIBuildTestConfigOptions, ConfigResult, TestOptions } from '../utils/types';

import fs from 'fs-extra';
import * as path from 'path';

import { getConfigDir, getResultsDir, ensureClean } from '../utils/paths.js';
import configureYargs from '../utils/configureYargs.js';
import * as querystring from 'querystring';

type BuildTestConfig = (options: CLIBuildTestConfigOptions) => ConfigResult[];
type MakeConfigJson = (
  scenario: string,
  browser: string,
  testCase: string,
  sampleSize: number,
  targets: string[],
  size: string,
  testOptions: TestOptions,
  port: number,
) => string;

const command = 'build-test-config';

const buildTestConfig: BuildTestConfig = options => {
  const { scenario, browsers, testCases, sampleSize, targets, sizes, port, testOptions } = options;
  const configDir = getConfigDir(scenario);
  ensureClean(configDir);

  const configs = [] as ConfigResult[];

  for (const browser of browsers) {
    for (const testCase of testCases) {
      for (const size of sizes) {
        const json = makeConfigJson(scenario, browser, testCase, sampleSize, targets, size, testOptions, port);
        const configName = [browser, testCase, size].join('.') + '.json';
        const configPath = path.join(configDir, configName);
        fs.writeFileSync(configPath, json, { encoding: 'utf8' });

        const resultsDir = getResultsDir(scenario);
        const configResult = {
          configDir,
          resultsDir,
          testFile: configPath,
          resultsFile: path.join(resultsDir, configName),
        };

        configs.push(configResult);
      }
    }
  }

  return configs;
};

const makeConfigJson: MakeConfigJson = (_scenario, browser, testCase, sampleSize, targets, size, testOptions, port) => {
  const baseUrl = `http://localhost:${port}`;
  const json = {
    $schema: 'https://raw.githubusercontent.com/Polymer/tachometer/master/config.schema.json',
    sampleSize,
    timeout: 0,
    benchmarks: [
      {
        browser: {
          name: browser,
        },
        measurement: [
          {
            mode: 'performance',
            entryName: 'stress',
          },
        ],

        expand: targets.map(target => {
          // const params = querystring.stringify({ test: testCase, ...testOptions });
          const targetParams = target.includes('?') ? querystring.parse(target.substring(target.indexOf('?') + 1)) : {};
          const params = querystring.stringify({
            ...targetParams,
            test: testCase,
            fixtureName: `${size}_1`,
            ...testOptions,
          });

          const targetWithoutParams = target.substring(0, target.includes('?') ? target.indexOf('?') : undefined);

          return {
            name: `${target} - ${testCase} - ${size}`,
            url: `${baseUrl}/${targetWithoutParams}/?${params}`,
          };
        }),
      },
    ],
  };

  return JSON.stringify(json, null, 4);
};

const api: yargs.CommandModule = {
  command,
  describe: 'Builds test configuration files.',
  builder: y => {
    return configureYargs(command, y);
  },
  handler: argv => {
    const { $0, _, ...rest } = argv;
    buildTestConfig(rest as CLIBuildTestConfigOptions);
  },
};

export default api;
export { buildTestConfig };
