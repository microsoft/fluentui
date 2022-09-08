const fs = require('fs-extra');
const { join } = require('path');

/**
 * @returns {string}
 */
const getPackageRoot = () => {
  return process.cwd();
};

/**
 * @param {string} scenario
 * @returns {string}
 */
const getConfigDir = scenario => {
  return join(getPackageRoot(), 'benchmarks', scenario, 'config');
};

/**
 * @param {string} scenario
 * @returns {string}
 */
const getResultsDir = scenario => {
  return join(getPackageRoot(), 'benchmarks', scenario, 'results');
};

/**
 * @returns {string}
 */
const getScenariosDir = () => {
  return join(getPackageRoot(), 'scenarios');
};

/**
 * @param {string} dir
 * @returns {string[]}
 */
const readDirJson = dir => {
  return fs.readdirSync(dir).filter(file => file.endsWith('.json'));
};

/**
 * @param {string} path
 * @returns {boolean}
 */
const remove = path => {
  if (fs.pathExistsSync(path)) {
    fs.removeSync(path);
    return true;
  }

  return false;
};

/**
 * @param {string} path
 */
const mkdirp = path => {
  if (!fs.pathExistsSync(path)) {
    fs.mkdirpSync(path);
  }
};

/**
 * @param {string} path
 */
const ensureClean = path => {
  remove(path);
  mkdirp(path);
};

module.exports = {
  getConfigDir,
  getResultsDir,
  getScenariosDir,
  ensureClean,
  getPackageRoot,
  readDirJson,
};
