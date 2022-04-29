import {
  Tree,
  formatFiles,
  joinPathFragments,
  updateJson,
  ProjectConfiguration,
  readJson,
  writeJson,
  logger,
} from '@nrwl/devkit';
import { moveGenerator } from '@nrwl/workspace/generators';
import { getProjectConfig, getProjects, hasSchemaFlag, isPackageConverged, isV8Package } from '../../utils';

import { MovePackagesGeneratorSchema } from './schema';

interface AssertedSchema extends MovePackagesGeneratorSchema {
  name: string;
}

export default async function (tree: Tree, schema: MovePackagesGeneratorSchema) {
  validateSchema(schema);

  if (hasSchemaFlag(schema, 'allConverged')) {
    runBatchMove(tree, schema, isPackageConverged);
  } else if (hasSchemaFlag(schema, 'allV8')) {
    runBatchMove(tree, schema, isV8Package);
  } else {
    hasSchemaFlag(schema, 'name') && movePackage(tree, schema);
  }

  await formatFiles(tree);
}

function runBatchMove(
  tree: Tree,
  schema: MovePackagesGeneratorSchema,
  libraryVersionChecker: (tree: Tree, project: ProjectConfiguration) => boolean,
) {
  const projects = getProjects(tree);
  for (const [projectName, projectConfig] of projects) {
    if (libraryVersionChecker(tree, projectConfig)) {
      const destination = `${schema.destination}/${projectName.split('/')[1]}`;
      logger.log(`Attempting to move ${projectName} to ${destination}`);

      movePackage(tree, {
        name: projectName,
        destination: destination,
        updateImportPath: schema.updateImportPath,
      });
    }
  }
}

function movePackage(tree: Tree, schema: AssertedSchema) {
  const { name, destination, updateImportPath = false } = schema;

  moveGenerator(tree, {
    projectName: name,
    destination: destination,
    importPath: name,
    updateImportPath: updateImportPath,
  });

  // moveGenerator automatically renames the package so this overwrites that change
  // and sets it back to the original package name.
  updateJson(tree, 'workspace.json', json => {
    const newProjectName = getNewProjectName(schema.destination);
    for (const [projectName, value] of Object.entries(json.projects)) {
      if (projectName === newProjectName) {
        json.projects[schema.name as string] = value;
        delete json.projects[newProjectName];
      }
    }
    return json;
  });

  // moveGenerator automatically updates the Readme file of the packages to replace
  // the package name with a new name based on the "destination" flag. This check
  // reverts the changes it makes.
  updateReadMe(tree, schema);
  updateApiExtractor(tree, schema);
  updateStorybookTypeImport(tree, schema);
  updateBuildLocalScript(tree, schema);
  updateCodeOwners(tree, schema);
}

function validateSchema(schema: MovePackagesGeneratorSchema) {
  const { name, allConverged, allV8 } = schema;

  if (name && allConverged) {
    throw new Error('--name and --allConverged are mutually exclusive');
  }

  if (name && allV8) {
    throw new Error('--name and --allV8 are mutually exclusive');
  }

  if (allConverged && allV8) {
    throw new Error('--allConverged and --allV8 are mutually exclusive');
  }

  if (!name && !allConverged && !allV8) {
    throw new Error(`must provide a specified --name or provide --allConverged or provide --allV8`);
  }
}

function getNewProjectName(destinationPath: string) {
  return destinationPath.replace(/\//g, '-');
}

/**
 * The moveGenerator automatically renames the package and updates the README.md file to reflect that change.
 * This function restores the contents of the README.md file back to original state.
 */
function updateReadMe(tree: Tree, schema: AssertedSchema) {
  const project = getProjects(tree).get(schema.name) as ProjectConfiguration;
  const readMePath = joinPathFragments(project.root, 'README.md');

  if (!tree.exists(readMePath)) {
    return;
  }

  const newName = new RegExp(`${getNewProjectName(schema.destination)}`, 'g');
  const readMeFile = tree.read(readMePath, 'utf8') as string;
  const updatedReadMeFile = readMeFile.replace(newName, schema.name);
  tree.write(readMePath, updatedReadMeFile);
}

/**
 * manually update each packages' storybook main.js module.exports type to the new
 * storybook relative path.
 */
function updateStorybookTypeImport(tree: Tree, schema: AssertedSchema) {
  const project = getProjects(tree).get(schema.name) as ProjectConfiguration;
  const storybookMainJsPath = joinPathFragments(project.root, '/.storybook/main.js');

  if (!tree.exists(storybookMainJsPath)) {
    return;
  }

  const storybookMainJsFile = tree.read(storybookMainJsPath, 'utf8') as string;
  const [newStorybookPath, oldStorybookPath] = storybookMainJsFile.match(/\([^)]*\)/g) as RegExpMatchArray;
  const updatedStorybookMainJsFile = storybookMainJsFile.replace(oldStorybookPath, newStorybookPath);
  tree.write(storybookMainJsPath, updatedStorybookMainJsFile);
}

function updateCodeOwners(tree: Tree, schema: AssertedSchema) {
  const projectConfig = getProjectConfig(tree, { packageName: schema.name });
  const codeownersPath = joinPathFragments('/.github', 'CODEOWNERS');

  if (!tree.exists(codeownersPath)) {
    return;
  }

  const codeOwnersFile = tree.read(codeownersPath, 'utf8') as string;
  const updatedCodeOwnersFile = codeOwnersFile.replace(projectConfig.normalizedPkgName, schema.destination);
  tree.write(codeownersPath, updatedCodeOwnersFile);
}

function updateApiExtractor(tree: Tree, schema: AssertedSchema) {
  const projectConfig = getProjectConfig(tree, { packageName: schema.name });
  const apiExtractorLocalPath = joinPathFragments(projectConfig.paths.configRoot, 'api-extractor.local.json');
  const apiExtractorLocal = readJson(tree, apiExtractorLocalPath);
  const originalEntryPointPath = apiExtractorLocal.mainEntryPointFilePath;
  const normalizeFolderDestination = schema.destination.split('/').slice(0, -1).join('/');
  const updatedEntryPointPath = originalEntryPointPath.replace(
    'packages/<unscopedPackageName>',
    `packages/${normalizeFolderDestination}/<unscopedPackageName>`,
  );
  apiExtractorLocal.mainEntryPointFilePath = updatedEntryPointPath;

  writeJson(tree, apiExtractorLocalPath, apiExtractorLocal);
}

function updateBuildLocalScript(tree: Tree, schema: AssertedSchema) {
  const projectConfig = getProjectConfig(tree, { packageName: schema.name });
  updateJson(tree, projectConfig.paths.packageJson, json => {
    json.scripts = json.scripts ?? {};
    const originalScript = json.scripts['build:local'];
    const updatedScript = originalScript.replace(projectConfig.normalizedPkgName, schema.destination);
    json.scripts['build:local'] = updatedScript;
    return json;
  });
}
