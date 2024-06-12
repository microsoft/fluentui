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
export function getConfig({ version }: { version: 'vNext' }): {
  scope: string[];
  groupConfig: {
    masterPackageName: string;
    changelogPath: string;
    include: string[];
  };
};
export function getConfig({ version }: { version: 'v8' | 'vNext' | 'web-components' }) {
  const { vNextPaths, webComponentsPaths } = getPackagePaths();

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

  const ignoreV8Scope = vNextPaths.concat(webComponentsPaths).map(path => `!${path}`);

  if (version === 'v8') {
    return { scope: [...ignoreV8Scope] };
  }

  throw new Error('Unsupported version scopes acquisition');
}

const isWebComponentPackage: typeof isConvergedPackage = metadata => {
  return Boolean(metadata.project.tags?.includes('web-components'));
};

function getPackagePaths() {
  const allProjects = getAllPackageInfo();
  const vNextPaths: string[] = [];
  const webComponentsPaths: string[] = [];

  for (const project of Object.values(allProjects)) {
    const metadata = { project: project.projectConfig, packageJson: project.packageJson };
    if (isConvergedPackage(metadata)) {
      vNextPaths.push(project.packagePath);
    }
    if (isWebComponentPackage(metadata)) {
      webComponentsPaths.push(project.packagePath);
    }
  }

  return { vNextPaths, webComponentsPaths };
}
