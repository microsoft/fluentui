const fs = require('fs-extra');
const path = require('path');
const { getScenariosDir } = require('./paths');

/**
 * @function getScenarioConfig
 * @param {string} scenarioName
<<<<<<< HEAD
 * @returns {Object.<string, any>}
 */
const getScenarioConfig = scenarioName => {
  const scenarioConfig = require('../../scenarios/default.js');
  let returnConfig = { ...scenarioConfig };
  if (fs.existsSync(path.join(getScenariosDir(), `${scenarioName}.js`))) {
    const config = require(`../../scenarios/${scenarioName}.js`);
    returnConfig = {
      ...returnConfig,
=======
 * @returns {ScenarioConfig}
 */
const getScenarioConfig = scenarioName => {
  let scenarioConfig = require('../../scenarios/default.js');
  if (fs.existsSync(path.join(getScenariosDir(), `${scenarioName}.js`))) {
    const config = require(`../../scenarios/${scenarioName}.js`);
    scenarioConfig = {
      ...scenarioConfig,
>>>>>>> 76c9e7deb9 (stress-test: add cli application)
      ...config,
    };
  }

<<<<<<< HEAD
  return returnConfig;
=======
  return scenarioConfig;
>>>>>>> 76c9e7deb9 (stress-test: add cli application)
};

module.exports = getScenarioConfig;
