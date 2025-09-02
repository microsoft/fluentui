import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

import { tmpFolder, uniq } from '@nx/plugin/testing';
import { workspaceRoot } from '@nx/devkit';
import { type PackageJson } from 'nx/src/utils/package-json';

import * as ejs from 'ejs';
import { Args, ReactVersion, runCmd, readCommandsFromPreparedProject, getPreparedTemplate } from './shared';

const scaffoldRoot = join(tmpFolder(), 'rit');

function reactRoot(react: ReactVersion) {
  return join(scaffoldRoot, `react-${react}`);
}

function createProject(options: { projectName: string; react: ReactVersion; projectId?: string; force?: boolean }): {
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
    removeTmpProject(options.react, finalName);
  }
  const { projectPath } = ensureProject(options.react, finalName);
  return { projectPath, projectName: finalName };
}
function removeTmpProject(react: ReactVersion, project: string) {
  // Remove only the project folder under its react root; do not delete shared node_modules
  const projectPathGlob = join(reactRoot(react), project);
  // Best-effort remove if exists in any react root
  rmSync(projectPathGlob, { recursive: true, force: true });
}
function ensureProject(react: ReactVersion, project: string) {
  const projectPath = join(reactRoot(react), project);
  mkdirSync(projectPath, { recursive: true });
  return { projectPath };
}

function getProjectInfo(): {
  /**
   * The normalized name (without npm scope) of the project which will be tested against react integration.
   */
  projectName: string;
  /**
   * The absolute path to the project directory which will be tested against react integration.
   */
  projectRoot: string;
  projectPaths: {
    packageJson: string;
    tsConfig: string;
    jestConfig: string | null;
    cypressConfig: string | null;
  };
} {
  const projectRoot = process.cwd();
  const jestConfig = existsSync(join(projectRoot, 'jest.config.ts'))
    ? join(projectRoot, 'jest.config.ts')
    : existsSync(join(projectRoot, 'jest.config.js'))
    ? join(projectRoot, 'jest.config.js')
    : null;
  const cypressConfig = existsSync(join(projectRoot, 'cypress.config.ts'))
    ? join(projectRoot, 'cypress.config.ts')
    : existsSync(join(projectRoot, 'cypress.config.js'))
    ? join(projectRoot, 'cypress.config.js')
    : null;
  const projectPaths = {
    packageJson: join(projectRoot, 'package.json'),
    jestConfig: jestConfig,
    cypressConfig: cypressConfig,
    tsConfig: join(projectRoot, 'tsconfig.lib.json'),
  };
  if (!existsSync(projectPaths.packageJson)) {
    throw new Error(`Could not find package.json at: ${projectPaths.packageJson}`);
  }
  if (!existsSync(projectPaths.tsConfig)) {
    throw new Error(`Could not find tsconfig.lib.json at: ${projectPaths.tsConfig}`);
  }

  const packageJson = JSON.parse(readFileSync(projectPaths.packageJson, 'utf-8'));

  return {
    projectName: packageJson.name.replace(/^@[a-z-]+\//gi, ''),
    projectRoot,
    projectPaths,
  };
}

export function getPreparedProjectPath(args: { react: ReactVersion; projectId: string }) {
  const { projectName } = getProjectInfo();
  const finalName = `${projectName}-react-${args.react}-${args.projectId}`;
  return join(reactRoot(args.react), finalName);
}

function renderTemplateToFile(templateFilePath: string, data: Record<string, unknown>, outFilePath: string) {
  const content = readFileSync(templateFilePath, 'utf-8');
  const rendered = ejs.render(content, data, { filename: templateFilePath });
  writeFileSync(outFilePath, rendered);
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

function prepareTsConfigTemplate(options: { projectRoot: string; projectPath: string; projectTsConfigPath: string }) {
  const relativePathToProjectTsConfig = relative(options.projectPath, options.projectTsConfigPath);

  type TsConfig = { include?: string[]; compilerOptions?: Partial<{ target: string; lib: string[] }> };
  const tsConfig: TsConfig = JSON.parse(readFileSync(options.projectTsConfigPath, 'utf-8'));
  if (!tsConfig.include) {
    throw new Error(`No include paths found at: ${options.projectTsConfigPath}`);
  }
  const relativeIncludePaths = tsConfig.include?.map(includePath => {
    return relative(options.projectPath, join(options.projectRoot, includePath));
  });
  const target = tsConfig.compilerOptions?.target ?? ['ES2019'];
  const lib = tsConfig.compilerOptions?.lib ?? ['ES2019', 'DOM'];

  return {
    relativePathToProjectTsConfig,
    relativeIncludePaths,
    target,
    lib,
  };
}

async function installDependenciesAtReactRoot(rootPath: string) {
  // Use a scoped global yarn cache and a global mutex to avoid concurrent cache corruption on CI
  const yarnCacheFolder = join(scaffoldRoot, '.yarn-cache');

  mkdirSync(yarnCacheFolder, { recursive: true });
  // small retry loop
  const maxAttempts = 3;
  let attempt = 0;
  while (true) {
    try {
      attempt += 1;
      await runCmd(`yarn install --mutex network --network-timeout 60000 --cache-folder ${yarnCacheFolder}`, {
        cwd: rootPath,
      });
      break;
    } catch (err) {
      if (attempt >= maxAttempts) {
        throw err;
      }
      // brief backoff
      await new Promise(r => setTimeout(r, 1500 * attempt));
    }
  }
}

export async function setup(options: Required<Args>) {
  const { react } = options;
  // If user wants to reuse an existing prepared project, short-circuit.
  if (options.run.length && options.projectId) {
    const projectPath = getPreparedProjectPath({ react: options.react, projectId: options.projectId });
    const commands = readCommandsFromPreparedProject(projectPath);
    return {
      projectPath,
      commands,
      cleanup: () => {
        // no-op: user opted to reuse an existing prepared project; nothing to remove here
        return;
      },
    } as const;
  }

  // Merge builtin defaults with optional user config, detect origin setups and ensure react root exists
  const { projectName, projectRoot, projectPaths } = getProjectInfo();
  const templatePrepared = getPreparedTemplate(react, options.configPath, projectPaths);
  const reactRootPath = reactRoot(react);
  mkdirSync(reactRootPath, { recursive: true });

  // Create or update package.json at the react root with the dependencies once.
  const reactRootPkgPath = join(reactRootPath, 'package.json');
  const reactRootPkg: PackageJson = existsSync(reactRootPkgPath)
    ? (JSON.parse(readFileSync(reactRootPkgPath, 'utf-8')) as PackageJson)
    : ({ name: `@rit/react-${react}-root`, private: true, version: '0.0.0', license: 'UNLICENSED' } as PackageJson);
  reactRootPkg.dependencies = {
    ...(reactRootPkg.dependencies ?? {}),
    ...templatePrepared.dependencies,
  };
  writeFileSync(reactRootPkgPath, JSON.stringify(reactRootPkg, null, 2));

  // If only installing deps was requested, perform install and return
  if (options.installDeps) {
    await installDependenciesAtReactRoot(reactRootPath);
    return {
      projectPath: reactRootPath,
      commands: templatePrepared.commands,
      cleanup: () => {
        // no-op: install-deps mode doesn't create a per-project folder
        return;
      },
    } as const;
  }

  // Prepare project workspace under the react root
  const { projectPath, projectName: createdProjectName } = createProject({
    projectName,
    react,
    projectId: options.projectId,
    force: options.force,
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
      tsconfig: prepareTsConfigTemplate({ projectRoot, projectPath, projectTsConfigPath: projectPaths.tsConfig }),
      // path from project to its react root (where shared node_modules live)
      usedNodeModulesDirRelative: relative(projectPath, reactRootPath),
      projectName: createdProjectName,
      react,
    },
  };

  // Emit minimal info for now; config + builtin will be used to scaffold.
  // Keeping stdout simple helps scripting.
  if (options.verbose) {
    console.log(JSON.stringify(metadata, null, 2));
  }

  // Prepare TypeScript/Jest/Cypress config files inside the project

  // 1) Create tsconfig.json from template with EJS
  renderTemplateToFile(
    join(__dirname, 'files', 'tsconfig.json.template'),
    metadata.tmpl,
    join(projectPath, 'tsconfig.json'),
  );

  // 3) Create jest.config.js from template with EJS (only if origin project has Jest setup)
  if (templatePrepared.hasJestSetup) {
    renderTemplateToFile(
      join(__dirname, 'files', 'jest.config.js.template'),
      metadata.tmpl,
      join(projectPath, 'jest.config.js'),
    );
    renderTemplateToFile(join(__dirname, 'files', '.swcrc.template'), metadata.tmpl, join(projectPath, '.swcrc'));
  }

  // 4) Create cypress.config.ts and tsconfig.cy.json from template with EJS (only if origin project has Cypress setup)
  if (templatePrepared.hasCypressSetup) {
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

  createProjectPackageJson({
    projectPath,
    projectName: metadata.projectName,
    usedNodeModulesDirRelative: metadata.tmpl.usedNodeModulesDirRelative,
    commands: templatePrepared.commands,
  });

  // Install deps, but only for specific flows:
  // - On --prepare-only (default): install unless --no-install is used
  // - On --install-deps: install and exit (handled in CLI by early return)
  if (options.prepareOnly && !options.noInstall) {
    await installDependenciesAtReactRoot(reactRootPath);
  }
  // For normal runs, ensure deps are installed at least once (unless disabled)
  if (!options.prepareOnly && !options.noInstall) {
    const nodeModulesDir = join(reactRootPath, 'node_modules');
    if (!existsSync(nodeModulesDir)) {
      await installDependenciesAtReactRoot(reactRootPath);
    }
  }

  return {
    projectPath,
    commands: templatePrepared.commands,
    cleanup: () => {
      removeTmpProject(react, createdProjectName);
    },
  };
}

/**
 * Install dependencies under the shared react root based on the provided template JSON.
 * This does not scaffold a project; it only ensures the react root package.json contains required deps and runs install.
 */
export async function installDepsForReactRoot(
  react: ReactVersion,
  dependencies: Record<string, string>,
  verbose = false,
) {
  const reactRootPath = reactRoot(react);
  mkdirSync(reactRootPath, { recursive: true });

  const reactRootPkgPath = join(reactRootPath, 'package.json');
  const reactRootPkg: PackageJson = existsSync(reactRootPkgPath)
    ? (JSON.parse(readFileSync(reactRootPkgPath, 'utf-8')) as PackageJson)
    : ({ name: `@rit/react-${react}-root`, private: true, version: '0.0.0', license: 'UNLICENSED' } as PackageJson);
  reactRootPkg.dependencies = {
    ...(reactRootPkg.dependencies ?? {}),
    ...dependencies,
  };
  writeFileSync(reactRootPkgPath, JSON.stringify(reactRootPkg, null, 2));

  if (verbose) {
    console.log(`[rit / v${react}] Installing dependencies under: ${reactRootPath}`);
  }
  await installDependenciesAtReactRoot(reactRootPath);
  return { reactRootPath } as const;
}
