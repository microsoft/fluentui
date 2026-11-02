// @ts-check

/** @type {import('@fluentui/react-integration-tester').Config} */
const config = {
  react: {
    17: {
      runConfig: { 'type-check': { configPath: 'tsconfig.r17.json' } },
    },
    18: {
      runConfig: { 'type-check': { configPath: 'tsconfig.r18.json' } },
    },
    19: {
      runConfig: { 'type-check': { configPath: 'tsconfig.r19.json' } },
    },
  },
};

module.exports = config;
