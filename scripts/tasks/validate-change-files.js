// @ts-check

const path = require('path');
const glob = require('glob');

const rushChangeFiles = glob.sync(path.resolve(__dirname, '../../common/changes/**/*.json'));
if (rushChangeFiles.length > 0) {
  console.error(`Looks like there are change files created by the "rush change" command.
Please use this command to create change files:
  npm run change -- -b upstream/5.0
If your remote is named "origin" then use this:
  npm run change -- -b origin/5.0
`);

  console.info(`These files need to be converted:\n${rushChangeFiles.map(file => `  - ${file}`).join('\n')}\n`);
  console.info('You can convert all of them to the new format with this command:');
  console.info('  node ./scripts/convert-change-files.js');
  process.exit(1);
}
