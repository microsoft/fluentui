import { Tree, formatFiles, joinPathFragments, updateJson, readJson, ProjectConfiguration } from '@nrwl/devkit';
import { moveGenerator } from '@nrwl/workspace/generators';
import { PackageJson } from '../../types';
import { getProjects } from '../../utils';

import { MovePackagesGeneratorSchema } from './schema';

export default async function (tree: Tree, schema: MovePackagesGeneratorSchema) {
  validateSchema(schema);

  if (hasSchemaFlag(schema, 'allConverged')) {
    runBatchMove(tree, schema, isPackageConverged);
  } else if (hasSchemaFlag(schema, 'allV8')) {
    runBatchMove(tree, schema, isV8Package);
  } else {
    movePackage(tree, schema);
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
      console.log(`Attempting to move ${projectName} to ${destination}`);

      movePackage(tree, {
        name: projectName,
        destination: destination,
        updateImportPath: schema.updateImportPath,
      });
    }
  }
}

function movePackage(tree: Tree, schema: MovePackagesGeneratorSchema) {
  const { name, destination, updateImportPath = false } = schema;

  if (!name) {
    return;
  }

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
  updateStorybookTypeImport(tree, schema);
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

function hasSchemaFlag<T extends MovePackagesGeneratorSchema, K extends keyof T>(
  schema: T,
  flag: K,
): schema is T & Record<K, NonNullable<T[K]>> {
  return Boolean(schema[flag]);
}

function isPackageConverged(tree: Tree, project: ProjectConfiguration) {
  const packageJson = readJson<PackageJson>(tree, joinPathFragments(project.root, 'package.json'));
  return packageJson.version.startsWith('9.');
}

function isV8Package(tree: Tree, project: ProjectConfiguration) {
  const packageJson = readJson<PackageJson>(tree, joinPathFragments(project.root, 'package.json'));
  return packageJson.version.startsWith('8.');
}

function updateReadMe(tree: Tree, schema: MovePackagesGeneratorSchema) {
  const { name, destination } = schema;
  if (name) {
    const project = getProjects(tree).get(name) as ProjectConfiguration;
    const readMePath = joinPathFragments(project.root, 'README.md');

    if (!tree.exists(readMePath)) {
      return;
    }

    const newName = new RegExp(`${getNewProjectName(destination)}`, 'g');
    const readMeFile = tree.read(readMePath, 'utf8') as string;
    const updatedReadMeFile = readMeFile.replace(newName, name);
    tree.write(readMePath, updatedReadMeFile);
  }
}

/**
 * manually update each packages' storybook main.js module.exports type to the new
 * storybook relative path.
 */
function updateStorybookTypeImport(tree: Tree, schema: MovePackagesGeneratorSchema) {
  const { name, destination } = schema;
  if (name) {
    const project = getProjects(tree).get(name) as ProjectConfiguration;
    const storybookMainJsPath = joinPathFragments(project.root, '/.storybook/main.js');

    if (!tree.exists(storybookMainJsPath)) {
      return;
    }

    const storybookMainJsFile = tree.read(storybookMainJsPath, 'utf8') as string;
    const [newStorybookPath, oldStorybookPath] = storybookMainJsFile.match(/\([^)]*\)/g) as RegExpMatchArray;
    const updatedStorybookMainJsFile = storybookMainJsFile.replace(oldStorybookPath, newStorybookPath);
    tree.write(storybookMainJsPath, updatedStorybookMainJsFile);
  }
}
