const goodFences = require('good-fences');
const { logger } = require('just-scripts');
const path = require('path');

const rootDir = path.resolve(__dirname, '..', '..');
const project = path.resolve('tsconfig.json');

exports.validateGoodFences = () => {
  let hadError = false;
  goodFences.run({
    rootDir,
    project,
    onError: err => {
      logger.error(err.detailedMessage);
      hadError = true;
    }
  });
  if (hadError) {
    throw new Error('Dependency restriction violated. Please review errors and check fence.json files.');
  }
};
