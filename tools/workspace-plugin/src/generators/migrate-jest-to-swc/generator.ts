import { formatFiles, getProjects, joinPathFragments, ProjectConfiguration, stripIndents, Tree } from '@nx/devkit';
import { tsquery } from '@phenomnomnominal/tsquery';

import type { MigrateJestToSwcGeneratorSchema } from './schema';

export async function migrateJestToSwcGenerator(tree: Tree, _options: MigrateJestToSwcGeneratorSchema) {
  const projects = getProjects(tree);
  const v9LibProjects: ProjectConfiguration[] = [];
  projects.forEach(project => {
    if (project.projectType === 'library' && project.tags?.includes('vNext')) {
      v9LibProjects.push(project);
    }
  });

  v9LibProjects.forEach(project => {
    migrateProject(tree, project);
  });

  await formatFiles(tree);
}

function migrateProject(tree: Tree, project: ProjectConfiguration) {
  const jestConfigPath = joinPathFragments(project.root, 'jest.config.js');
  const swcRcConfigPath = joinPathFragments(project.root, '.swcrc');

  if (!tree.exists(swcRcConfigPath)) {
    console.error(`.swcrc file not found in ${project.root}`);
    return;
  }

  if (!tree.exists(jestConfigPath)) {
    console.error(`jest.config.js file not found in ${project.root}`);
    return;
  }

  const jestConfig = tree.read(jestConfigPath, 'utf-8')?.replace('// @ts-check', '')!;

  // Parse the file content into an AST
  const ast = tsquery.ast(jestConfig);
  const astSelector = 'PropertyAssignment:has(Identifier[name="transform"])';

  // Query the AST to find the transform property
  const transformProperty = tsquery.query(ast, astSelector);

  if (transformProperty.length === 0) {
    console.error('something went wrong with the codemod');
    return;
  }

  // Modify the transform property
  const newTransformProperty = `
    transform: {
      '^.+\\\\.tsx?$': ['@swc/jest', swcJestConfig],
    },
  `;

  const updatedCode = tsquery.replace(jestConfig, astSelector, () => newTransformProperty);

  const newJestConfig = swcConfigTemplate + '\n\n' + updatedCode;

  // Write the modified content back to the file
  tree.write(jestConfigPath, newJestConfig);
}

const swcConfigTemplate = stripIndents`
// @ts-check
/* eslint-disable */

const { readFileSync } = require('node:fs');
const { join } = require('node:path');

// Reading the SWC compilation config and remove the "exclude"
// for the test files to be compiled by SWC
const { exclude: _, ...swcJestConfig } = JSON.parse(
  readFileSync(join(__dirname,'.swcrc'), 'utf-8')
);

// disable .swcrc look-up by SWC core because we're passing in swcJestConfig ourselves.
// If we do not disable this, SWC Core will read .swcrc and won't transform our test files due to "exclude"
if (swcJestConfig.swcrc === undefined) {
  swcJestConfig.swcrc = false;
}

// Uncomment if using global setup/teardown files being transformed via swc
// https://nx.dev/packages/jest/documents/overview#global-setup/teardown-with-nx-libraries
// jest needs EsModule Interop to find the default exported setup/teardown functions
// swcJestConfig.module.noInterop = false;
`;

export default migrateJestToSwcGenerator;
