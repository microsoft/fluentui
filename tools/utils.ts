import * as yargsParser from 'yargs-parser';
import type * as Enquirer from 'enquirer';
import {
  joinPathFragments,
  logger,
  readProjectConfiguration,
  readWorkspaceConfiguration,
  Tree,
  getProjects as getAllProjects,
  ProjectConfiguration,
  readJson,
} from '@nrwl/devkit';
import { PackageJson } from './types';

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
    tsconfig: {
      main: joinPathFragments(projectConfig.root, 'tsconfig.json'),
      lib: joinPathFragments(projectConfig.root, 'tsconfig.lib.json'),
      test: joinPathFragments(projectConfig.root, 'tsconfig.spec.json'),
    },
    sourceRoot: joinPathFragments(projectConfig.root, 'src'),
    conformanceSetup: joinPathFragments(projectConfig.root, 'src', 'common', 'isConformant.ts'),
    babelConfig: joinPathFragments(projectConfig.root, '.babelrc.json'),
    jestConfig: joinPathFragments(projectConfig.root, 'jest.config.js'),
    jestSetupFile: joinPathFragments(projectConfig.root, 'config', 'tests.js'),
    rootTsconfig: '/tsconfig.base.json',
    rootPackageJson: '/package.json',
    rootJestPreset: '/jest.preset.js',
    rootJestConfig: '/jest.config.js',
    npmConfig: joinPathFragments(projectConfig.root, '.npmignore'),
    storybook: {
      rootFolder: joinPathFragments(projectConfig.root, '.storybook'),
      tsconfig: joinPathFragments(projectConfig.root, '.storybook/tsconfig.json'),
      main: joinPathFragments(projectConfig.root, '.storybook/main.js'),
      preview: joinPathFragments(projectConfig.root, '.storybook/preview.js'),
    },
    e2e: {
      rootFolder: joinPathFragments(projectConfig.root, 'e2e'),
      support: joinPathFragments(projectConfig.root, 'e2e', 'support.js'),
      tsconfig: joinPathFragments(projectConfig.root, 'e2e', 'tsconfig.json'),
    },
  };

  return {
    projectConfig,
    workspaceConfig,
    /**
     * package name without npmScope (@scopeName)
     */
    normalizedPkgName: options.packageName.replace(`@${workspaceConfig.npmScope}/`, ''),
    paths,
  };
}

export const workspacePaths = {
  workspace: '/workspace.json',
  nx: '/nx.json',
  tsconfig: '/tsconfig.base.json',
  packageJson: '/package.json',
  jest: { preset: '/jest.preset.js', config: '/jest.config.js' },
  github: {
    root: '/.github',
    codeowners: joinPathFragments('/.github', 'CODEOWNERS'),
  },
  storybook: {
    root: '/.storyboook',
  },
};

export type UserLog = Array<{ type: keyof typeof logger; message: string }>;
export function printUserLogs(logs: UserLog) {
  if (logs.length === 0) {
    return;
  }

  logger.log(`${'='.repeat(80)}\n`);

  logs.forEach(log => logger[log.type](log.message));

  logger.log(`${'='.repeat(80)}\n`);
}

/**
 * Overridden `@nrwl/devkit#getProjects` function
 * Get all workspace projects or only subset, if projectNames array is specified
 *
 * @param tree
 * @param projectNames - array of project names. Use this to return only subset of projects
 */
export function getProjects(tree: Tree, projectNames?: string[]) {
  const allProjects = getAllProjects(tree);

  if (Array.isArray(projectNames) && projectNames.length > 0) {
    const pickedProjects: ReturnType<typeof getAllProjects> = new Map();

    for (const [projectName, projectConfig] of allProjects.entries()) {
      if (projectNames.includes(projectName)) {
        pickedProjects.set(projectName, projectConfig);
      }
    }

    return pickedProjects;
  }

  return allProjects;
}

export function hasSchemaFlag<T, K extends keyof T>(schema: T, flag: K): schema is T & Record<K, NonNullable<T[K]>> {
  return Boolean(schema[flag]);
}

export function isPackageConverged(tree: Tree, project: ProjectConfiguration) {
  const packageJson = readJson<PackageJson>(tree, joinPathFragments(project.root, 'package.json'));
  return packageJson.version.startsWith('9.');
}

export function isV8Package(tree: Tree, project: ProjectConfiguration) {
  const packageJson = readJson<PackageJson>(tree, joinPathFragments(project.root, 'package.json'));
  return packageJson.version.startsWith('8.');
}
