const configHelpers = require('./utils/configHelpers');
const rules = require('./rules');

/** @type {Record<string, import('eslint').Linter.LegacyConfig>} */
const legacy = {
  node: require('./configs/node'),
  'node--legacy': require('./configs/node-legacy'),
  react: require('./configs/react'),
  imports: require('./configs/imports'),
  'react--legacy': require('./configs/react-legacy'),
};

/** @type {Record<string, import('eslint').Linter.Config>} */
const flat = {
  'flat/core': require('./flat-configs/core'),
  'flat/react': require('./flat-configs/react'),
  'flat/react-legacy': require('./flat-configs/react/legacy'),
  'flat/node': require('./flat-configs/node'),
  'flat/node-legacy': require('./flat-configs/node/legacy'),
  'flat/imports': require('./flat-configs/imports'),
};

const plugin = {
  namespace: '@fluentui',
  configs: {
    ...legacy,
    ...flat,
  },
  rules,
  configHelpers,
};

module.exports = plugin;
