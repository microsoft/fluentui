const fs = require('fs');
const path = require('path');

const { isConvergedPackage, getAllPackageInfo, getProjectMetadata } = require('@fluentui/scripts-monorepo');
const { stripIndents, offsetFromRoot } = require('@nrwl/devkit');
const { workspaceRoot } = require('nx/src/utils/app-root');
const semver = require('semver');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

const loadWorkspaceAddonDefaultOptions = { workspaceRoot };
/**
 * Registers workspace custom storybook addon to storybook with build-less setup during development.
 *
 * For production builds this behaves as identity function (returns the passed addonName)
 *
 * @example
 * ```js
 *  module.exports = {
 *    addons: [
        '@storybook/addon-essentials',
        loadWorkspaceAddon('@fluentui/custom-storybook-addon',{ tsConfigPath: path.join(__dirname,'../tsconfig.base.json') }),
      ]
 *  }
 * ```
 *
 * @param {string} addonName - package name of custom workspace addon
 * @param {Object} options
 * @param {string=} options.workspaceRoot
 * @param {string} options.tsConfigPath - absolute path to tsConfig that contains path aliases
 */
function loadWorkspaceAddon(addonName, options) {
  /* eslint-disable no-shadow */
  const { workspaceRoot, tsConfigPath } = { ...loadWorkspaceAddonDefaultOptions, ...options };

  if (process.env.NODE_ENV === 'production') {
    return addonName;
  }

  function getPaths() {
    const workspaceJson = JSON.parse(fs.readFileSync(path.join(workspaceRoot, 'workspace.json'), 'utf-8'));
    const addonMetadata = workspaceJson.projects[addonName];
    const packageRootPath = path.join(workspaceRoot, addonMetadata.root);
    const packageSourceRootPath = path.join(workspaceRoot, addonMetadata.sourceRoot);
    const packageJsonPath = path.join(packageRootPath, 'package.json');

    if (!fs.existsSync(packageJsonPath)) {
      throw new Error('your addon is missing package.json.');
    }

    /**
     * @type {Record<string,unknown> & {module?:string}}
     */
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

    if (!packageJson.module) {
      throw new Error(
        `your addon package.json is missing valid entry point definition -> Please make sure module property is defined! Example: {"module":"path/to/your/build/entrypoint/index.js"}`,
      );
    }

    const packageDistPath = path.normalize(path.dirname(packageJson.module));
    const packageTempPath = path.join(packageRootPath, 'temp');
    const presetSourcePath = path.join(packageRootPath, 'preset.js');
    const presetMockedSourcePath = path.join(packageTempPath, 'preset.ts');
    /**
     * we use always POSIX path in js modules thus this needs to be converted explicitly to POSIX, not matter what OS is used
     * Example:
     * `../one/two' -> `../one/two'  | POSIX (nix OS)
     * `..\\one\\two` ->  `../one/two` | NON POSIX (windows)
     */
    const relativePathToSource = path
      .relative(packageTempPath, packageSourceRootPath)
      .split(path.sep)
      .join(path.posix.sep);

    return {
      packageDistPath,
      packageTempPath,
      presetSourcePath,
      presetMockedSourcePath,
      relativePathToSource,
    };
  }

  const {
    relativePathToSource,
    packageDistPath,
    packageTempPath,
    presetSourcePath,
    presetMockedSourcePath,
  } = getPaths();

  if (!fs.existsSync(presetSourcePath)) {
    throw new Error(
      'Looks like your storybook addon is missing "preset.js" module. This file needs to be placed on root of your package',
    );
  }

  const presetContent = fs.readFileSync(presetSourcePath, 'utf-8');
  // absolute path needs to be always posix, non posix will explode in module resolution
  const posixTsConfigPath = tsConfigPath.split(path.sep).join(path.posix.sep);

  const presetRelativePathToDistApiRegex = new RegExp(`\\./${packageDistPath}`, 'g');
  const presetApiRegex = /module\.exports\s+=\s+({).+}/;
  const presetApiPathRegex = /(\/manager|\/preview)/g;
  let modifiedPresetContent = presetContent
    .replace(presetRelativePathToDistApiRegex, relativePathToSource)
    .replace(presetApiPathRegex, '$1.ts')
    .replace(presetApiRegex, (match, p1) => {
      return match.replace(p1, '{ managerWebpack,');
    });

  modifiedPresetContent = stripIndents`
    // @ts-ignore
    const { registerTsPaths } = require('@fluentui/scripts-storybook');

    function managerWebpack(config, options) {
      registerTsPaths({config, tsConfigPath: '${posixTsConfigPath}'});
      return config;
    }

    ${modifiedPresetContent}
  `;

  if (!fs.existsSync(packageTempPath)) {
    fs.mkdirSync(packageTempPath, { recursive: true });
  }

  fs.writeFileSync(presetMockedSourcePath, modifiedPresetContent, { encoding: 'utf-8' });

  return presetMockedSourcePath;
  /* eslint-enable no-shadow */
}

/**
 * @returns {import('storybook-addon-export-to-codesandbox').BabelPluginOptions}
 */
function getCodesandboxBabelOptions() {
  const allPackageInfo = getAllPackageInfo();

  return Object.values(allPackageInfo).reduce((acc, cur) => {
    if (isConvergedPackage({ packagePathOrJson: cur.packageJson, projectType: 'library' })) {
      const isPrerelease = semver.prerelease(cur.packageJson.version) !== null;

      acc[cur.packageJson.name] = isPrerelease
        ? { replace: '@fluentui/react-components/unstable' }
        : { replace: '@fluentui/react-components' };
    }

    return acc;
  }, /** @type import('storybook-addon-export-to-codesandbox').BabelPluginOptions*/ ({}));
}

/**
 * Get glob mapping array for all stories of packages that are dependency for provided package (provided package included).
 *
 * This helper is useful for creating aggregated storybooks which will generate multiple stories across packages.
 *
 * @param {{packageName:string,callerPath:string}} options
 * @returns
 */
function getPackageStoriesGlob(options) {
  const projectMetadata = getProjectMetadata({ name: options.packageName });

  /** @type {Record<string,unknown>} */
  const packageJson = JSON.parse(
    fs.readFileSync(path.resolve(workspaceRoot, projectMetadata.root, 'package.json'), 'utf-8'),
  );

  const dependencies = /** @type {Record<string,string>} */ (Object.assign(packageJson.dependencies, {
    [options.packageName]: '*',
  }));
  const rootOffset = offsetFromRoot(options.callerPath.replace(workspaceRoot, ''));

  return Object.keys(dependencies)
    .filter(pkgName => pkgName.startsWith('@fluentui/'))
    .map(pkgName => {
      const storiesGlob = '**/@(index.stories.@(ts|tsx)|*.stories.mdx)';
      const pkgMetadata = getProjectMetadata({ name: pkgName });

      if (fs.existsSync(path.resolve(workspaceRoot, pkgMetadata.root, 'stories'))) {
        return `${rootOffset}${pkgMetadata.root}/stories/${storiesGlob}`;
      }

      return `${rootOffset}${pkgMetadata.root}/src/${storiesGlob}`;
    });
}

/**
 *
 * register TsconfigPathsPlugin to webpack config
 * @param {Object} options
 * @param {string} options.tsConfigPath - absolute path to tsconfig that contains path aliases
 * @param {import('webpack').Configuration} options.config
 * @returns
 */
function registerTsPaths(options) {
  const { config, tsConfigPath } = options;
  const tsPaths = new TsconfigPathsPlugin({
    configFile: tsConfigPath,
  });

  config.resolve = config.resolve ?? {};
  config.resolve.plugins = config.resolve.plugins ?? [];
  config.resolve.plugins.push(tsPaths);
  return config;
}

exports.getPackageStoriesGlob = getPackageStoriesGlob;
exports.loadWorkspaceAddon = loadWorkspaceAddon;
exports.getCodesandboxBabelOptions = getCodesandboxBabelOptions;
exports.registerTsPaths = registerTsPaths;
