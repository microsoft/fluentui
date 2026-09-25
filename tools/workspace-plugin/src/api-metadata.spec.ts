import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

import type { ProjectConfiguration } from '@nx/devkit';

interface PublicationPackageJson {
  name: string;
  private?: boolean;
  exports: Record<string, unknown>;
  files?: string[];
  fluentuiCatalog?: string;
}

interface PublicationProject {
  packageJson: PublicationPackageJson;
  packagePath: string;
  project: ProjectConfiguration;
  projectPath: string;
}

const workspaceRoot = resolve(__dirname, '../../..');
const metadataBuildInputs = [
  'production',
  '^production',
  '{workspaceRoot}/scripts/api-extractor/api-extractor.*.json',
  'apiMetadataGenerator',
];
const metadataBuildDependency = {
  projects: ['api-metadata'],
  target: 'build',
};
const excludedWebPackages = new Set([
  '@fluentui/react-migration-v0-v9',
  '@fluentui/react-migration-v8-v9',
  '@fluentui/react-theme-sass',
]);
const additionalPublicationPackages = new Set(['@fluentui/react-jsx-runtime', '@fluentui/tokens']);
const publicationProjects = discoverPublicationProjects();

describe('API metadata fleet publication', () => {
  it('covers the complete supported v9 component and runtime fleet', () => {
    expect(publicationProjects).toHaveLength(76);
    expect(publicationProjects.map(candidate => candidate.packageJson.name)).toEqual(
      expect.arrayContaining([
        '@fluentui/react-alert',
        '@fluentui/react-calendar-compat',
        '@fluentui/react-components',
        '@fluentui/react-datepicker-compat',
        '@fluentui/react-headless-components-preview',
        '@fluentui/react-jsx-runtime',
        '@fluentui/react-menu-grid-preview',
        '@fluentui/react-timepicker-compat',
        '@fluentui/react-virtualizer',
        '@fluentui/tokens',
      ]),
    );
  });

  it('hashes generator files and dependency identities without narrowing default external dependencies', () => {
    const nxJson = readJson<{ namedInputs: { apiMetadataGenerator: unknown } }>('nx.json');

    expect(nxJson.namedInputs.apiMetadataGenerator).toEqual([
      '{workspaceRoot}/tools/api-metadata/src/**/*',
      '{workspaceRoot}/tools/api-metadata/package.json',
      '{workspaceRoot}/tools/api-metadata/project.json',
      '{workspaceRoot}/tools/api-metadata/tsconfig*.json',
      '{workspaceRoot}/tools/api-metadata/.swcrc',
      '{workspaceRoot}/yarn.lock',
    ]);
  });

  it.each(publicationProjects)(
    '$projectPath publishes every declared entry point without rollout restrictions',
    item => {
      const expectedSystem =
        item.packageJson.name === '@fluentui/react-headless-components-preview' ? 'headless' : 'fluent-v9';
      const apiMetadata = (
        item.project.metadata as {
          apiMetadata?: { system?: string; entrypoints?: string[]; rolloutPartialReasons?: string[] };
        }
      )?.apiMetadata;
      const declaredEntrypoints = Object.entries(item.packageJson.exports).filter(
        ([entrypoint]) => entrypoint !== './metadata.json' && entrypoint !== './package.json',
      );

      expect(apiMetadata).toEqual({ system: expectedSystem });
      expect(declaredEntrypoints.length).toBeGreaterThan(0);
      for (const [entrypoint, target] of declaredEntrypoints) {
        expect(collectTypeTargets(target)).not.toEqual([]);
        expect(entrypoint).not.toBe('./metadata.json');
      }

      expect(item.packageJson).toMatchObject({
        fluentuiCatalog: './metadata.json',
        exports: { './metadata.json': './dist/metadata/index.json' },
        files: expect.arrayContaining(['dist/metadata']),
      });
    },
  );

  it.each(publicationProjects)(
    '$projectPath propagates metadata generation through build dependencies and cache inputs',
    item => {
      expect(item.project.targets?.build?.inputs).toEqual(metadataBuildInputs);
      expect(item.project.targets?.build?.dependsOn).toEqual(['^build', metadataBuildDependency]);
      expect(item.project.targets?.['generate-api']?.dependsOn).toEqual(['^generate-api', metadataBuildDependency]);
    },
  );

  it('publishes every headless and suite declaration subpath', () => {
    const headless = publicationProjects.find(
      item => item.packageJson.name === '@fluentui/react-headless-components-preview',
    )!;
    const suite = publicationProjects.find(item => item.packageJson.name === '@fluentui/react-components')!;
    const jsxRuntime = publicationProjects.find(item => item.packageJson.name === '@fluentui/react-jsx-runtime')!;

    expect(publicEntrypoints(headless.packageJson)).toHaveLength(56);
    expect(publicEntrypoints(headless.packageJson)).toContain('.');
    expect(publicEntrypoints(suite.packageJson)).toEqual(['.', './unstable']);
    expect(publicEntrypoints(jsxRuntime.packageJson)).toEqual(['.', './jsx-dev-runtime', './jsx-runtime']);
    expect(collectTypeTargets(headless.packageJson.exports['.'])).toEqual(['./dist/index.d.ts', './dist/index.d.cts']);
  });

  it.each([...excludedWebPackages])('%s remains explicitly outside the v9 metadata fleet', packageName => {
    const item = findPackageProject(packageName);
    const apiMetadata = (item.project.metadata as { apiMetadata?: unknown } | undefined)?.apiMetadata;

    expect(apiMetadata).toBeUndefined();
    expect(item.packageJson.fluentuiCatalog).toBeUndefined();
    expect(item.packageJson.exports['./metadata.json']).toBeUndefined();
    expect(item.packageJson.files).not.toContain('dist/metadata');
  });
});

function discoverPublicationProjects(): PublicationProject[] {
  return findProjectFiles(['packages/react-components', 'packages/tokens'])
    .map(readPublicationProject)
    .filter((item): item is PublicationProject => {
      if (!item || item.project.projectType !== 'library' || item.packageJson.private) {
        return false;
      }

      const tags = item.project.tags ?? [];
      const isWebPackage =
        item.projectPath.startsWith('packages/react-components/') &&
        tags.includes('vNext') &&
        tags.includes('platform:web') &&
        !tags.includes('tools') &&
        !excludedWebPackages.has(item.packageJson.name);

      return isWebPackage || additionalPublicationPackages.has(item.packageJson.name);
    })
    .sort((left, right) => left.packageJson.name.localeCompare(right.packageJson.name));
}

function findPackageProject(packageName: string): PublicationProject {
  const item = findProjectFiles(['packages/react-components'])
    .map(readPublicationProject)
    .find(candidate => candidate?.packageJson.name === packageName);

  if (!item) {
    throw new Error(`Could not find project for ${packageName}`);
  }

  return item;
}

function findProjectFiles(roots: string[]): string[] {
  const projectFiles: string[] = [];
  const visit = (directory: string) => {
    for (const entry of readdirSync(join(workspaceRoot, directory), { withFileTypes: true })) {
      const entryPath = join(directory, entry.name);
      if (entry.isDirectory()) {
        visit(entryPath);
      } else if (entry.name === 'project.json') {
        projectFiles.push(entryPath);
      }
    }
  };

  roots.forEach(visit);
  return projectFiles;
}

function readPublicationProject(projectPath: string): PublicationProject | undefined {
  const packagePath = join(dirname(projectPath), 'package.json');
  try {
    return {
      packageJson: readJson<PublicationPackageJson>(packagePath),
      packagePath,
      project: readJson<ProjectConfiguration>(projectPath),
      projectPath,
    };
  } catch {
    return undefined;
  }
}

function publicEntrypoints(packageJson: PublicationPackageJson): string[] {
  return Object.keys(packageJson.exports).filter(
    entrypoint => entrypoint !== './metadata.json' && entrypoint !== './package.json',
  );
}

function collectTypeTargets(value: unknown): string[] {
  if (typeof value === 'string' || value === null || typeof value !== 'object') {
    return [];
  }

  return Object.entries(value).flatMap(([condition, target]) => {
    if (condition === 'types' && typeof target === 'string') {
      return [target];
    }
    return collectTypeTargets(target);
  });
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(readFileSync(join(workspaceRoot, relativePath), 'utf8')) as T;
}
