function previewAnnotations(entry = []) {
  return [...entry, require.resolve('./lib/preset/preview')];
}

function managerEntries(entry = []) {
  return [...entry, require.resolve('./lib/preset/manager')];
}

module.exports = { managerEntries, previewAnnotations };
