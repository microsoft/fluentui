import { Tree, formatFiles, joinPathFragments, updateJson, readJson, ProjectConfiguration } from '@nrwl/devkit';
import { moveGenerator } from '@nrwl/workspace/generators';
import { PackageJson } from '../../types';
import { getProjects } from '../../utils';

import { MigratePackagesGeneratorSchema } from './schema';

export default async function (tree: Tree, schema: MigratePackagesGeneratorSchema) {
  validateSchema(schema);

  if (hasSchemaFlag(schema, 'allConverged')) {
    runBatchMigration(tree, schema, isPackageConverged);
  } else if (hasSchemaFlag(schema, 'allV8')) {
    runBatchMigration(tree, schema, isV8Package);
  } else {
    migratePackage(tree, schema);
  }

  await formatFiles(tree);
}

function runBatchMigration(
  tree: Tree,
  schema: MigratePackagesGeneratorSchema,
  libraryVersionChecker: (tree: Tree, project: ProjectConfiguration) => boolean,
) {
  const projects = getProjects(tree);
  for (const [projectName, projectConfig] of projects) {
    if (libraryVersionChecker(tree, projectConfig)) {
      const destination = `${schema.destination}/${projectName.split('/')[1]}`;
      console.log(`Attempting to move ${projectName} to ${destination}`);

      migratePackage(tree, {
        name: projectName,
        destination: destination,
        updateImportPath: schema.updateImportPath,
      });
    }
  }
}

function migratePackage(tree: Tree, schema: MigratePackagesGeneratorSchema) {
  const { name, destination, updateImportPath = true } = schema;
  const jsonFile = 'workspace.json';

  moveGenerator(tree, {
    projectName: name!,
    destination: destination,
    updateImportPath: updateImportPath,
  });

  // moveGenerator automatically renames the package so this overwrites that change
  // and sets it back to the original package name.
  updateJson(tree, jsonFile, json => {
    const newProjectName = getNewProjectName(schema.destination);

    for (const [projectName, value] of Object.entries(json.projects)) {
      if (projectName === newProjectName) {
        json.projects[schema.name!] = value;
        delete json.projects[newProjectName];
      }
    }
    return json;
  });
}

function validateSchema(schema: MigratePackagesGeneratorSchema) {
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

function getNewProjectName(path: string) {
  return path.replace(/\//g, '-');
}

function hasSchemaFlag<T extends MigratePackagesGeneratorSchema, K extends keyof T>(
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
