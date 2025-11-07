// @ts-check

/**
 * @type {import('@fluentui/react-integration-tester').Config}
 */
const config = {
  react: {
    17: { runConfig: { 'type-check': { configPath: 'tsconfig.rit.json' } } },
    18: { runConfig: { 'type-check': { configPath: 'tsconfig.rit.json' } } },
    19: { runConfig: { 'type-check': { configPath: 'tsconfig.rit.json' } } },
  },
};

module.exports = config;
