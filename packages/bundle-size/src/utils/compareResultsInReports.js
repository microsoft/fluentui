const calculateDiffByMetric = require('./calculateDiffByMetric');

/** @typedef {import('./calculateDiffByMetric').DiffByMetric} DiffByMetric */
/** @typedef {{ empty: boolean, minified: DiffByMetric, gzip: DiffByMetric }} DiffForEntry */

/** @typedef {import("./collectLocalReport").BundleSizeReportEntry & { diff: DiffForEntry }} ComparedReportEntry */
/** @typedef {ComparedReportEntry[]} ComparedReport */

/** @type {DiffForEntry} */
const emptyDiff = Object.freeze({
  empty: true,

  minified: { delta: 1, percent: '100%' },
  gzip: { delta: 1, percent: '100%' },
});

/**
 * @param {import("./collectLocalReport").BundleSizeReport} localReport
 * @param {import("./collectLocalReport").BundleSizeReport} remoteReport
 *
 * @return {ComparedReport}
 */
function compareResultsInReports(localReport, remoteReport) {
  return localReport.map(localEntry => {
    const remoteEntry = remoteReport.find(
      entry => localEntry.packageName === entry.packageName && localEntry.path === entry.path,
    );
    const diff = remoteEntry
      ? {
          empty: false,
          minified: calculateDiffByMetric(localEntry, remoteEntry, 'minifiedSize'),
          gzip: calculateDiffByMetric(localEntry, remoteEntry, 'gzippedSize'),
        }
      : emptyDiff;

    return {
      ...localEntry,
      diff,
    };
  });
}

module.exports = {
  emptyDiff,
  compareResultsInReports,
};
