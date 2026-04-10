// @ts-check

/** @type {import('@fluentui/react-integration-tester').Config} */
const config = {
  react: {
    17: {
      runConfig: {
        test: {
          command: 'node --max-old-space-size=4096 ../node_modules/.bin/jest --passWithNoTests -u',
        },
      },
    },
    18: {
      runConfig: {
        test: {
          command: 'node --max-old-space-size=4096 ../node_modules/.bin/jest --passWithNoTests -u',
        },
      },
    },
  },
};

module.exports = config;
