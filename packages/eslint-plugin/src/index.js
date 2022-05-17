module.exports = {
  configs: {
    node: require('./configs/node'),
    'node--legacy': require('./configs/node-legacy'),
    react: require('./configs/react'),
    imports: require('./configs/imports'),
    'react--legacy': require('./configs/react-legacy'),
    'react-northstar': require('./configs/react-northstar'),
  },

  rules: {
    'ban-imports': require('./rules/ban-imports'),
    'deprecated-keyboard-event-props': require('./rules/deprecated-keyboard-event-props'),
    'max-len': require('./rules/max-len'),
    'no-global-react': require('./rules/no-global-react'),
    'no-tslint-comments': require('./rules/no-tslint-comments'),
    'no-visibility-modifiers': require('./rules/no-visibility-modifiers'),
  },

  // Not a standard eslint thing, just exported for convenience
  configHelpers: require('./utils/configHelpers'),
};
