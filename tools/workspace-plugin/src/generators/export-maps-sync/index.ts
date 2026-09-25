import { type ProjectConfiguration, type Tree, formatFiles, getProjects, readJson, updateJson } from '@nx/devkit';
import { isEqual } from 'lodash';

import { buildEntryPointFields, buildExportMap, readExportMapConfig, resolveEntryPoints } from './lib/export-map';
import type { PackageJson } from '../../types';
import { readApiMetadataConfig } from '../../api-metadata';

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
  const apiMetadata = Boolean(readApiMetadataConfig(projectConfig));
  const entryPoints = await resolveEntryPoints(tree, projectConfig.root, config);

  if (entryPoints.length === 0) {
    return false;
  }

  const expectedFields = buildEntryPointFields(packageJson);
  const expectedExports = buildExportMap(packageJson, entryPoints, { apiMetadata });
  const expectedFiles = syncMetadataFiles(packageJson.files, apiMetadata);
  const expectedCatalog = apiMetadata ? './metadata.json' : undefined;

  const fieldsInSync = (Object.keys(expectedFields) as Array<keyof typeof expectedFields>).every(field =>
    isEqual(packageJson[field], expectedFields[field]),
  );

  // condition order is load bearing - node resolves the first match, so `types` after `default`
  // silently degrades type resolution. compare order sensitively rather than with a deep equal.
  if (
    fieldsInSync &&
    JSON.stringify(packageJson.exports) === JSON.stringify(expectedExports) &&
    JSON.stringify(packageJson.files) === JSON.stringify(expectedFiles) &&
    packageJson.fluentuiCatalog === expectedCatalog
  ) {
    return false;
  }

  updateJson<PackageJson>(tree, packageJsonPath, json => {
    Object.assign(json, expectedFields);
    json.exports = expectedExports;
    json.files = expectedFiles;
    if (expectedCatalog) {
      json.fluentuiCatalog = expectedCatalog;
    } else {
      delete json.fluentuiCatalog;
    }

    return json;
  });

  return true;
}

function syncMetadataFiles(files: string[] | undefined, enabled: boolean): string[] | undefined {
  if (!files) {
    return enabled ? ['dist/metadata'] : undefined;
  }

  const withoutMetadata = files.filter(file => file !== 'dist/metadata');
  return enabled ? [...withoutMetadata, 'dist/metadata'] : withoutMetadata;
}

function outOfSyncMessage(outOfSync: string[]): string | undefined {
  if (outOfSync.length === 0) {
    return undefined;
  }

  return `The following projects have an out of date package.json entry point setup (\`exports\`, \`main\`, \`module\`, \`typings\`):
${outOfSync.map(name => `  - ${name}`).join('\n')}`;
}
