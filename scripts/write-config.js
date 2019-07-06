const fs = require('fs');
const findConfig = require('./find-config');
const jju = require('jju');

/**
 * Make the requested updates to the given config file.
 *
 * @param {string} file Full path to or name of the config file. If no file exists at the location
 * as given, `file` is assumed to be a config file name (such as rush.json) and the method will run
 * `findConfig(file)` to find the full path.
 * @param {any} newContents Object representing the new contents of the file. Any comments from the
 * original file should be preserved.
 * @returns True if operation succeeded
 */
function writeConfig(file, newValue) {
  file = findConfig(file);
  if (!file) {
    return false;
  }

  const oldContents = fs.readFileSync(file, 'utf8');
  const newContents = jju.update(oldContents, newValue, {
    mode: 'cjson',
    indent: 2
  });
  fs.writeFileSync(file, newContents);
  return true;
}

module.exports = writeConfig;
