import { type ProjectConfiguration, type Tree, formatFiles, getProjects, readJson, updateJson } from '@nx/devkit';
import { isEqual } from 'lodash';

import { buildEntryPointFields, buildExportMap, readExportMapConfig, resolveEntryPoints } from './lib/export-map';
import type { PackageJson } from '../../types';

const REQUIRED_TAGS = ['vNext', 'platform:web'];

export default async function (tree: Tree) {
  const outOfSync: string[] = [];

  for (const [projectName, projectConfig] of getProjects(tree)) {
    if (!isInScope(tree, projectConfig)) {
      continue;
    }

    if (await syncProject(tree, projectConfig)) {
      outOfSync.push(projectName);
    }
  }

  await formatFiles(tree);

  return {
    outOfSyncMessage: outOfSyncMessage(outOfSync),
  };
}

function isInScope(tree: Tree, projectConfig: ProjectConfiguration): boolean {
  if (projectConfig.projectType !== 'library') {
    return false;
  }

  const tags = projectConfig.tags ?? [];
  if (!REQUIRED_TAGS.every(tag => tags.includes(tag))) {
    return false;
  }

  const packageJsonPath = `${projectConfig.root}/package.json`;
  if (!tree.exists(packageJsonPath)) {
    return false;
  }

  return !readJson<PackageJson>(tree, packageJsonPath).private;
}

/**
 * @returns whether the project was out of sync
 */
async function syncProject(tree: Tree, projectConfig: ProjectConfiguration): Promise<boolean> {
  const packageJsonPath = `${projectConfig.root}/package.json`;
  const packageJson = readJson<PackageJson>(tree, packageJsonPath);

  const config = readExportMapConfig(projectConfig);
  const entryPoints = await resolveEntryPoints(tree, projectConfig.root, config);

  if (entryPoints.length === 0) {
    return false;
  }

  const expectedFields = buildEntryPointFields(packageJson);
  const expectedExports = buildExportMap(packageJson, entryPoints);

  const fieldsInSync = (Object.keys(expectedFields) as Array<keyof typeof expectedFields>).every(field =>
    isEqual(packageJson[field], expectedFields[field]),
  );

  if (fieldsInSync && isEqual(packageJson.exports, expectedExports)) {
    return false;
  }

  updateJson<PackageJson>(tree, packageJsonPath, json => {
    Object.assign(json, expectedFields);
    json.exports = expectedExports;

    return json;
  });

  return true;
}

function outOfSyncMessage(outOfSync: string[]): string | undefined {
  if (outOfSync.length === 0) {
    return undefined;
  }

  return `The following projects have an out of date package.json entry point setup (\`exports\`, \`main\`, \`module\`, \`typings\`):
${outOfSync.map(name => `  - ${name}`).join('\n')}`;
}
