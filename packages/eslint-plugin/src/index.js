const configHelpers = require('./utils/configHelpers');
const rules = require('./rules');

/** @type {Record<string, import('eslint').Linter.Config>} */
const configs = {
  'flat/core': require('./configs/core'),
  'flat/react': require('./configs/react'),
  'flat/react-legacy': require('./configs/react/legacy'),
  'flat/node': require('./configs/node'),
  'flat/node-legacy': require('./configs/node/legacy'),
  'flat/imports': require('./configs/imports'),
};

const plugin = {
  namespace: '@fluentui',
  configs,
  rules,
  configHelpers,
};

module.exports = plugin;
