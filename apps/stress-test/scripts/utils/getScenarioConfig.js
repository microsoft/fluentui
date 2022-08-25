const fs = require('fs-extra');
const path = require('path');
const { getScenariosDir } = require('./paths');

/**
 * @function getScenarioConfig
 * @param {string} scenarioName
 * @returns {ScenarioConfig}
 */
const getScenarioConfig = scenarioName => {
  let scenarioConfig = require('../../scenarios/default.js');
  if (fs.existsSync(path.join(getScenariosDir(), `${scenarioName}.js`))) {
    const config = require(`../../scenarios/${scenarioName}.js`);
    scenarioConfig = {
      ...scenarioConfig,
      ...config,
    };
  }

  return scenarioConfig;
};

module.exports = getScenarioConfig;
