import { getAllPackageInfo, isConvergedPackage } from '@fluentui/scripts-monorepo';

/**
 * Reads package info from the monorepo and generates the scopes for beachball bump and release.
 * Differentiates between vNext and v8 releases.
 *
 * vNext scope includes all packages that have version > 8.x and shared internal packages that need versions bumped.
 * @returns {string[]} Array of package paths for beachball scope
 */
export function getConfig({ version }: { version: 'v8' }): { scope: string[] };
export function getConfig({ version }: { version: 'vNext' }): {
  scope: string[];
  groupConfig: {
    masterPackageName: string;
    changelogPath: string;
    include: string[];
  };
};
export function getConfig({ version }: { version: 'v8' | 'vNext' }) {
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

  if (version === 'v8') {
    const ignoreVNextScope = vNextPackagePaths.map(pkgPath => `!${pkgPath}`);

    return { scope: [...ignoreVNextScope] };
  }

  throw new Error('Unsupported version scopes acquisition');
}

function getVNextPackagePaths() {
  const allProjects = getAllPackageInfo(isConvergedPackage);
  const values = Object.values(allProjects);

  return values.map(project => project.packagePath);
}
