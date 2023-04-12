const lernaAlias = require('lerna-alias');

/**
 *
 * @param {{excludedPackages:string[];type:keyof typeof lernaAlias} & lernaAlias.Options} options
 */
function getLernaAliases(options) {
  const { excludedPackages, type, ...lernaOptions } = options;
  const aliases = lernaAlias[type](lernaOptions);
  for (const pkg of excludedPackages) {
    delete aliases[`^${pkg}$`];
  }
  return aliases;
}

exports.getLernaAliases = getLernaAliases;
