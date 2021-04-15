import * as glob from 'glob';
import * as path from 'path';
import { apiExtractorVerifyTask, task, series } from 'just-scripts';

const apiExtractorConfigs = glob
  .sync(path.join(process.cwd(), 'config/api-extractor*.json'))
  .map(configPath => [configPath, configPath.replace(/.*\bapi-extractor(?:\.(.*))?\.json$/, '$1') || 'default'])
  .filter(([, configName]) => configName !== 'local');

// Whether to update automatically on build
const localBuild = !process.env.TF_BUILD;

const printResult = (a: any, b: any, c: any) => {
  console.log('qwerty100');
  console.log('a', a);
  console.log('b', b);
  console.log('c', c);
  console.log('001ytrewq');
};

export function apiExtractor() {
  return apiExtractorConfigs.length
    ? series(
        ...apiExtractorConfigs.map(([configPath, configName]) => {
          const taskName = `api-extractor:${configName}`;
          task(taskName, apiExtractorVerifyTask({ configJsonFilePath: configPath, localBuild, onResult: printResult }));
          return taskName;
        }),
      )
    : 'no-op';
}
