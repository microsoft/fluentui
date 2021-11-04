function config(entry = []) {
  // This entrypoint is deliberately set to ts for monorepo DX
  // However this is bad for publishing
  // https://github.com/microsoft/fluentui/issues/20474
  // https://github.com/microsoft/fluentui/issues/18357
  return [...entry, require.resolve('./src/preset/preview.ts')];
}

function managerEntries(entry = []) {
  // This entrypoint is deliberately set to ts for monorepo DX
  // However this is bad for publishing
  // https://github.com/microsoft/fluentui/issues/20474
  // https://github.com/microsoft/fluentui/issues/18357
  return [...entry, require.resolve('./src/preset/manager.ts')];
}

module.exports = { managerEntries, config };
