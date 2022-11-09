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
  const messages = {
    TS7016: [] as string[],
    TS2305: [] as string[],
  };

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
              onResult: result => {
                if (!isUsingTsSolutionConfigs) {
                  return;
                }
                if (result.succeeded === true) {
                  return;
                }

                if (messages.TS2305.length) {
                  const errTitle = [
                    chalk.bgRed.white.bold(`api-extractor | API VIOLATION:`),
                    chalk.red(`  Your package public API uses \`@internal\` marked API's from following packages:`),
                    '\n',
                  ].join('');
                  const logErr = formatApiViolationMessage(messages.TS2305);

                  logger.error(errTitle, logErr, '\n');
                }

                if (messages.TS7016.length) {
                  const errTitle = [
                    chalk.bgRed.white.bold(`api-extractor | MISSING DEPENDENCY TYPE DECLARATIONS:`),
                    chalk.red(`  Package dependencies are missing index.d.ts type definitions:`),
                    '\n',
                  ].join('');
                  const logErr = formatMissingApiViolationMessage(messages.TS7016);
                  const logFix = chalk.blueBright(
                    `${chalk.bold('🛠 FIX')}: run '${chalk.italic(`yarn lage generate-api --to ${packageJson.name}`)}'`,
                  );

                  logger.error(errTitle, logErr, '\n', logFix, '\n');
                }
              },

              messageCallback: message => {
                if (!isUsingTsSolutionConfigs) {
                  return;
                }
                if (message.category !== messageCategories.Compiler) {
                  return;
                }

                if (message.messageId === compilerMessages.TS2305) {
                  messages.TS2305.push(message.text);
                }

                if (message.messageId === compilerMessages.TS7016) {
                  messages.TS7016.push(message.text);
                }
              },
              onConfigLoaded: config => {
                if (!(isUsingTsSolutionConfigs && tsConfig)) {
                  return;
                }

                logger.info(`api-extractor: package is using TS path aliases. Overriding TS compiler settings.`);

                const compilerConfig = getTsPathAliasesApiExtractorConfig({
                  tsConfig,
                  tsConfigPath,
                  packageJson,
                });

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

/**
 *
 * @example
 *
 * ```
 (TS2305) Module '"@fluentui/react-shared-contexts"' has no exported member 'ThemeContextValue_unstable'.
 (TS2305) Module '"@fluentui/react-shared-contexts"' has no exported member 'TooltipVisibilityContextValue_unstable'.

  ↓ ↓ ↓

 @fluentui/react-shared-contexts:
        - TooltipVisibilityContextValue_unstable
        - ThemeContextValue_unstable
 ```
 */
function formatApiViolationMessage(messages: string[]) {
  const regexPkg = /'"(@fluentui\/[a-z-]+)"'/i;
  const exportedTokenRegex = /'([a-z-_]+)'/i;

  const byPackage = messages.reduce((acc, curr) => {
    const [, packageName] = regexPkg.exec(curr) ?? [];
    const [, exportedToken] = exportedTokenRegex.exec(curr) ?? [];
    if (acc[packageName]) {
      acc[packageName].add(exportedToken);
      return acc;
    }
    acc[packageName] = new Set([exportedToken]);
    return acc;
  }, {} as Record<string, Set<string>>);

  return Object.entries(byPackage)
    .map(([packageName, tokens]) => {
      return [
        chalk.red.underline(packageName) + ':',
        Array.from(tokens)
          .map(token => chalk.italic.red('  - ' + token))
          .join('\n'),
      ].join('\n');
    })
    .join('\n');
}

/**
 *
 * @example
 ```
 (TS7016) Could not find a declaration file for module '@fluentui/react-theme'
 (TS7016) Could not find a declaration file for module '@fluentui/react-shared-contexts'

 ↓ ↓ ↓

 - @fluentui/react-theme
 - @fluentui/react-shared-contexts
 ```
 */
function formatMissingApiViolationMessage(messages: string[]) {
  const regexPkg = /'(@fluentui\/[a-z-]+)'/i;

  return Object.values(
    messages.reduce((acc, curr) => {
      const [, packageName] = regexPkg.exec(curr) ?? [];
      acc[curr] = chalk.italic.red('\t- ' + packageName);
      return acc;
    }, {} as Record<string, string>),
  ).join('\n');
}
