function previewAnnotations(entry = []) {
  return [...entry, require.resolve('./lib/preset/preview')];
}

module.exports = { previewAnnotations };
