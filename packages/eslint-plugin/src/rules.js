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

module.exports = rules;
