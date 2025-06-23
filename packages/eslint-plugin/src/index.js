// @ts-check

/**
 * @import { type TSESLint } from '@typescript-eslint/utils';
 * @import { Linter } from 'eslint'
 */

// const configHelpers = require('./utils/configHelpers');
const { name, version } = require('../package.json');

// Create flat configs (Only ones that declare plugins and parser options need to be different from the legacy config)
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

/** @type {Record<string, Linter.LegacyConfig>} */
const legacy = {
  imports: require('./configs/imports'),
  node: require('./configs/node'),
  'node--legacy': require('./configs/node-legacy'),
  react: require('./configs/react'),
  'react--legacy': require('./configs/react-legacy'),
  'react-northstar': require('./configs/react-northstar'),
};

const plugin = {
  meta: { name, version },
  namespace: '@fluentui',
  configs: {},
  rules,
};

Object.assign(
  plugin.configs,
  {
    ...legacy,
    // 'flat/imports': require('./flat-configs/imports'),
    // 'flat/node': require('./flat-configs/node'),
    // 'flat/node--legacy': require('./flat-configs/node/legacy'),
    'flat/react': require('./flat-configs/react'),
  },

  // get ['flat/react']() {
  //   return require('./flat-configs/react');
  // },
  // 'flat/react--legacy': require('./flat-configs/react/legacy'),
  // 'flat/react-northstar': require('./flat-configs/react/northstar'),
);

module.exports = plugin;
