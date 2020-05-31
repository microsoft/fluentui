/**
 * Get rule overrides for packages which run in a Node environment (not browser).
 */
function getNodePackageRules() {
  return {
    'no-console': 'off',
  };
}

module.exports = { getNodePackageRules };
