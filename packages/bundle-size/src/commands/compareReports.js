const chalk = require('chalk');

const cliReporter = require('../reporters/cliReporter');
const markdownReporter = require('../reporters/markdownReporter');
const collectLocalReport = require('../utils/collectLocalReport');
const { compareResultsInReports } = require('../utils/compareResultsInReports');
const getRemoteReport = require('../utils/getRemoteReport');
const { hrToSeconds } = require('../utils/helpers');

/**
 * @param {typeof import('../index') & { branch: string, output: 'cli' | 'markdown' }} options
 */
async function compareReports(options) {
  const { branch, output, quiet } = options;
  const startTime = process.hrtime();

  const localReportStartTime = process.hrtime();
  const localReport = await collectLocalReport();

  if (!quiet) {
    console.log(
      [chalk.blue('[i]'), `Local report prepared in ${hrToSeconds(process.hrtime(localReportStartTime))}`].join(' '),
    );
  }

  const remoteReportStartTime = process.hrtime();
  const { commitSHA, remoteReport } = await getRemoteReport(branch);

  if (!quiet) {
    if (commitSHA === '') {
      console.log([chalk.blue('[i]'), `Remote report for "${branch}" branch was not found`].join(' '));
    } else {
      console.log(
        [
          chalk.blue('[i]'),
          `Remote report for "${commitSHA}" commit fetched in ${hrToSeconds(process.hrtime(remoteReportStartTime))}`,
        ].join(' '),
      );
    }
  }

  const result = compareResultsInReports(localReport, remoteReport);

  switch (output) {
    case 'cli':
      await cliReporter(result);
      break;
    case 'markdown':
      await markdownReporter(result, commitSHA, quiet);
      break;
  }

  if (!quiet) {
    console.log(`Completed in ${hrToSeconds(process.hrtime(startTime))}`);
  }
}

// ---

/** @type {import('yargs').CommandModule} */
const api = {
  command: 'compare-reports',
  describe: 'compares local and remote results',
  builder: {
    branch: {
      alias: 'b',
      type: 'string',
      description: 'A branch to compare against',
      default: 'main',
    },
    output: {
      alias: 'o',
      type: 'string',
      choices: ['cli', 'markdown'],
      description: 'Defines a reporter to produce output',
      default: 'cli',
    },
  },
  handler: compareReports,
};

module.exports = api;
