function config(entry = []) {
  return [...entry, require.resolve('./src/preset/preview')];
}

function managerEntries(entry = []) {
  return [...entry, require.resolve('./src/preset/manager')];
}

module.exports = { managerEntries, config };
