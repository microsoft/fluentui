import type { ESLint } from 'eslint';
// import with attribute for esm support, see https://nodejs.org/api/esm.html#json-modules
import pkgJson from '../package.json' with { type: 'json' };
import { RULE_NAME as enforceUseClientName, rule as enforceUseClient } from './rules/enforce-use-client.js';
import { RULE_NAME as preferFluentUIV9Name, rule as preferFluentUIV9 } from './rules/prefer-fluentui-v9.js';

export const meta = {
  name: pkgJson.name,
  version: pkgJson.version,
};
export const rules = {
  [enforceUseClientName]: enforceUseClient,
  [preferFluentUIV9Name]: preferFluentUIV9,
};

const recommendedRules = {
  // Add rules to the recommended config here in the future
};

export const configs = {
  recommended: {
    plugins: [pkgJson.name],
    rules: recommendedRules,
  },
  'flat/recommended': {
    // Define plugins as an object to satisfy ESLint v9 flat config format
    // the actual plugin will be assigned later to avoid circular dependencies
    plugins: { [pkgJson.name]: {} as ESLint.Plugin },
    rules: recommendedRules,
  },
};

const plugin = {
  meta,
  configs,
  rules,
};

// Flat config for eslint v9
configs['flat/recommended'].plugins = {
  [pkgJson.name]: plugin as unknown as ESLint.Plugin,
};

export default plugin;
