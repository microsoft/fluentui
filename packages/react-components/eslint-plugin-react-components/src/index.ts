import { name, version } from '../package.json';

const allRules = {
  // add all rules here
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
const plugin = {
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

export default plugin;
