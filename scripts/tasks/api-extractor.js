// @ts-check

const glob = require('glob');
const path = require('path');
const { apiExtractorVerifyTask, task, series } = require('just-scripts');

const apiExtractorConfigs = glob
  .sync(path.join(process.cwd(), 'config/api-extractor*.json'))
  .map(configPath => [configPath, configPath.replace(/.*\bapi-extractor(?:-(.*))?\.json$/, '$1') || 'default']);

// Whether to update automatically on build
const localBuild = !process.env.TF_BUILD;

function apiExtractor() {
  return apiExtractorConfigs.length
    ? series(
        ...apiExtractorConfigs.map(([configPath, configName]) => {
          const taskName = `api-extractor:${configName}`;
          task(taskName, apiExtractorVerifyTask({ configJsonFilePath: configPath, localBuild }));
          return taskName;
        }),
      )
    : 'no-op';
}

module.exports = { apiExtractor };
