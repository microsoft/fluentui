/**
 * @param {[number, number]} hrtime
 * @return {string}
 */
function hrToSeconds(hrtime) {
  const raw = hrtime[0] + hrtime[1] / 1e9;

  return raw.toFixed(2) + 's';
}

module.exports = {
  hrToSeconds,
};
