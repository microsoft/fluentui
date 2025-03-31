import { name, version } from '../package.json';
import { RULE_NAME as preferFluentUIV9Name, rule as preferFluentUIV9 } from './rules/prefer-fluentui-v9';

const allRules = {
  [preferFluentUIV9Name]: preferFluentUIV9,
};

const configs = {
  recommended: {
    plugins: [name],
    rules: {
      // add all recommended rules here
    },
  },
};

// Plugin definition
export const plugin = {
  meta: {
    name,
    version,
  },
  configs,
  rules: allRules,
};

// Flat config for eslint v9
Object.assign(configs, {
  flat: {
    recommended: {
      plugins: { [name]: plugin },
      rules: configs.recommended.rules,
    },
  },
});

module.exports = plugin;
