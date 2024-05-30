module.exports = {
  configs: {
    node: require('./configs/node'),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'node--legacy': require('./configs/node-legacy'),
    react: require('./configs/react'),
    imports: require('./configs/imports'),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'react--legacy': require('./configs/react-legacy'),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'react-northstar': require('./configs/react-northstar'),
  },

  rules: {
    /* eslint-disable @typescript-eslint/naming-convention */
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
    /* eslint-enable @typescript-eslint/naming-convention */
  },

  // Not a standard eslint thing, just exported for convenience
  configHelpers: require('./utils/configHelpers'),
};
