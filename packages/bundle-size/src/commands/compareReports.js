const chalk = require('chalk');
const { default: fetch } = require('node-fetch');

const cliReporter = require('../reporters/cliReporter');
const markdownReporter = require('../reporters/markdownReporter');
const collectLocalReport = require('../utils/collectLocalReport');
const { compareResultsInReports } = require('../utils/compareResultsInReports');
const { hrToSeconds } = require('../utils/helpers');

/**
 * Grabs data for a branch from Azure Table Storage.
 *
 * @param {string} branch
 * @param {number} attempt
 *
 * @return {Promise<[string, import("../utils/collectLocalReport").BundleSizeReport]>}
 */
async function getRemoteReport(branch, attempt = 1) {
  try {
    const response = await fetch(`https://fluentbundlesize.azurewebsites.net/api/latest?branch=${branch}`);
    /** @type {(import("../utils/collectLocalReport").BundleSizeReportEntry & {commitSHA: string})[]} */
    const report = await response.json();

    /** @type {import("../utils/collectLocalReport").BundleSizeReport} */
    const result = [];
    let commitSHA = '';

    report.forEach(entity => {
      const { commitSHA: entrySHA, ...rest } = entity;

      commitSHA = entrySHA;
      result.push(rest);
    });

    return [commitSHA, result];
  } catch (e) {
    console.log([chalk.yellow('[w]'), e.toString()].join(' '));
    console.log([chalk.yellow('[w]'), 'Failed to fetch report from the remote. Retrying...'].join(' '));

    if (attempt >= 5) {
      console.log(
        [chalk.red('[e]'), 'Exceeded 5 attempts to fetch reports, please check previously reported warnings...'].join(
          ' ',
        ),
      );
      process.exit(1);
    }

    return getRemoteReport(branch, attempt + 1);
  }
}

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
  const [commitSHA, remoteReport] = await getRemoteReport(branch);

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
