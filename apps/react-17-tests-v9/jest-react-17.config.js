// @ts-check
const fs = require('node:fs');
const path = require('node:path');

const { pathsToModuleNameMapper } = require('ts-jest');
const tsConfigBase = require('../../tsconfig.base.json');
const tsPathAliases = pathsToModuleNameMapper(tsConfigBase.compilerOptions.paths, {
  prefix: `<rootDir>/../../`,
});

const jestConfig = require('./jest.config');

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
const config = {
  ...jestConfig,
  moduleNameMapper: {
    ...tsPathAliases,
    ...jestConfig.moduleNameMapper,
  },
  displayName: 'react-17-tests-v9-integration',
  roots: createRoots(),
  testPathIgnorePatterns: [
    // default jest config
    '/node_modules/',

    // ignore tests that use React 18 APIs not present in React 17

    /**  {@link file://./../../packages/react-components/react-provider/library/src/components/FluentProvider/FluentProvider-hydrate.test.tsx} */
    'components/FluentProvider/FluentProvider-hydrate.test.tsx',
  ],
  // Keeps Jest from using too much memory as GC gets invokes more often, makes tests slower
  // https://stackoverflow.com/a/75857711
  workerIdleMemoryLimit: '1024MB',
};

module.exports = config;

/**
 * Creates an array of paths to packages that don't have specific tags
 * @returns {string[]} An array of paths to test
 */
function createRoots() {
  const rootDir = path.resolve(__dirname, '../../packages/react-components');
  const roots = findValidPackagePaths(rootDir);

  console.info(`Creating Jest Testing roots: ${roots.join('\n')}`);

  return roots;

  /**
   * Recursively finds valid package paths that don't have excluded tags
   * @param {string} dirPath - Directory to scan
   * @returns {string[]} Array of valid package paths
   */
  function findValidPackagePaths(dirPath) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    let validPaths = [];

    // Check if current directory is a valid package
    if (isValidPackage(dirPath)) {
      validPaths.push(dirPath);
    }

    // Recursively check subdirectories
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const fullPath = path.join(dirPath, entry.name);
        validPaths = validPaths.concat(findValidPackagePaths(fullPath));
      }
    }
    // Sort for consistent ordering
    return validPaths.sort();
  }

  /**
   * Checks if a directory is a valid package based on its project.json
   * @param {string} packagePath - Path to potential package
   * @returns {boolean} Whether the package is valid
   */
  function isValidPackage(packagePath) {
    try {
      const projectJsonPath = path.join(packagePath, 'project.json');

      if (fs.existsSync(projectJsonPath)) {
        const projectJson = JSON.parse(fs.readFileSync(projectJsonPath, 'utf8'));
        const tags = projectJson.tags || [];

        return (
          !['react-theme-sass'].some(projectName => projectName === projectJson.name) &&
          !['tools', 'react-northstar', 'platform:node', 'type:stories'].some(tag => tags.includes(tag))
        );
      }

      return false; // Only include directories with project.json
    } catch (error) {
      console.warn(`Error reading project.json for ${packagePath}:`, error);
      return false; // Skip directories with invalid project.json
    }
  }
}
