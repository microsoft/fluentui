const lernaAlias = require('lerna-alias');

// northstar packages should pull these from npm, not the repo
const excludedPackages = ['@fluentui/date-time-utilities', '@fluentui/dom-utilities', '@fluentui/react-compose'];

module.exports = {
  jest: options => {
    const aliases = lernaAlias.jest(options);
    for (const pkg of excludedPackages) {
      delete aliases[`^${pkg}$`];
    }
    return aliases;
  },
  rollup: options => {
    const aliases = lernaAlias.rollup(options);
    for (const pkg of excludedPackages) {
      delete aliases[pkg];
    }
    return aliases;
  },
  webpack: options => {
    const aliases = lernaAlias.webpack(options);
    for (const pkg of excludedPackages) {
      delete aliases[`${pkg}$`];
    }
    return aliases;
  },
};
