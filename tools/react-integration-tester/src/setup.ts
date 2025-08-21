import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

import { tmpFolder, uniq } from '@nx/plugin/testing';
import { workspaceRoot } from '@nx/devkit';
import { type PackageJson } from 'nx/src/utils/package-json';

import * as ejs from 'ejs';
import { Args, ReactVersion, runCmd, readCommandsFromPreparedProject } from './shared';

const scaffoldRoot = join(tmpFolder(), 'rit');

function createProject(options: { projectName: string; react: ReactVersion; projectId?: string; force?: boolean }) {
  // If projectId provided, use deterministic name, otherwise use uniq()
  const base = `${options.projectName}-react-${options.react}`;
  const finalName = options.projectId ? `${base}-${options.projectId}` : uniq(base);
  if (options.force) {
    removeTmpProject(finalName);
  }
  const { projectPath } = ensureProject(finalName);
  return { projectPath, projectName: finalName };
}
function removeTmpProject(project: string) {
  const projectPath = join(scaffoldRoot, project);
  rmSync(projectPath, { recursive: true, force: true });
}

function ensureProject(project: string) {
  const projectPath = join(scaffoldRoot, project);
  mkdirSync(projectPath, { recursive: true });

  return { projectPath };
}

function resolveProjectName() {
  const projectRoot = process.cwd();
  const packageJsonPath = join(projectRoot, 'package.json');
  if (!existsSync(packageJsonPath)) {
    throw new Error(`Could not find package.json at: ${packageJsonPath}`);
  }

  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

  return {
    projectName: packageJson.name.replace(/^@[a-z-]+\//gi, ''),
    projectRoot,
  };
}

export function getPreparedProjectPath(args: { react: ReactVersion; projectId: string }) {
  const { projectName } = resolveProjectName();
  const finalName = `${projectName}-react-${args.react}-${args.projectId}`;
  return join(tmpFolder(), 'rit', finalName);
}

function renderTemplateToFile(templateFilePath: string, data: Record<string, unknown>, outFilePath: string) {
  const content = readFileSync(templateFilePath, 'utf-8');
  const rendered = ejs.render(content, data, { filename: templateFilePath });
  writeFileSync(outFilePath, rendered);
}

async function installDependencies(projectPath: string) {
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
        cwd: projectPath,
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
  const { react, templatePath } = options;
  // If user wants to reuse an existing prepared project, short-circuit.
  if (options.useExistingProjectId) {
    const projectPath = getPreparedProjectPath({ react: options.react, projectId: options.useExistingProjectId });
    const commands = readCommandsFromPreparedProject(projectPath);
    return {
      projectPath,
      commands,
      cleanup: () => {},
    } as const;
  }

  // Placeholder: prepare project workspace; actual scaffolding to follow.
  const { projectName, projectRoot } = resolveProjectName();
  const { projectPath, projectName: createdProjectName } = createProject({
    projectName,
    react,
    projectId: options.projectId,
    force: options.force,
  });

  const metadata = {
    projectName,
    projectRoot,
    react,
    templatePath,
    projectPath,
    tmpl: {
      relativePathToProjectRoot: relative(projectPath, projectRoot.replace('/library', '')),
      relativePathToWorkspaceRoot: relative(projectPath, workspaceRoot),
      projectName: createdProjectName,
    },
  };

  // Emit minimal info for now; further steps will use templatePath to scaffold.
  // Keeping stdout simple helps scripting.
  if (options.verbose) {
    console.log(JSON.stringify(metadata, null, 2));
  }

  // 1) Create package.json based on template.dependencies
  const templateJson = JSON.parse(readFileSync(templatePath, 'utf-8')) as {
    commands: Record<string, string>;
    dependencies: Record<string, string>;
  };

  const packageJson: PackageJson = {
    name: metadata.projectName,
    private: true,
    version: '0.0.0',
    license: 'UNLICENSED',
    scripts: templateJson.commands,
    dependencies: templateJson.dependencies,
  } as const;
  writeFileSync(join(projectPath, 'package.json'), JSON.stringify(packageJson, null, 2));

  // 2) Create tsconfig.json from template with EJS
  renderTemplateToFile(
    join(__dirname, 'files', 'tsconfig.json.template'),
    metadata.tmpl,
    join(projectPath, 'tsconfig.json'),
  );

  // 3) Create jest.config.js from template with EJS
  renderTemplateToFile(
    join(__dirname, 'files', 'jest.config.js.template'),
    { ...metadata.tmpl, projectName: metadata.projectName, react: metadata.react },
    join(projectPath, 'jest.config.js'),
  );
  renderTemplateToFile(
    join(__dirname, 'files', '.swcrc.template'),
    { ...metadata.tmpl, projectName: metadata.projectName },
    join(projectPath, '.swcrc'),
  );

  // Ensure referenced setup file exists to avoid Jest error
  const jestSetupDir = join(projectPath, 'config');
  mkdirSync(jestSetupDir, { recursive: true });
  writeFileSync(
    join(jestSetupDir, 'tests.js'),
    `
    // Test setup placeholder

    require('@testing-library/jest-dom');
    `,
  );

  // 4) Create cypress.config.ts from template with EJS
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

  // Install deps
  await installDependencies(projectPath);

  return {
    projectPath,
    commands: templateJson.commands,
    cleanup: () => {
      removeTmpProject(createdProjectName);
    },
  };
}
