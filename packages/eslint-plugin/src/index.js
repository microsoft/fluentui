const configHelpers = require('./utils/configHelpers');
const { name, version } = require('../package.json');

const rules = {
  'ban-imports': require('./rules/ban-imports'),
  'ban-context-export': require('./rules/ban-context-export'),
  'ban-instanceof-html-element': require('./rules/ban-instanceof-html-element'),
  'deprecated-keyboard-event-props': require('./rules/deprecated-keyboard-event-props'),
  'max-len': require('./rules/max-len'),
  'no-global-react': require('./rules/no-global-react'),
  'no-tslint-comments': require('./rules/no-tslint-comments'),
  'no-visibility-modifiers': require('./rules/no-visibility-modifiers'),
  'no-restricted-imports': require('./rules/no-restricted-imports'),
  'no-context-default-value': require('./rules/no-context-default-value'),
};

/** @type {Record<string, import('eslint').Linter.LegacyConfig>} */
const legacy = {
  node: require('./configs/node'),
  'node--legacy': require('./configs/node-legacy'),
  react: require('./configs/react'),
  imports: require('./configs/imports'),
  'react--legacy': require('./configs/react-legacy'),
};

/** @type {Record<string, import('typescript-eslint').ConfigArray>} */
const flat = {
  'flat/core': require('./flat-configs/core'),
  'flat/react': require('./flat-configs/react'),
  'flat/react-legacy': require('./flat-configs/react/legacy'),
  'flat/node': require('./flat-configs/node'),
  'flat/node-legacy': require('./flat-configs/node/legacy'),
  'flat/imports': require('./flat-configs/imports'),
};

const plugin = {
  meta: { name, version },
  namespace: '@fluentui',
  configs: {
    ...legacy,
    ...flat,
  },
  rules,
  configHelpers,
};

module.exports = plugin;
