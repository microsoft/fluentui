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
  const vNextPackagePaths = getVNextPackagePaths();

  if (version === 'vNext') {
    return {
      scope: [...vNextPackagePaths],
      groupConfig: {
        masterPackageName: '@fluentui/react-components',
        changelogPath: 'packages/react-components/react-components',
        include: vNextPackagePaths,
      },
    };
  }

  const ignoreVNextScope = vNextPackagePaths.map(path => `!${path}`);

  if (version === 'web-components') {
    return {
      scope: ['packages/web-components', '!apps/*', ...ignoreVNextScope],
    };
  }

  if (version === 'v8') {
    return { scope: [...ignoreVNextScope] };
  }

  throw new Error('Unsupported version scopes acquisition');
}

function getVNextPackagePaths() {
  const allProjects = getAllPackageInfo(isConvergedPackage);
  const values = Object.values(allProjects);

  return values.map(project => project.packagePath);
}
