import * as yargsParser from 'yargs-parser';
import type * as Enquirer from 'enquirer';
import { joinPathFragments, logger, readProjectConfiguration, readWorkspaceConfiguration, Tree } from '@nrwl/devkit';

/**
 * CLI prompts abstraction to trigger dynamic prompts within a generator
 *
 * @remarks
 * - lazy loads enquirer only when needed making CLI programs faster to load/execute
 *
 * @param questions
 */
export async function prompt<T extends Record<string, unknown>>(questions: Parameters<Enquirer['prompt']>[0]) {
  const EnquirerLazy = await import('enquirer');

  const response = await EnquirerLazy.prompt<T>(questions);

  return response;
}

/**
 * Determine if manual dynamic prompts should be enabled within generator
 *
 * @remarks
 *
 * This should be used if, and only if, you need to setup manual dynamic prompts within your generator.
 *
 * - prompts should be turned off whenever `--no-interactive` is used
 * - turning off prompts is usually what is expected when invoking generator via Nx Console
 * - within tests:
 *   - you should mock `enquirer` accordingly via `jest.mock('enquirer',()=>({ async prompt()=>{} }))`
 *   - then within test suite mock implementation based on your needs:
 *        `const promptSpy = jest.spyOn(Enquirer, 'prompt').mockImplementation(...)`
 *
 * @param [args=process.argv.slice(2)] - command-line arguments passed when the Node.js process was launched (https://nodejs.org/docs/latest/api/process.html#process_process_argv). Default value is `process.argv.slice(2)`
 */
export function arePromptsEnabled(args = process.argv.slice(2)) {
  const parsedArgs = parseArgs(args);
  return parsedArgs.interactive;
}

/**
 *
 * Manual parser of CLI flags which follows similar definition like nx tao. @see https://github.com/nrwl/nx/blob/master/packages/tao/src/commands/generate.ts#L41
 *
 * @remarks
 *
 * This is a low level implementation. What you want to use is {@link arePromptsEnabled}
 *
 * Use this only if you need to setup manual dynamic prompts within your generator.
 * - prompts should be turned off whenever`--no-interactive` is used
 * - turning off prompts is usually what is expected when invoking generator via Nx Console
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseArgs<T extends Record<string, any>>(args: string[]) {
  type ParsedArguments = yargsParser.Arguments &
    T & {
      interactive: boolean;
    };

  const parsedArguments = yargsParser(args, {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    boolean: ['interactive'],
    default: {
      interactive: true,
    },
  }) as ParsedArguments;

  return parsedArguments;
}

export { updateJestConfig } from '@nrwl/jest/src/generators/jest-project/lib/update-jestconfig';

export function getProjectConfig(tree: Tree, options: { packageName: string }) {
  const projectConfig = readProjectConfiguration(tree, options.packageName);
  const workspaceConfig = readWorkspaceConfiguration(tree);
  const paths = {
    configRoot: joinPathFragments(projectConfig.root, 'config'),
    packageJson: joinPathFragments(projectConfig.root, 'package.json'),
    tsconfig: joinPathFragments(projectConfig.root, 'tsconfig.json'),
    babelConfig: joinPathFragments(projectConfig.root, '.babelrc.json'),
    jestConfig: joinPathFragments(projectConfig.root, 'jest.config.js'),
    rootTsconfig: '/tsconfig.base.json',
    rootJestPreset: '/jest.preset.js',
    rootJestConfig: '/jest.config.js',
    npmConfig: joinPathFragments(projectConfig.root, '.npmignore'),
    storybook: {
      rootFolder: joinPathFragments(projectConfig.root, '.storybook'),
      tsconfig: joinPathFragments(projectConfig.root, '.storybook/tsconfig.json'),
      main: joinPathFragments(projectConfig.root, '.storybook/main.js'),
      preview: joinPathFragments(projectConfig.root, '.storybook/preview.js'),
    },
  };

  return {
    projectConfig,
    workspaceConfig,
    paths,
  };
}

export type UserLog = Array<{ type: keyof typeof logger; message: string }>;
export function printUserLogs(logs: UserLog) {
  logger.log(`${'='.repeat(80)}\n`);

  logs.forEach(log => logger[log.type](log.message));

  logger.log(`${'='.repeat(80)}\n`);
}
