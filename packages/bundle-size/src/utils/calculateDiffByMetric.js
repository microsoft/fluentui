/**
 * @param {number} value
 * @param {number} fractionDigits
 *
 * @return {number}
 */
function roundNumber(value, fractionDigits) {
  return parseFloat(value.toFixed(fractionDigits));
}

/**
 * @param {number} fraction
 *
 * @return {string}
 */
function formatPercent(fraction) {
  if (fraction < 0.001) {
    fraction = roundNumber(fraction, 4);
  } else if (fraction < 0.01) {
    fraction = roundNumber(fraction, 3);
  } else {
    fraction = roundNumber(fraction, 2);
  }

  return fraction.toLocaleString(undefined, {
    style: 'percent',
    maximumSignificantDigits: 3,
  });
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

  return {
    delta,
    percent: formatPercent(delta / remote[property]),
  };
};
