// @ts-check

const path = require('path');
const glob = require('glob');
const { logger } = require('just-scripts');

exports.validateChangeFiles = function() {
  const rushChangeFiles = glob.sync(path.resolve(__dirname, '../../common/changes/**/*.json'));
  if (rushChangeFiles.length > 0) {
    logger.error(
      'Looks like there are change files created by the "rush change" command. Please use the "npm run change" command to create change files'
    );
    logger.info(`These files need to be converted:\n${rushChangeFiles.map(file => `  - ${file}`).join('\n')}\n`);
    logger.info('You can convert all of them to the new format with this command:');
    logger.info('  node ./scripts/convert-change-files.js');
    process.exit(1);
  }
};
