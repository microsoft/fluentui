/** @typedef {import('../utils/compareResultsInReports').ComparedReport} ComparedReport */

const sortComparedReport = require('./sortComparedReport');

/**
 * @param {ComparedReport} report
 *
 * @return {{ changedEntries: ComparedReport, unchangedEntries: ComparedReport }}
 */
module.exports = function getChangedEntriesInReport(report) {
  /** @type {ComparedReport} */
  const changedEntries = [];
  /** @type {ComparedReport} */
  const unchangedEntries = [];

  report.forEach(reportEntry => {
    if (reportEntry.diff.empty) {
      changedEntries.push(reportEntry);
      return;
    }

    if (reportEntry.diff.gzip.delta === 0 && reportEntry.diff.minified.delta === 0) {
      unchangedEntries.push(reportEntry);
      return;
    }

    changedEntries.push(reportEntry);
  });

  return {
    changedEntries: sortComparedReport(changedEntries),
    unchangedEntries: sortComparedReport(unchangedEntries),
  };
};
