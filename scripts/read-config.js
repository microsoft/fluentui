// @ts-check

const fs = require('fs');
const findConfig = require('./find-config');
const jju = require('jju');

/**
 * Read and parse the given config file.
 *
 * @param {string} file Full path to or name of the config file. If no file exists at the location
 * as given, `file` is assumed to be a config file name and the method will run
 * `findConfig(file)` to find the full path.
 * @returns {any} Parsed config file contents
 */
function readConfig(file) {
  file = findConfig(file);
  if (file && fs.existsSync(file)) {
    return jju.parse(fs.readFileSync(file, 'utf8'));
  }
}

module.exports = { readConfig };
