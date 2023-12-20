const lernaAlias = require('lerna-alias');

/**
 *
 * @param {{excludedPackages:string[];type:keyof typeof lernaAlias} & lernaAlias.Options} options
 */
function getLernaAliases(options) {
  const { excludedPackages, type, ...lernaOptions } = options;
  const aliases = lernaAlias[type](lernaOptions);
  for (const pkg of excludedPackages) {
    delete aliases[getKey[type](pkg)];
  }
  return aliases;
}

const getKey = {
  jest: (/** @type {string} */ packageName) => `^${packageName}$`,
  webpack: (/** @type {string} */ packageName) => `${packageName}$`,
  rollup: (/** @type {string} */ packageName) => packageName,
};

exports.getLernaAliases = getLernaAliases;
