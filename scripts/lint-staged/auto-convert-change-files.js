// @ts-check

const files = process.argv.slice(2);

const legacyChangeFile = files.find(file => file.includes('common/changes'));

if (legacyChangeFile) {
  console.warn('Legacy change file detected, will auto convert these to the new format.');
  console.warn('Please use "npm run change" to generate change files instead of "rush change"');
}

const convertChangeFiles = require('../convert-change-files');
convertChangeFiles();
