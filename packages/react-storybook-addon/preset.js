require('@babel/register');

function config(entry = []) {
  return [...entry, require.resolve('./src/preset/preview.ts')];
}

function managerEntries(entry = []) {
  return [...entry, require.resolve('./src/preset/manager.ts')];
}

module.exports = { managerEntries, config };
