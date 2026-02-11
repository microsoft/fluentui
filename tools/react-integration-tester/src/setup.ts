/* eslint-disable dot-notation */
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { execSync } from 'node:child_process';

import * as ejs from 'ejs';

import type { Args, ReactVersion, PackageJson, TsConfig } from './shared';
import {
  runCmd,
  readCommandsFromPreparedProject,
  getMergedTemplate,
  parseJson,
  writeJsonFile,
  serializeJson,
} from './shared';
import { type Logger } from './logger';

function findGitRoot(cwd: string) {
  const output = execSync('git rev-parse --show-toplevel', { cwd });

  return output.toString().trim();
}
/**
 * Generate a unique name for running CLI commands
 * @param prefix
 *
 * @returns `'<prefix><random number>'`
 */
function uniq(prefix: string) {
  return `${prefix}${Math.floor(Math.random() * 10000000)}`;
}

function computeRoots(cwd: string, reactVersion: number) {
  const workspaceRoot = findGitRoot(cwd);
  const tmpRoot = join(workspaceRoot, 'tmp');
  const scaffoldRoot = join(tmpRoot, 'rit');
  const reactRootPath = join(scaffoldRoot, `react-${reactVersion}`);
  return { workspaceRoot, scaffoldRoot, reactRootPath } as const;
}

function createProject(options: {
  projectName: string;
  react: ReactVersion;
  projectId?: string;
  force?: boolean;
  scaffoldRoot: string;
}): {
  /**
   * The absolute path to the project directory scaffolded for testing.
   */
  projectPath: string;
  /**
   * The name of the project scaffolded for testing.
   */
  projectName: string;
} {
  // If projectId provided, use deterministic name, otherwise use uniq()
  const base = `${options.projectName}-react-${options.react}`;
  const finalName = options.projectId ? `${base}-${options.projectId}` : uniq(base);
  if (options.force) {
    removeTmpProject(options.scaffoldRoot, options.react, finalName);
  }
  const { projectPath } = ensureProject(options.scaffoldRoot, options.react, finalName);
  return { projectPath, projectName: finalName };
}
function removeTmpProject(scaffoldRoot: string, react: ReactVersion, project: string) {
  // Remove only the project folder under its react root; do not delete shared node_modules
  const projectPathGlob = join(scaffoldRoot, `react-${react}`, project);
  // Best-effort remove if exists in any react root
  rmSync(projectPathGlob, { recursive: true, force: true });
}
function ensureProject(scaffoldRoot: string, react: ReactVersion, project: string) {
  const projectPath = join(scaffoldRoot, `react-${react}`, project);
  mkdirSync(projectPath, { recursive: true });
  return { projectPath };
}

function getProjectInfo(cwd: string): {
  /**
   * The normalized name (without npm scope) of the project which will be tested against react integration.
   */
  projectName: string;
  /**
   * The absolute path to the project directory which will be tested against react integration.
   */
  projectRoot: string;
} {
  const projectRoot = cwd;

  const projectPaths = {
    packageJson: join(projectRoot, 'package.json'),
  };

  if (!existsSync(projectPaths.packageJson)) {
    throw new Error(`Could not find package.json at: ${projectPaths.packageJson}`);
  }

  return {
    projectName: getNormalizedProjectName(projectRoot),
    projectRoot,
  };
}

function getNormalizedProjectName(cwd: string): string {
  const packageJsonPath = join(cwd, 'package.json');
  const packageJson = parseJson(packageJsonPath);
  return packageJson.name.replace(/^@[a-z-]+\//gi, '');
}

function getPreparedProjectPath(params: { react: ReactVersion; projectId: string; cwd: string; scaffoldRoot: string }) {
  const projectName = getNormalizedProjectName(params.cwd);
  const finalName = `${projectName}-react-${params.react}-${params.projectId}`;
  return join(params.scaffoldRoot, `react-${params.react}`, finalName);
}

function renderTemplateToFile(templateFilePath: string, data: Record<string, unknown>, outFilePath: string) {
  const content = readFileSync(templateFilePath, 'utf-8');
  const rendered = ejs.render(content, data, { filename: templateFilePath });
  writeFileSync(outFilePath, rendered);
}

/**
 * Create or update the shared React root package.json with the provided dependencies.
 * Writes only when the file does not exist or dependencies actually change (to avoid race issues on CI).
 * Returned value indicates whether a write occurred.
 */
function ensureWorkspaceIsolation(reactRootPath: string) {
  const yarnLockPath = join(reactRootPath, 'yarn.lock');
  if (!existsSync(yarnLockPath)) {
    writeFileSync(yarnLockPath, '');
  }

  const yarnrcPath = join(reactRootPath, '.yarnrc.yml');
  if (!existsSync(yarnrcPath)) {
    writeFileSync(yarnrcPath, 'nodeLinker: node-modules\n');
  }
}

function upsertReactRootPackageJson(params: {
  reactRootPath: string;
  react: ReactVersion;
  dependencies: Record<string, string>;
  logger?: Logger;
}): { wrote: boolean; pkgPath: string } {
  const { reactRootPath, react, dependencies, logger } = params;
  mkdirSync(reactRootPath, { recursive: true });
  ensureWorkspaceIsolation(reactRootPath);
  const reactRootPkgPath = join(reactRootPath, 'package.json');

  const basePkg: PackageJson = {
    name: `@rit/react-${react}-root`,
    private: true,
    version: '0.0.0',
    license: 'UNLICENSED',
  };

  let existingPkg: PackageJson | null = null;
  if (existsSync(reactRootPkgPath)) {
    try {
      existingPkg = parseJson<PackageJson>(reactRootPkgPath);
    } catch (e) {
      // If parsing fails we deliberately re-create the file (helps recover from partial writes on CI)
      logger?.warn?.(`Failed to parse existing react root package.json. Recreating. Path: ${reactRootPkgPath}`);
    }
  }

  const prevDeps = existingPkg?.dependencies ?? basePkg.dependencies ?? {};
  const mergedDeps = { ...prevDeps, ...dependencies };
  const depsChanged = JSON.stringify(prevDeps) !== JSON.stringify(mergedDeps) || !existsSync(reactRootPkgPath);

  if (depsChanged) {
    const nextPkg: PackageJson = {
      ...(existingPkg ?? basePkg),
      dependencies: mergedDeps,
    };
    writeJsonFile(reactRootPkgPath, nextPkg);
    logger?.verbose?.(
      `${existingPkg ? 'Updated' : 'Created'} react root package.json (${
        Object.keys(mergedDeps).length
      } deps) at ${reactRootPkgPath}`,
    );
    return { wrote: true, pkgPath: reactRootPkgPath };
  }
  logger?.verbose?.('React root package.json unchanged; no write performed.');
  return { wrote: false, pkgPath: reactRootPkgPath };
}

function createProjectPackageJson(options: {
  projectPath: string;
  projectName: string;
  usedNodeModulesDirRelative: string;
  commands: Record<string, string>;
}) {
  // Create project-level package.json exposing runnable scripts (no dependencies here)
  const parentBinRel = join(options.usedNodeModulesDirRelative, 'node_modules', '.bin');
  const addRelativeBinPathToCmd = (cmd: string) => {
    // Extract the first word (command name) from the command string
    const [commandName, ...argsRest] = cmd.split(' ');
    const binPath = join(parentBinRel, commandName);

    // Prepend with node and the bin path, preserving any arguments
    if (argsRest.length === 0) {
      throw new Error(`Command "${commandName}" has no arguments`);
    }
    return `node ${binPath} ${argsRest.join(' ')}`;
  };
  const projectScripts = Object.fromEntries(
    Object.entries(options.commands).map(([k, v]) => [k, addRelativeBinPathToCmd(v)]),
  ) as Record<string, string>;
  const projectPkg: PackageJson = {
    name: options.projectName,
    private: true,
    version: '0.0.0',
    license: 'UNLICENSED',
    scripts: projectScripts,
  } as const;

  writeFileSync(join(options.projectPath, 'package.json'), JSON.stringify(projectPkg, null, 2));
}

function prepareTsConfigTemplate(options: {
  projectRoot: string;
  projectPath: string;
  projectTsConfigPath: string;
  workspaceRoot: string;
}) {
  const projectTsConfigPath = join(options.projectRoot, options.projectTsConfigPath);

  if (!existsSync(projectTsConfigPath)) {
    return null;
  }

  const excludeDefaults = [
    '**/index.stories.tsx',
    '**/index.stories.ts',
    '**/*.spec.tsx',
    '**/*.test.tsx',
    '**/src/testing/**',
    '**/*.cy.tsx',
    '**/*.cy.tsx',
  ];

  const filesDefaults = [
    // TODO: this should be actually transformed from origin provided `compilerOptions.types`
    // ATM this is hardcoded and coupled to fluent repo
    join(relative(options.projectPath, options.workspaceRoot), 'typings/static-assets/index.d.ts'),
  ];

  const tsConfig: TsConfig = parseJson(join(options.projectRoot, options.projectTsConfigPath));
  if (!tsConfig.include) {
    throw new Error(`No include paths found at: ${options.projectTsConfigPath}`);
  }

  // if user config has exclude, always use those
  const excludePaths = tsConfig?.exclude ?? excludeDefaults;
  const relativeExcludePaths = excludePaths.map(excludePath => {
    return relative(options.projectPath, join(options.projectRoot, excludePath));
  });

  const relativeIncludePaths = tsConfig.include?.map(includePath => {
    return relative(options.projectPath, join(options.projectRoot, includePath));
  });

  const relativeFilesPaths = (tsConfig.files ?? [])
    .map(includePath => {
      return relative(options.projectPath, join(options.projectRoot, includePath));
    })
    .concat(filesDefaults);

  // honor strict setting or default to always true
  const strictMode = tsConfig?.compilerOptions?.strict ?? true;

  const target = tsConfig.compilerOptions?.target ?? 'ES2019';
  const lib = tsConfig.compilerOptions?.lib ?? ['ES2019', 'DOM'];

  return {
    pathToProjectConfig: options.projectTsConfigPath,
    relativeIncludePaths,
    relativeExcludePaths,
    relativeFilesPaths,
    target,
    lib,
    strictMode,
  };
}

async function installDependenciesAtReactRoot(reactVersionRootPath: string) {
  if (!existsSync(join(reactVersionRootPath, 'package.json'))) {
    throw new Error(`Missing package.json at react root: ${reactVersionRootPath}`);
  }

  // small retry loop
  const maxAttempts = 3;
  let attempt = 0;
  while (true) {
    try {
      attempt += 1;
      await runCmd(`yarn install`, {
        cwd: reactVersionRootPath,
      });
      break;
    } catch (err) {
      if (attempt >= maxAttempts) {
        throw err;
      }
      // brief backoff
      // eslint-disable-next-line no-promise-executor-return
      await new Promise(r => setTimeout(r, 1500 * attempt));
    }
  }
}

type EnsureDepsMode =
  | { kind: 'reuse-run' }
  | { kind: 'prepare-only-no-install' }
  | { kind: 'run-install'; scaffoldRoot: string };

async function ensureDependencies(params: {
  reactRootPath: string;
  react: ReactVersion;
  logger: Logger;
  mode: EnsureDepsMode;
}): Promise<void> {
  const nodeModulesDir = join(params.reactRootPath, 'node_modules');
  const nodeModulesPackageJson = join(params.reactRootPath, 'package.json');
  if (existsSync(nodeModulesDir) && existsSync(nodeModulesPackageJson)) {
    // already installed
    return;
  }

  switch (params.mode.kind) {
    case 'reuse-run':
    case 'prepare-only-no-install': {
      const isReuse = params.mode.kind === 'reuse-run';
      const abortContext = isReuse ? 'run on existing project' : 'prepare-only';
      const usageContext = isReuse ? '--run with --project-id.' : '--prepare-only --no-install.';
      params.logger.warn('🔴 Missing dependencies for React', params.react, 'at:', nodeModulesDir);
      throw new Error(
        `Aborting ${abortContext}: Run 'rit --install-deps --react ${params.react}' before using ${usageContext}`,
      );
    }

    case 'run-install': {
      params.logger.verbose(`Installing dependencies for React ${params.react}...`);
      await installDependenciesAtReactRoot(params.reactRootPath);
      return;
    }
  }
}

export async function setup(
  options: Required<Args>,
  logger: Logger,
): Promise<{
  projectPath: string;
  commands: Record<string, string>;
  cleanup: () => void;
}> {
  const { react } = options;
  const { workspaceRoot, scaffoldRoot, reactRootPath } = computeRoots(options.cwd, react);

  // If user wants to reuse an existing prepared project, short-circuit.
  if (options.run.length && options.projectId) {
    await ensureDependencies({
      reactRootPath,
      react,
      logger,
      mode: { kind: 'reuse-run' },
    });
    const projectPath = getPreparedProjectPath({
      react: options.react,
      projectId: options.projectId,
      cwd: options.cwd,
      scaffoldRoot,
    });
    const commands = readCommandsFromPreparedProject(projectPath);
    return {
      projectPath,
      commands,
      cleanup: () => {
        // no-op: user opted to reuse an existing prepared project; nothing to remove here
        return;
      },
    };
  }

  // Guard: user asked to only prepare (scaffold) but also skip installation; we forbid this
  // when dependencies are not already installed for the shared React root. This avoids creating
  // orphan scaffold projects that cannot run later.
  if (options.prepareOnly && options.noInstall) {
    await ensureDependencies({ reactRootPath, react, logger, mode: { kind: 'prepare-only-no-install' } });
  }

  // Merge builtin defaults with optional user config, detect origin setups and ensure react root exists
  const { projectName, projectRoot } = getProjectInfo(options.cwd);
  const templatePrepared = getMergedTemplate(react, options.configPath);

  // install mode ( always creates package.json and installs node_modules -> this is purely for local usage, wont work on CI)
  if (!options.noInstall) {
    // one shot mode - scaffold -> install -> run
    if (options.run.length && !options.projectId) {
      upsertReactRootPackageJson({
        reactRootPath,
        react,
        dependencies: templatePrepared.dependencies,
        logger,
      });
    } else if (options.prepareOnly) {
      upsertReactRootPackageJson({
        reactRootPath,
        react,
        dependencies: templatePrepared.dependencies,
        logger,
      });
    }
    await ensureDependencies({ reactRootPath, react, logger, mode: { kind: 'run-install', scaffoldRoot } });
  }

  //
  // Prepare Testing Project under the react <version> root
  //
  const { projectPath, projectName: createdProjectName } = createProject({
    projectName,
    react,
    projectId: options.projectId,
    force: options.force,
    scaffoldRoot,
  });

  const metadata = {
    projectName,
    projectRoot,
    projectPath,
    react,
    configPath: options.configPath,
    tmpl: {
      relativePathToProjectRoot: relative(projectPath, projectRoot),
      relativePathToWorkspaceRoot: relative(projectPath, workspaceRoot),
      // path from project to its react root (where shared node_modules live)
      usedNodeModulesDirRelative: relative(projectPath, reactRootPath),
      projectName: createdProjectName,
      react,
      tsconfig: prepareTsConfigTemplate({
        projectRoot,
        projectPath,
        workspaceRoot,
        projectTsConfigPath: templatePrepared.configs['type-check'],
      }),
      jest: {
        pathToProjectConfig: templatePrepared.configs['test'],
      },
      cypress: {
        pathToProjectConfig: templatePrepared.configs['e2e'],
      },
    },
  };

  logger.verbose('setup metadata:', serializeJson(metadata));

  const useCommands: Record<string, string> = {};

  // 1) Create tsconfig.json from template with EJS
  if (existsSync(join(projectRoot, templatePrepared.configs['type-check']))) {
    useCommands['type-check'] = templatePrepared.commands['type-check'];
    renderTemplateToFile(
      join(__dirname, 'files', 'tsconfig.json.template'),
      metadata.tmpl,
      join(projectPath, 'tsconfig.json'),
    );
  }

  // 2) Create jest.config.js from template with EJS (only if origin project has Jest setup)
  if (existsSync(join(projectRoot, templatePrepared.configs['test']))) {
    useCommands['test'] = templatePrepared.commands['test'];
    renderTemplateToFile(
      join(__dirname, 'files', 'jest.config.js.template'),
      metadata.tmpl,
      join(projectPath, 'jest.config.js'),
    );
    renderTemplateToFile(
      join(__dirname, 'files', 'jest.mock-snapshots.js.template'),
      metadata.tmpl,
      join(projectPath, 'jest.mock-snapshots.js'),
    );
    renderTemplateToFile(join(__dirname, 'files', '.swcrc.template'), metadata.tmpl, join(projectPath, '.swcrc'));
  }

  // 3) Create cypress.config.ts and tsconfig.cy.json from template with EJS (only if origin project has Cypress setup)
  if (existsSync(join(projectRoot, templatePrepared.configs['e2e']))) {
    useCommands['e2e'] = templatePrepared.commands['e2e'];
    renderTemplateToFile(
      join(__dirname, 'files', 'cypress.config.ts.template'),
      metadata.tmpl,
      join(projectPath, 'cypress.config.ts'),
    );
    renderTemplateToFile(
      join(__dirname, 'files', 'tsconfig.cy.json.template'),
      metadata.tmpl,
      join(projectPath, 'tsconfig.cy.json'),
    );
  }

  // 4) Create package.json for test project including npm scripts
  createProjectPackageJson({
    projectPath,
    projectName: metadata.projectName,
    usedNodeModulesDirRelative: metadata.tmpl.usedNodeModulesDirRelative,
    commands: useCommands,
  });

  return {
    projectPath,
    commands: templatePrepared.commands,
    cleanup: () => {
      removeTmpProject(scaffoldRoot, react, createdProjectName);
    },
  };
}

/**
 * Install dependencies for a React version root.
 */
export async function installDepsForReactVersion(
  args: Required<Pick<Args, 'react' | 'configPath' | 'verbose' | 'cwd'>>,
  logger: Logger,
): Promise<void> {
  const { dependencies } = getMergedTemplate(args.react, args.configPath);
  const { scaffoldRoot, reactRootPath } = computeRoots(args.cwd, args.react);
  upsertReactRootPackageJson({
    reactRootPath,
    react: args.react,
    dependencies,
    logger,
  });

  logger.verbose(`Installing dependencies under: ${reactRootPath}`);

  await installDependenciesAtReactRoot(reactRootPath);

  logger.log(`Dependencies installed under shared react root -> ${reactRootPath}.`);
}
