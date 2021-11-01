import fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';
import jju from 'jju';
import { apiExtractorVerifyTask, task, series, resolveCwd, logger, TscTaskOptions, condition } from 'just-scripts';

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
          // note we have `"strictNullChecks": false,` turned off - so from TS point of view this always returns API 🚨
          const overrideApi = overrideExtractorConfigForPackagesWithTsPathAliases({
            apiExtractorConfigPath: configPath,
            tsConfigPath: resolveCwd('./tsconfig.json'),
          });

          const shouldExecOverrideTasks = () => overrideApi !== null;

          task('api-extractor:override-config', () => {
            if (overrideApi) {
              overrideApi.overrideConfig();
            }
          });
          task('api-extractor:cleanup-override-config', () => {
            if (overrideApi) {
              overrideApi.resetConfig();
            }
          });

          const taskName = `api-extractor:${configName}`;
          task(
            taskName,
            series(
              condition('api-extractor:override-config', shouldExecOverrideTasks),
              apiExtractorVerifyTask({ configJsonFilePath: configPath, localBuild }),
              condition('api-extractor:cleanup-override-config', shouldExecOverrideTasks),
            ),
          );

          return taskName;
        }),
      )
    : 'no-op';
}

interface TsConfig {
  extends?: string;

  /**
   * typescript doesn't provide a correct type for the compiler options file
   * -> (typescript.CompilerOptions has enum values instead of raw options in some cases)
   */
  compilerOptions: TscTaskOptions;
  include?: string[];
  exclude?: string[];
}

function overrideExtractorConfigForPackagesWithTsPathAliases(options: {
  tsConfigPath: string;
  apiExtractorConfigPath: string;
}) {
  const tsConfig: TsConfig = jju.parse(fs.readFileSync(options.tsConfigPath, 'utf-8'));
  const shouldOverrideConfig = Boolean(tsConfig.extends);

  if (!shouldOverrideConfig) {
    return null;
  }

  logger.info(`📣 API-EXTRACTOR: package is using TS path aliases. Overriding ts compiler settings for api-extractor.`);

  const originalContent = fs.readFileSync(options.apiExtractorConfigPath, 'utf-8');
  const apiExtractorConfigOriginal = jju.parse(originalContent, { mode: 'json' });

  tsConfig.compilerOptions.baseUrl = '.';
  apiExtractorConfigOriginal.compiler = {
    overrideTsconfig: tsConfig,
  };

  const api = {
    overrideConfig: () => {
      const newContent = jju.update(originalContent, apiExtractorConfigOriginal, { mode: 'json', indent: 2 });

      fs.writeFileSync(options.apiExtractorConfigPath, newContent, 'utf-8');
    },
    resetConfig: () => {
      fs.writeFileSync(options.apiExtractorConfigPath, originalContent, 'utf-8');
    },
  };

  return api;
}
