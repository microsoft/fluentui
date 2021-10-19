const chalk = require('chalk');
const Table = require('cli-table3');

const getChangedEntriesInReport = require('../utils/getChangedEntriesInReport');
const { formatBytes } = require('../utils/helpers');

/**
 * @param {number} value
 *
 * @return {string}
 */
function getDirectionSymbol(value) {
  if (value < 0) {
    return '↓';
  }

  if (value > 0) {
    return '↑';
  }

  return '';
}

/**
 * @param {import('../utils/calculateDiffByMetric').DiffByMetric} diff
 *
 * @return {string}
 */
function formatDelta({ delta, percent }) {
  if (delta === 0) {
    return '';
  }

  const colorFn = delta > 0 ? chalk.red : chalk.green;

  return colorFn(percent + getDirectionSymbol(delta));
}

/**
 * @param {import('../utils/compareResultsInReports').ComparedReport} report
 */
module.exports = async function cliReporter(report) {
  const result = new Table({
    colAligns: ['left', 'right', 'right'],
    head: ['Fixture', 'Before', 'After (minified/GZIP)'],
  });
  const { changedEntries } = getChangedEntriesInReport(report);

  changedEntries.forEach(entry => {
    const { diff, gzippedSize, minifiedSize, name, packageName } = entry;
    const fixtureColumn = chalk.bold(packageName) + '\n' + name + (diff.empty ? chalk.cyan(' (new)') : '');

    const minifiedBefore = diff.empty ? 'N/A' : formatBytes(minifiedSize - diff.minified.delta);
    const gzippedBefore = diff.empty ? 'N/A' : formatBytes(gzippedSize - diff.gzip.delta);

    const minifiedAfter = formatBytes(minifiedSize);
    const gzippedAfter = formatBytes(gzippedSize);

    const beforeColumn = minifiedBefore + '\n' + gzippedBefore;
    const afterColumn =
      formatDelta(diff.minified) + ' ' + minifiedAfter + '\n' + formatDelta(diff.gzip) + ' ' + gzippedAfter;

    result.push([fixtureColumn, beforeColumn, afterColumn]);
  });

  if (result.length > 0) {
    console.log(result.toString());
    return;
  }

  console.log(`${chalk.green('[✔]')} No changes found`);
};
