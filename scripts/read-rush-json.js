/**
 * Finds and reads the rush.json file.
 */
function readRushJson() {
  const fs = require('fs');
  const findConfig = require('./find-config');
  const stripJsonComments = require('strip-json-comments');

  const rushPath = findConfig('rush.json');
  if (rushPath) {
    const fileContents = fs.readFileSync(rushPath, 'utf8');
    return JSON.parse(stripJsonComments(fileContents));
  }
  console.warn('Unable to find rush.json relative to currently opened file');
}

module.exports = readRushJson;
