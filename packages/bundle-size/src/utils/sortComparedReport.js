/**
 * @param {import('../utils/compareResultsInReports').ComparedReportEntry} a
 * @param {import('../utils/compareResultsInReports').ComparedReportEntry} b
 */
function compareReports(a, b) {
  return a.packageName.localeCompare(b.packageName) || a.path.localeCompare(b.path);
}

/**
 * Sorts entries in a report by "packageName" & "path".
 *
 * @param {import('../utils/compareResultsInReports').ComparedReport} report
 */
module.exports = function sortComparedReport(report) {
  return report.slice().sort(compareReports);
};
