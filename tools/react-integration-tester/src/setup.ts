import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

import { tmpFolder, uniq } from '@nx/plugin/testing';
import { workspaceRoot } from '@nx/devkit';
import { type PackageJson } from 'nx/src/utils/package-json';

import * as ejs from 'ejs';
import { Args, ReactVersion, runCmd } from './shared';

function createProject(options: { projectName: string; react: ReactVersion }) {
  const projectName = uniq(`${options.projectName}-react-${options.react}`);
  const { projectPath } = ensureProject(projectName);
  return { projectPath, projectName };
}
function removeTmpProject(project: string) {
  const projectPath = join(tmpFolder(), 'rit', project);
  rmSync(projectPath, { recursive: true, force: true });
}

function ensureProject(project: string) {
  const projectPath = join(tmpFolder(), 'rit', project);
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

function renderTemplateToFile(templateFilePath: string, data: Record<string, unknown>, outFilePath: string) {
  const content = readFileSync(templateFilePath, 'utf-8');
  const rendered = ejs.render(content, data, { filename: templateFilePath });
  writeFileSync(outFilePath, rendered);
}

export async function setup(options: Required<Args>) {
  const { react, templatePath } = options;
  // Placeholder: prepare project workspace; actual scaffolding to follow.
  const { projectName, projectRoot } = resolveProjectName();
  const { projectPath, projectName: createdProjectName } = createProject({ projectName, react });

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
  await runCmd('yarn install', { cwd: projectPath });

  return {
    projectPath,
    commands: templateJson.commands,
    cleanup: () => {
      removeTmpProject(createdProjectName);
    },
  };
}
