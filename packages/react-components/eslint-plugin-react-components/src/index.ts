import { name, version } from '../package.json';
import { RULE_NAME as preferFluentUIV9Name, rule as preferFluentUIV9 } from './rules/prefer-fluentui-v9';
import { RULE_NAME as noMissingJsxPragmaName, rule as noMissingJsxPragma } from './rules/no-missing-jsx-pragma';

const allRules = {
  [preferFluentUIV9Name]: preferFluentUIV9,
  [noMissingJsxPragmaName]: noMissingJsxPragma,
};

const configs = {
  recommended: {
    plugins: [name],
    rules: {
      [`${name}/${noMissingJsxPragmaName}`]: ['error', { runtime: 'automatic' }],
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
