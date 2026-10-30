import { type ProjectConfiguration, type Tree, formatFiles, getProjects, logger, readJson } from '@nx/devkit';

import { type EntryPoint, readExportMapConfig, resolveEntryPoints } from '../export-maps-sync/lib/export-map';
import type { PackageJson } from '../../types';
import {
  type BaseHookImport,
  type NamedImport,
  isBaseHook,
  renderBaseHooksFixture,
  renderEntryPointsFixture,
  toNamespaceBinding,
} from './lib/fixtures';
import { collectPublicExports } from './lib/public-exports';
import type { BundleSizeFixture, BundleSizeFixturesConfig, EntryPointFixture } from './types';

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
      const contents = await renderFixture(tree, projects, projectConfig, fileName, fixture, unresolved);

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
  fileName: string,
  fixture: BundleSizeFixture,
  unresolved: string[],
): Promise<string> | string {
  if (fixture.kind === 'entryPoints') {
    return renderEntryPoints(tree, projectConfig, fixture.name, unresolved);
  }

  if (fixture.kind === 'entryPoint') {
    return renderEntryPoint(tree, projectConfig, fileName, fixture);
  }

  return renderBaseHooks(tree, projects, projectConfig, fixture.name, unresolved);
}

async function renderEntryPoint(
  tree: Tree,
  projectConfig: ProjectConfiguration,
  fileName: string,
  fixture: EntryPointFixture,
): Promise<string> {
  const { entryPoint } = fixture;
  const error = (reason: string) =>
    new Error(
      `bundle-size-fixtures-sync: project "${projectConfig.name ?? projectConfig.root}", fixture "${fileName}", ` +
        `entryPoint ${JSON.stringify(entryPoint)}: ${reason}`,
    );

  if (
    typeof entryPoint !== 'string' ||
    !entryPoint.startsWith('./') ||
    entryPoint
      .slice(2)
      .split('/')
      .some(segment => !segment || segment === '.' || segment === '..') ||
    ['\\', '*', '?', '[', ']', '{', '}'].some(character => entryPoint.includes(character))
  ) {
    throw error('Expected a canonical non-root export key such as "./tag-picker"; patterns are not supported.');
  }

  const entryPoints = await resolveEntryPoints(tree, projectConfig.root, readExportMapConfig(projectConfig));
  const selected = entryPoints.find(entry => entry.key === entryPoint);
  if (!selected) {
    throw error(
      `No declared public entry point matches. Valid non-root keys: ${entryPoints
        .filter(entry => entry.key !== '.')
        .map(entry => entry.key)
        .join(', ') || '(none)'}.`,
    );
  }

  const packageJson = readJson<PackageJson>(tree, `${projectConfig.root}/package.json`);
  const { namedImport, sourceFile, unresolved } = collectEntryPointImport(tree, projectConfig, packageJson.name, selected);
  if (!sourceFile) {
    throw error(`Cannot read the source for "${projectConfig.root}/src/${selected.outputPath}" (.ts or .tsx).`);
  }
  if (unresolved.length > 0) {
    throw error(`Cannot resolve star re-exports:\n${unresolved.map(entry => `  - ${entry}`).join('\n')}`);
  }

  return renderEntryPointsFixture([namedImport], fixture.name);
}

async function renderEntryPoints(
  tree: Tree,
  projectConfig: ProjectConfiguration,
  name: string,
  unresolved: string[],
): Promise<string> {
  const packageJson = readJson<PackageJson>(tree, `${projectConfig.root}/package.json`);
  const entryPoints = await resolveEntryPoints(tree, projectConfig.root, readExportMapConfig(projectConfig));

  const imports: NamedImport[] = entryPoints
    // the root entry would pull in the whole library and defeat the point of per subpath isolation
    .filter(entryPoint => entryPoint.key !== '.')
    .map(entryPoint => {
      const result = collectEntryPointImport(tree, projectConfig, packageJson.name, entryPoint);
      unresolved.push(...result.unresolved);
      return result.namedImport;
    });

  return renderEntryPointsFixture(imports, name);
}

function collectEntryPointImport(
  tree: Tree,
  projectConfig: ProjectConfiguration,
  packageName: string,
  entryPoint: EntryPoint,
): { namedImport: NamedImport; sourceFile: string | null; unresolved: string[] } {
  const sourcePath = resolveSourceFile(tree, `${projectConfig.root}/src/${entryPoint.outputPath}`);
  const sourceFile = sourcePath && tree.read(sourcePath, 'utf-8') !== null ? sourcePath : null;
  const publicExports = sourceFile ? collectPublicExports(tree, sourceFile, { includeDefault: true }) : null;

  return {
    namedImport: {
      namespace: toNamespaceBinding(entryPoint.name),
      moduleSpecifier: `${packageName}/${entryPoint.name}`,
      exports: [...(publicExports?.values ?? [])].sort(),
    },
    sourceFile,
    unresolved: publicExports?.unresolved ?? [],
  };
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

/** `src/color-picker` -> `src/color-picker.ts`, mirroring the extensions an entry point glob can match */
function resolveSourceFile(tree: Tree, pathWithoutExtension: string): string | null {
  return (
    ['.ts', '.tsx'].map(extension => `${pathWithoutExtension}${extension}`).find(file => tree.exists(file)) ?? null
  );
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
