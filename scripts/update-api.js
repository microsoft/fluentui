const path = require('path');
const packageName = path.basename(process.cwd());
const apiFileName = `etc/${packageName}.api.ts`;

const green = '\x1b[32m%s\x1b[0m';
const yellow = '\x1b[33m%s\x1b[0m';
const red = '\x1b[31m%s\x1b[0m';
const cyan = '\x1b[36m%s\x1b[0m';

/**
 * Run the ts build task so that API Extractor is using the most recent package lib files.
 */
require('./tasks/ts')({})
  .then(() => {
    console.log(cyan, `- Update API: compiled successfully, checking ${apiFileName}...`);
    checkApi();
  })
  .catch(ex => {
    console.error(red, 'Update API: failed to compile.');
  });

/**
 * Checks the api.ts file to see whether it needs to be updated.
 */
function checkApi() {
  try {
    require('./tasks/api-extractor')({});
    console.log(green, `- Update API: ${apiFileName} is already up to date, no update needed.`);
  } catch (ex) {
    console.warn(yellow, `- Update API: ${apiFileName} is out of date, updating...`);
    updateApi();
  }
}

/**
 * Updates the api.ts file by running api-extractor with the --local option.
 */
function updateApi() {
  try {
    require('./tasks/api-extractor')({
      args: '--local'
    });
    console.log(cyan, `- Update API: successfully updated ${apiFileName}, verifying the updates...`);
    verifyApi();
  } catch (ex) {
    console.error(red, `- Update API: failed to update ${apiFileName}.`);
  }
}

/**
 * Verifies that the updated api.ts file passes the api-extractor task.
 */
function verifyApi() {
  try {
    require('./tasks/api-extractor')({});
    console.log(green, `- Update API: successfully verified ${apiFileName}. ` + `Please commit ${apiFileName} as part of your changes.`);
  } catch (ex) {
    console.error(red, `Update API: api-extractor failed after update: ${ex}`);
  }
}
