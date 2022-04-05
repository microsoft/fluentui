const formatter = new Intl.NumberFormat([], { style: 'percent', maximumSignificantDigits: 3 });

/**
 * @param {number} value
 * @param {number} fractionDigits
 *
 * @return {number}
 */
function roundNumber(value, fractionDigits) {
  return Number(value.toFixed(fractionDigits));
}

/**
 * @param {number} fraction
 *
 * @return {string}
 */
function formatPercent(fraction) {
  if (fraction < 0.001) {
    return formatter.format(roundNumber(fraction, 4));
  }

  if (fraction < 0.01) {
    return formatter.format(roundNumber(fraction, 3));
  }

  return formatter.format(roundNumber(fraction, 2));
}

/** @typedef {{ delta: number, percent: string }} DiffByMetric */

/**
 * @param {import("../utils/collectLocalReport").BundleSizeReportEntry} local
 * @param {import("../utils/collectLocalReport").BundleSizeReportEntry} remote
 * @param {'minifiedSize' | 'gzippedSize'} property
 *
 * @return {DiffByMetric}
 */
module.exports = function calculateDiffByMetric(local, remote, property) {
  const delta = local[property] - remote[property];
  const percent = remote[property] === 0 ? 0 : delta / remote[property];

  return { delta, percent: formatPercent(percent) };
};
