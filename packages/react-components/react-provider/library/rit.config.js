// @ts-check

/** @type {import('@fluentui/react-integration-tester').Config} */
const config = {
  react: {
    17: {
      commands: {
        test: 'jest --passWithNoTests -u --testPathIgnorePatterns components/FluentProvider/FluentProvider-hydrate.test.tsx',
      },
    },
  },
};

module.exports = config;
