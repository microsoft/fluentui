import { getAllPackageInfo, isConvergedPackage } from '@fluentui/scripts-monorepo';

/**
 * Reads package info from the monorepo and generates the scopes for beachball bump and release.
 * Differentiates between vNext and v8 releases.
 *
 * vNext scope includes all packages that have version > 8.x and shared internal packages that need versions bumped.
 * @returns {string[]} Array of package paths for beachball scope
 */
export function getConfig({ version }: { version: 'web-components' }): { scope: string[] };
export function getConfig({ version }: { version: 'v8' }): { scope: string[] };
export function getConfig({ version }: { version: 'tools' }): { scope: string[] };
export function getConfig({ version }: { version: 'headless' }): { scope: string[] };
export function getConfig({ version }: { version: 'vNext' }): {
  scope: string[];
  groupConfig: {
    masterPackageName: string;
    changelogPath: string;
    include: string[];
  };
};
export function getConfig({ version }: { version: 'v8' | 'vNext' | 'web-components' | 'tools' | 'headless' }) {
  const { vNextPaths, webComponentsPaths, toolsPaths, v8Paths, headlessPaths } = getPackagePaths();

  if (version === 'vNext') {
    return {
      scope: [...vNextPaths],
      groupConfig: {
        masterPackageName: '@fluentui/react-components',
        changelogPath: 'packages/react-components/react-components',
        include: vNextPaths,
      },
    };
  }

  if (version === 'web-components') {
    return {
      scope: [...webComponentsPaths],
    };
  }

  if (version === 'v8') {
    return { scope: [...v8Paths] };
  }

  if (version === 'tools') {
    return {
      scope: [...toolsPaths],
    };
  }

  if (version === 'headless') {
    return {
      scope: [...headlessPaths],
    };
  }

  throw new Error('Unsupported version scopes acquisition');
}

const isWebComponentPackage: typeof isConvergedPackage = metadata => {
  return Boolean(metadata.project.tags?.includes('web-components'));
};

const isV8Package: typeof isConvergedPackage = metadata => {
  const hasV8Tag = Boolean(metadata.project.tags?.includes('v8'));

  return hasV8Tag && !isWebComponentPackage(metadata) && !isConvergedPackage(metadata);
};
const isToolsPackage: typeof isConvergedPackage = metadata => {
  const hasToolsTag = Boolean(metadata.project.tags?.includes('tools'));
  const isPrivate = Boolean(metadata.packageJson.private);

  return hasToolsTag && !isPrivate && !isV8Package(metadata);
};
const isHeadlessPackage: typeof isConvergedPackage = metadata => {
  const hasHeadlessTag = Boolean(metadata.project.tags?.includes('react-headless'));
  const isPrivate = Boolean(metadata.packageJson.private);

  return hasHeadlessTag && !isPrivate;
};

function getPackagePaths() {
  const allProjects = getAllPackageInfo();
  const vNextPaths: string[] = [];
  const webComponentsPaths: string[] = [];
  const v8Paths: string[] = [];
  const toolsPaths: string[] = [];
  const headlessPaths: string[] = [];

  for (const project of Object.values(allProjects)) {
    const isPrivate = Boolean(project.packageJson.private);
    const metadata = { project: project.projectConfig, packageJson: project.packageJson };
    if (isConvergedPackage(metadata) && !isToolsPackage(metadata) && !isHeadlessPackage(metadata) && !isPrivate) {
      vNextPaths.push(project.packagePath);
    }
    if (isWebComponentPackage(metadata)) {
      webComponentsPaths.push(project.packagePath);
    }
    if (isToolsPackage(metadata)) {
      toolsPaths.push(project.packagePath);
    }
    if (isV8Package(metadata)) {
      v8Paths.push(project.packagePath);
    }
    if (isHeadlessPackage(metadata)) {
      headlessPaths.push(project.packagePath);
    }
  }

  return { vNextPaths, webComponentsPaths, toolsPaths, v8Paths, headlessPaths };
}
