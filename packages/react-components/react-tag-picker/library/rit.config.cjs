// @ts-check

/** @type {import('@fluentui/react-integration-tester').Config} */
const config = {
  react: {
    18: {
      runConfig: {
        test: {
          // Include the StrictMode regression in the React 18 integration suite.
          configPath: 'jest.config.cjs',
        },
      },
    },
  },
};

module.exports = config;
