const fs = require('fs');
const findConfig = require('./find-config');
const stripJsonComments = require('strip-json-comments');

/**
 * Read and parse the given config file, stripping comments before parsing.
 * @param {string} filePath Path to the config file
 * @returns Parsed config file contents
 */
function readConfig(filePath) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(stripJsonComments(fileContents));
}

/**
 * Finds and reads the rush.json file.
 */
function readRushJson() {
  const rushPath = findConfig('rush.json');
  if (rushPath) {
    return readConfig(rushPath);
  }
  console.warn('Unable to find rush.json relative to currently opened file');
}

module.exports = {
  readConfig,
  readRushJson
};
