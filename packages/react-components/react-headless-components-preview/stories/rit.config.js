// @ts-check

/** @type {import('@fluentui/react-integration-tester').Config} */
const config = {
  react: {
    17: {
      runConfig: { 'type-check': { configPath: 'tsconfig.lib.json' } },
    },
    18: {
      runConfig: { 'type-check': { configPath: 'tsconfig.lib.json' } },
    },
  },
};

module.exports = config;
