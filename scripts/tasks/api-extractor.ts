import fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';
import jju from 'jju';
import { apiExtractorVerifyTask, task, series, resolveCwd, logger, TaskFunction, TscTaskOptions } from 'just-scripts';

const apiExtractorConfigs = glob
  .sync(path.join(process.cwd(), 'config/api-extractor*.json'))
  .map(configPath => [configPath, configPath.replace(/.*\bapi-extractor(?:\.(.*))?\.json$/, '$1') || 'default'])
  .filter(([, configName]) => configName !== 'local');

// Whether to update automatically on build
const localBuild = !process.env.TF_BUILD;

export function apiExtractor() {
  return apiExtractorConfigs.length
    ? (series(
        ...apiExtractorConfigs.map(([configPath, configName]) => {
          const taskName = `api-extractor:${configName}`;

          task(
            taskName,
            apiExtractorVerifyTask({
              configJsonFilePath: configPath,
              localBuild,
              onConfigLoaded: config => {
                const tsConfig: TsConfig = jju.parse(fs.readFileSync(resolveCwd('./tsconfig.json'), 'utf-8'));
                const isUsingTsSolutionConfigs = fs.existsSync(resolveCwd('./tsconfig.lib.json'));

                if (isUsingTsSolutionConfigs) {
                  logger.info(`api-extractor: package is using TS path aliases. Overriding TS compiler settings.`);
                  // baseUrl is the only override needed, but if any overrides are specified, API Extractor
                  // no longer reads the default tsconfig.json. So we have to include the whole tsconfig here.
                  tsConfig.compilerOptions.baseUrl = '.';
                  config.compiler = {
                    overrideTsconfig: tsConfig,
                  };
                }
              },
            }),
          );

          return taskName;
        }),
      ) as TaskFunction)
    : 'no-op';
}

interface TsConfig {
  extends?: string;

  /**
   * typescript doesn't provide a correct type for the compiler options file
   * (`typescript.CompilerOptions` has enum values instead of raw options in some cases)
   */
  compilerOptions: Omit<TscTaskOptions, 'nodeArgs'>;
  include?: string[];
  exclude?: string[];
}
