import * as glob from 'glob';
import * as path from 'path';
import { apiExtractorVerifyTask, task, series } from 'just-scripts';

const apiExtractorConfigs = glob
  .sync(path.join(process.cwd(), 'config/api-extractor*.json'))
  .map(configPath => [configPath, configPath.replace(/.*\bapi-extractor(?:\.(.*))?\.json$/, '$1') || 'default'])
  .filter(([, configName]) => configName !== 'local');

// Whether to update automatically on build
const localBuild = !process.env.TF_BUILD;

export function apiExtractor() {
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
