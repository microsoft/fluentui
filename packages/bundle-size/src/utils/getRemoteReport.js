const chalk = require('chalk');
const { default: fetch } = require('node-fetch');

const MAX_HTTP_ATTEMPT_COUNT = 5;
const REPORT_API_ENDPOINT = `https://fluentbundlesize.azurewebsites.net/api/latest`;

/**
 * Grabs data for a branch from Azure Table Storage.
 *
 * @param {string} branch
 * @param {number} attempt
 *
 * @return {Promise<{ commitSHA: string, remoteReport: import("../utils/collectLocalReport").BundleSizeReport}>}
 */
module.exports = async function getRemoteReport(branch, attempt = 1) {
  try {
    const response = await fetch(`${REPORT_API_ENDPOINT}?branch=${branch}`);
    /** @type {(import("../utils/collectLocalReport").BundleSizeReportEntry & {commitSHA: string})[]} */
    const result = await response.json();

    /** @type {import("../utils/collectLocalReport").BundleSizeReport} */
    const remoteReport = result.map(entity => {
      const { commitSHA: _, ...rest } = entity;
      return rest;
    });
    const { commitSHA } = result[result.length - 1];

    return { commitSHA, remoteReport };
  } catch (e) {
    console.log([chalk.yellow('[w]'), e.toString()].join(' '));
    console.log([chalk.yellow('[w]'), 'Failed to fetch report from the remote. Retrying...'].join(' '));

    if (attempt >= MAX_HTTP_ATTEMPT_COUNT) {
      console.error(
        [chalk.red('[e]'), 'Exceeded 5 attempts to fetch reports, please check previously reported warnings...'].join(
          ' ',
        ),
      );
      process.exit(1);
    }

    return getRemoteReport(branch, attempt + 1);
  }
};
