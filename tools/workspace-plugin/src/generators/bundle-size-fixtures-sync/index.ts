import {
  type ProjectConfiguration,
  type Tree,
  formatFiles,
  getProjects,
  globAsync,
  joinPathFragments,
  logger,
  readJson,
} from '@nx/devkit';

import { readExportMapConfig, resolveEntryPoints } from '../export-maps-sync/lib/export-map';
import type { PackageJson } from '../../types';
import {
  type BaseHookImport,
  type EntryPointImport,
  isBaseHook,
  renderBaseHooksFixture,
  renderEntryPointsFixture,
  toNamespaceBinding,
} from './lib/fixtures';
import { collectPublicExports } from './lib/public-exports';
import type { BundleSizeFixture, BundleSizeFixturesConfig } from './types';

export default async function (tree: Tree) {
  const projects = getProjects(tree);
  const unresolved: string[] = [];
  // rendered output is not prettier formatted yet, so drift can only be measured after formatFiles
  const contentBeforeWrite = new Map<string, string | null>();

  for (const [, projectConfig] of projects) {
    const fixtures = readFixturesConfig(projectConfig);

    if (fixtures === null) {
      continue;
    }

    for (const [fileName, fixture] of Object.entries(fixtures)) {
      const filePath = `${projectConfig.root}/bundle-size/${fileName}`;
      const contents = await renderFixture(tree, projects, projectConfig, fixture, unresolved);

      contentBeforeWrite.set(filePath, tree.read(filePath, 'utf-8'));
      tree.write(filePath, contents);
    }
  }

  await formatFiles(tree);

  const outOfSync = [...contentBeforeWrite]
    .filter(([filePath, before]) => tree.read(filePath, 'utf-8') !== before)
    .map(([filePath]) => filePath);

  if (unresolved.length > 0) {
    logger.warn(
      `bundle-size-fixtures-sync could not follow these re-exports, generated fixtures may be incomplete:\n${unresolved
        .map(entry => `  - ${entry}`)
        .join('\n')}`,
    );
  }

  return {
    outOfSyncMessage: outOfSyncMessage(outOfSync),
  };
}

function readFixturesConfig(projectConfig: ProjectConfiguration): BundleSizeFixturesConfig | null {
  const metadata = projectConfig.metadata as { bundleSizeFixtures?: BundleSizeFixturesConfig } | undefined;

  return metadata?.bundleSizeFixtures ?? null;
}

function renderFixture(
  tree: Tree,
  projects: Map<string, ProjectConfiguration>,
  projectConfig: ProjectConfiguration,
  fixture: BundleSizeFixture,
  unresolved: string[],
): Promise<string> | string {
  if (fixture.kind === 'entryPoints') {
    return renderEntryPoints(tree, projectConfig, fixture.name);
  }

  return renderBaseHooks(tree, projects, projectConfig, fixture.name, unresolved);
}

async function renderEntryPoints(tree: Tree, projectConfig: ProjectConfiguration, name: string): Promise<string> {
  const packageJson = readJson<PackageJson>(tree, `${projectConfig.root}/package.json`);
  const entryPoints = await resolveEntryPoints(tree, projectConfig.root, readExportMapConfig(projectConfig));

  const imports: EntryPointImport[] = [];

  for (const entryPoint of entryPoints) {
    // the root entry would pull in the whole library and defeat the point of per subpath isolation
    if (entryPoint.key === '.') {
      continue;
    }

    // a wildcard key is not importable as written, so cover every subpath it currently resolves to
    const subpaths = entryPoint.key.includes('*')
      ? await expandPattern(tree, projectConfig.root, entryPoint.outputPath)
      : [entryPoint.name];

    for (const subpath of subpaths) {
      imports.push({
        namespace: toNamespaceBinding(subpath),
        moduleSpecifier: `${packageJson.name}/${subpath}`,
      });
    }
  }

  return renderEntryPointsFixture(imports, name);
}

/**
 * `items/*\u200b/index` -> every `items/<dir>` that currently exists.
 */
async function expandPattern(tree: Tree, projectRoot: string, outputPath: string): Promise<string[]> {
  const matches = await globAsync(tree, [joinPathFragments(projectRoot, 'src', `${outputPath}.ts`)]);
  const srcRoot = joinPathFragments(projectRoot, 'src');

  return matches
    .map(match =>
      match
        .slice(srcRoot.length + 1)
        .replace(/\.[jt]sx?$/, '')
        .replace(/\/index$/, ''),
    )
    .sort();
}

function renderBaseHooks(
  tree: Tree,
  projects: Map<string, ProjectConfiguration>,
  projectConfig: ProjectConfiguration,
  name: string,
  unresolved: string[],
): string {
  const packageJson = readJson<PackageJson>(tree, `${projectConfig.root}/package.json`);
  const projectsByPackageName = mapProjectsByPackageName(tree, projects);

  const imports: BaseHookImport[] = [];

  for (const packageName of Object.keys(packageJson.dependencies ?? {}).sort()) {
    const dependencyRoot = projectsByPackageName.get(packageName);
    if (!dependencyRoot) {
      continue;
    }

    const publicExports = collectPublicExports(tree, `${dependencyRoot}/src/index.ts`);
    unresolved.push(...publicExports.unresolved);

    const hooks = [...publicExports.values].filter(isBaseHook).sort();
    if (hooks.length > 0) {
      imports.push({ packageName, hooks });
    }
  }

  return renderBaseHooksFixture(imports, name);
}

function mapProjectsByPackageName(tree: Tree, projects: Map<string, ProjectConfiguration>): Map<string, string> {
  const byPackageName = new Map<string, string>();

  for (const [, projectConfig] of projects) {
    const packageJsonPath = `${projectConfig.root}/package.json`;
    if (!tree.exists(packageJsonPath)) {
      continue;
    }

    byPackageName.set(readJson<PackageJson>(tree, packageJsonPath).name, projectConfig.root);
  }

  return byPackageName;
}

function outOfSyncMessage(outOfSync: string[]): string | undefined {
  if (outOfSync.length === 0) {
    return undefined;
  }

  return `The following bundle-size fixtures are out of date:
${outOfSync.map(filePath => `  - ${filePath}`).join('\n')}`;
}
