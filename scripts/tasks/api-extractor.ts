import * as glob from 'glob';
import * as path from 'path';
import { apiExtractorVerifyTask, task, series, logger, TaskFunction } from 'just-scripts';
import { ExtractorMessageCategory } from '@microsoft/api-extractor';
import chalk from 'chalk';
import { getTsPathAliasesConfig, getTsPathAliasesApiExtractorConfig } from './utils';
import { getJustArgv } from './argv';

const apiExtractorConfigs: Array<
  [
    configPath: string,
    /**
     * config name is created from <configName> suffix `api-extractor.<configName>.json`.
     * @example
     * `api-extractor.fast.json -> configName === fast`
     *
     * default behavior:
     * `api-extractor.json -> configName === default`
     */
    configName: string,
  ]
> = glob
  .sync(path.join(process.cwd(), 'config/api-extractor*.json'))
  .map(configPath => [configPath, configPath.replace(/.*\bapi-extractor(?:\.(.*))?\.json$/, '$1') || 'default']);

const apiExtractorConfigsForExecution = apiExtractorConfigs.filter(([, configName]) => configName !== 'local');

const compilerMessages = {
  /**
   * Module has no exported member '<identifier-name>'.
   * This error is thrown when package uses other package `@internal` API's that are removed
   */
  TS2305: 'TS2305',
  /**
   * Could not find a declaration file for module
   * This error is thrown when package depends on package that is missing rollup .d.ts (needs to be generated)
   */
  TS7016: 'TS7016',
};

/**
 * Utility to convert enums (which lack proper strict dictionary checking) to strict dictionary
 *
 * This is mainly needed because api-extractor ships everything as typescript enums
 */
type CreateStrictDictionary<T extends Record<string, string>> = { [K in keyof T]: `${T[K]}` };

const messageCategories: CreateStrictDictionary<typeof ExtractorMessageCategory> = {
  Compiler: 'Compiler',
  Console: 'console',
  Extractor: 'Extractor',
  TSDoc: 'TSDoc',
};

/**
 * @see https://api-extractor.com/pages/commands/api-extractor_run/
 */
interface ApiExtractorCliRunCommandArgs {
  config: string;
  diagnostics: boolean;
  local: boolean;
  verbose: boolean;
  'typescript-compiler-folder': string;
}

export function apiExtractor() {
  const args: ReturnType<typeof getJustArgv> & Partial<ApiExtractorCliRunCommandArgs> = getJustArgv();

  const { isUsingTsSolutionConfigs, packageJson, tsConfig, tsConfigPath } = getTsPathAliasesConfig();

  return apiExtractorConfigsForExecution.length
    ? (series(
        ...apiExtractorConfigsForExecution.map(([configPath, configName]) => {
          const taskName = `api-extractor:${configName}`;

          task(
            taskName,

            apiExtractorVerifyTask({
              showVerboseMessages: args.verbose,
              showDiagnostics: args.diagnostics,
              typescriptCompilerFolder: args['typescript-compiler-folder'],
              configJsonFilePath: args.config ?? configPath,
              localBuild: args.local ?? !process.env.TF_BUILD,

              messageCallback: message => {
                if (!isUsingTsSolutionConfigs) {
                  return;
                }
                if (message.category !== messageCategories.Compiler) {
                  return;
                }

                if (message.messageId === compilerMessages.TS2305) {
                  logger.error(
                    chalk.bgRed.white.bold(`api-extractor | API VIOLATION:`),
                    chalk.red(`Looks like your package public API surface uses \`@internal\` marked API's!`),
                    '\n',
                  );
                }

                if (message.messageId === compilerMessages.TS7016) {
                  logger.error(
                    chalk.bgRed.white.bold(`api-extractor | MISSING DEPENDENCY TYPE DECLARATIONS:`),
                    chalk.red(`Looks like your package dependencies don't have generated index.d.ts type definitions.`),
                    '\n',
                    chalk.blueBright(
                      `🛠 Fix this by running: ${chalk.italic(`yarn lage generate-api --to ${packageJson.name}`)}`,
                    ),
                    '\n',
                  );
                }
              },
              onConfigLoaded: config => {
                if (!(isUsingTsSolutionConfigs && tsConfig)) {
                  return;
                }

                logger.info(`api-extractor: package is using TS path aliases. Overriding TS compiler settings.`);
                const compilerConfig = getTsPathAliasesApiExtractorConfig({ tsConfig, tsConfigPath, packageJson });

                config.compiler = compilerConfig;
              },
            }),
          );

          return taskName;
        }),
      ) as TaskFunction)
    : () => {
        if (apiExtractorConfigs.length) {
          logger.info(
            `skipping api-extractor execution - no configs to execute present besides: '${apiExtractorConfigs}'`,
          );
          return;
        }

        logger.info(`skipping api-extractor execution - no configs present`);
      };
}
