const getScenarioConfig = require('./getScenarioConfig');

/**
 * @param {Object.<string, any>} parsedOptions
 * @returns {Object.<string, any>}
 */
const processOptions = parsedOptions => {
  if (parsedOptions.useConfig) {
    const scenarioConfig = getScenarioConfig(parsedOptions.scenario);

    const options = {
      ...scenarioConfig,
      ...parsedOptions,
      sizes: !parsedOptions.sizes && scenarioConfig.sizes ? Object.keys(scenarioConfig.sizes) : parsedOptions.sizes,
    };

    return options;
  }

  return parsedOptions;
};

module.exports = processOptions;
