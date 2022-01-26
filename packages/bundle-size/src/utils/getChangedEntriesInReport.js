/** @typedef {import('../utils/compareResultsInReports').ComparedReport} ComparedReport */

const sortComparedReport = require('./sortComparedReport');

/**
 * @param {ComparedReport} report
 *
 * @return {{ changedEntries: ComparedReport, unchangedEntries: ComparedReport }}
 */
module.exports = function getChangedEntriesInReport(report) {
  const { changedEntries, unchangedEntries } = report.reduce(
    (acc, reportEntry) => {
      if (reportEntry.diff.gzip.delta === 0 && reportEntry.diff.minified.delta === 0) {
        acc.unchangedEntries.push(reportEntry);
        return acc;
      }

      acc.changedEntries.push(reportEntry);
      return acc;
    },
    { changedEntries: /** @type {ComparedReport} */ ([]), unchangedEntries: /** @type {ComparedReport} */ ([]) },
  );

  return {
    changedEntries: sortComparedReport(changedEntries),
    unchangedEntries: sortComparedReport(unchangedEntries),
  };
};
