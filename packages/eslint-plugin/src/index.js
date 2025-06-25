// @ts-check

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
  imports: require('./configs/imports'),
  node: require('./configs/node'),
  'node--legacy': require('./configs/node-legacy'),
  react: require('./configs/react'),
  'react--legacy': require('./configs/react-legacy'),
  'react-northstar': require('./configs/react-northstar'),
};

/** @type {Record<string, import('eslint').Linter.Config[]>} */
const flat = {
  get ['flat/react']() {
    return require('./flat-configs/react');
  },
  get ['flat/react-legacy']() {
    return require('./flat-configs/react/legacy');
  },
  get ['flat/react-northstar']() {
    return require('./flat-configs/react/northstar');
  },
  get ['flat/node']() {
    return require('./flat-configs/node');
  },
  get ['flat/node-legacy']() {
    return require('./flat-configs/node/legacy');
  },
  get ['flat/imports']() {
    return require('./flat-configs/imports');
  },
};

/** @type {import('eslint').ESLint.Plugin} */
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
