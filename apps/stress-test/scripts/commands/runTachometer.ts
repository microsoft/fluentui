import * as yargs from 'yargs';
import { CLITachometerOptions, ConfigResult } from '../utils/types';
import fs from 'fs-extra';
import * as path from 'path';

import configureYargs from '../utils/configureYargs.js';
import { getConfigDir, getResultsDir, readDirJson } from '../utils/paths.js';
import runTachometer from '../utils/tachometer.js';

const command = 'tachometer';

const handler: (argv: CLITachometerOptions) => Promise<void> = async argv => {
  const { scenario } = argv;

  const configDir = getConfigDir(scenario);
  const resultsDir = getResultsDir(scenario);

  if (!fs.existsSync(configDir)) {
    throw new Error(`"${configDir} does not exist.`);
  }

  const configs = [] as ConfigResult[];
  const files = readDirJson(configDir);

  for (const file of files) {
    const configResult = {
      configDir,
      resultsDir,
      testFile: path.join(configDir, file),
      resultsFile: path.join(resultsDir, file),
    };

    configs.push(configResult);
  }

  await runTachometer(configs);
  console.log('Tachometer run complete!');
};

const api: yargs.CommandModule = {
  command,
  describe: 'Runs Tachometer for a provided scenario.',
  builder: y => {
    return configureYargs(command, y);
  },
  handler: argv => {
    const args = {
      scenario: argv.scenario as string,
    };
    handler(args);
  },
};

export default api;
