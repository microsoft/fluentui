const lernaAlias = require('lerna-alias');
const findGitRoot = require('./monorepo/findGitRoot');
const path = require('path');

// northstar packages should pull these from npm, not the repo
const excludedPackages = ['@fluentui/date-time-utilities', '@fluentui/dom-utilities', '@fluentui/react-compose'];

function deleteNorthstarAliases(aliases) {
  const northstarRoot = path.join(findGitRoot(), 'packages', 'fluentui');
  for (const [pkg, path] of Object.entries(aliases)) {
    if (path.indexOf(northstarRoot) > -1) {
      delete aliases[pkg];
    }
  }
}

module.exports = {
  jest: options => {
    const aliases = lernaAlias.jest(options);
    for (const pkg of excludedPackages) {
      delete aliases[`^${pkg}$`];
    }
    deleteNorthstarAliases(aliases);
    return aliases;
  },
  rollup: options => {
    const aliases = lernaAlias.rollup(options);
    for (const pkg of excludedPackages) {
      delete aliases[pkg];
    }
    deleteNorthstarAliases(aliases);
    return aliases;
  },
  webpack: options => {
    const aliases = lernaAlias.webpack(options);
    for (const pkg of excludedPackages) {
      delete aliases[`${pkg}$`];
    }
    deleteNorthstarAliases(aliases);
    return aliases;
  },
};
