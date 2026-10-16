// @ts-check

const runConfig = {
  test: {
    command: 'jest --runInBand',
    configPath: 'jest.config.cjs',
  },
};

/** @type {import('@fluentui/react-integration-tester').Config} */
const config = {
  react: {
    17: { runConfig },
    18: { runConfig },
  },
};

module.exports = config;
