function config(entry = []) {
  return [...entry, require.resolve('./lib/preset/preview')];
}

module.exports = { config };
