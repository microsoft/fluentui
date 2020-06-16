// The `typeof` here is necessary because otherwise TS throws an error when parsing it under
// some circumstances (like when compiling as part of a TS program through ts-node)
/** @type {typeof import("./index")} */
module.exports = {
  configs: {
    node: require('./configs/node'),
    'node--legacy': require('./configs/node-legacy'),
    react: require('./configs/react'),
    'react--legacy': require('./configs/react-legacy'),
    'react-northstar': require('./configs/react-northstar'),
  },

  rules: {
    'deprecated-keyboard-event-props': require('./rules/deprecated-keyboard-event-props'),
    'no-visibility-modifiers': require('./rules/no-visibility-modifiers'),
  },

  // Not a standard eslint thing, just exported for convenience
  configHelpers: require('./utils/configHelpers'),
};
