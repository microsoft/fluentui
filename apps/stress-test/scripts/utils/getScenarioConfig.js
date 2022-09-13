const fs = require('fs-extra');
const path = require('path');
const { getScenariosDir } = require('./paths');

/**
 * @function getScenarioConfig
 * @param {string} scenarioName
 * @returns {Object.<string, any>}
 */
const getScenarioConfig = scenarioName => {
  const scenarioConfig = require('../../scenarios/default.js');
  let returnConfig = { ...scenarioConfig };
  if (fs.existsSync(path.join(getScenariosDir(), `${scenarioName}.js`))) {
    const config = require(`../../scenarios/${scenarioName}.js`);
    returnConfig = {
      ...returnConfig,
      ...config,
    };
  }

  return returnConfig;
};

module.exports = getScenarioConfig;
