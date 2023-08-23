const fs = require('fs');
const path = require('path');

const { fullSourcePlugin: babelPlugin } = require('@fluentui/babel-preset-storybook-full-source');
const { getAllPackageInfo } = require('@fluentui/scripts-monorepo');
const { stripIndents, offsetFromRoot, workspaceRoot, readProjectConfiguration } = require('@nx/devkit');
const { FsTree } = require('nx/src/generators/tree');
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

  function getPaths() {
    const addonMetadata = getProjectMetadata(addonName, workspaceRoot);
    const packageRootPath = path.join(workspaceRoot, addonMetadata.root);
    const packageSourceRootPath = path.join(workspaceRoot, addonMetadata.sourceRoot ?? '');
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

  const { relativePathToSource, packageDistPath, packageTempPath, presetSourcePath, presetMockedSourcePath } =
    getPaths();

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
      registerTsPaths({config, configFile: '${posixTsConfigPath}'});
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
 * @private
 * @param {ReturnType<typeof getAllPackageInfo>} allPackageInfo
 * @returns {import("webpack").RuleSetRule}
 */
function _createCodesandboxRule(allPackageInfo = getAllPackageInfo()) {
  const config = getCodesandboxBabelOptions();

  return {
    /**
     * why the usage of 'post' ? - we need to run this loader after all storybook webpack rules/loaders have been executed.
     * while we can use Array.prototype.unshift to "override" the indexes this approach is more declarative without additional hacks.
     */
    enforce: 'post',
    test: /\.stories\.tsx$/,
    include: /stories/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: _processBabelLoaderOptions({
        plugins: [[babelPlugin, config]],
      }),
    },
  };

  /**
   * @returns {import('@fluentui/babel-preset-storybook-full-source').BabelPluginOptions}
   */
  function getCodesandboxBabelOptions() {
    /**
     * packages that are part of v9 but are not meant for platform:web
     */
    const excludePackages = [
      '@fluentui/babel-preset-storybook-full-source',
      '@fluentui/react-storybook-addon',
      '@fluentui/react-storybook-addon-codesandbox',
      '@fluentui/react-conformance-griffel',
    ];

    const importMappings = Object.values(allPackageInfo).reduce((acc, cur) => {
      if (excludePackages.includes(cur.packageJson.name)) {
        return acc;
      }

      if (isPackagePartOfReactComponentsSuite(cur.packageJson.name)) {
        // TODO: once all pre-release packages (deprecated approach) will be released as stable this logic will be removed
        const isPrerelease = semver.prerelease(cur.packageJson.version) !== null;

        acc[cur.packageJson.name] = isPrerelease
          ? { replace: '@fluentui/react-components/unstable' }
          : { replace: '@fluentui/react-components' };

        return acc;
      }

      return acc;
    }, /** @type import('@fluentui/babel-preset-storybook-full-source').BabelPluginOptions*/ ({}));

    return importMappings;
  }

  /**
   *
   * @param {string} projectName
   */
  function isPackagePartOfReactComponentsSuite(projectName) {
    const suiteProject = allPackageInfo['@fluentui/react-components'];

    // this is needed because react-northstar is a lerna sub-project thus `getAllPackageInfo` returns only projects within `packages/fluentui/` folder
    if (suiteProject) {
      const suiteDependencies = suiteProject.packageJson.dependencies ?? {};
      return Boolean(suiteDependencies[projectName]);
    }

    return false;
  }
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
  const projectMetadata = getProjectMetadata(options.packageName);

  /** @type {{name:string;version:string;dependencies?:Record<string,string>}} */
  const packageJson = JSON.parse(
    fs.readFileSync(path.resolve(workspaceRoot, projectMetadata.root, 'package.json'), 'utf-8'),
  );

  packageJson.dependencies = packageJson.dependencies ?? {};

  const dependencies = { ...packageJson.dependencies };
  const rootOffset = offsetFromRoot(options.callerPath.replace(workspaceRoot, ''));

  return Object.keys(dependencies)
    .filter(pkgName => pkgName.startsWith('@fluentui/'))
    .map(pkgName => {
      const storiesGlob = '**/@(index.stories.@(ts|tsx)|*.stories.mdx)';
      const pkgMetadata = getProjectMetadata(pkgName);

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
 * @param {string} options.configFile - absolute path to tsconfig that contains path aliases
 * @param {import('webpack').Configuration} options.config - webpack config
 * @returns
 */
function registerTsPaths(options) {
  const { config, configFile } = options;
  const tsPaths = new TsconfigPathsPlugin({
    configFile,
  });

  config.resolve = config.resolve ?? {};
  config.resolve.plugins = config.resolve.plugins ?? [];

  // remove existing to prevent multiple tspaths plugin
  config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof TsconfigPathsPlugin));

  config.resolve.plugins.push(tsPaths);

  return config;
}

/**
 *
 * register custom Webpack Rules to webpack config
 * @param {Object} options
 * @param {import('webpack').RuleSetRule[]} options.rules - webpack rules
 * @param {import('webpack').Configuration} options.config - webpack config
 * @returns
 */
function registerRules(options) {
  const { config, rules } = options;
  config.module = config.module ?? {};
  config.module.rules = config.module.rules ?? [];
  config.module.rules.push(...rules);

  return config;
}

/**
 * @typedef {import('@babel/core').TransformOptions & Partial<{customize: string | null}>} BabelLoaderOptions
 */

/**
 * Adds custom config to any `babel-loader` usage. Needs to be used on all manually added rules with babel-loader to webpack configuration.
 *
 * Why is this needed:
 *  - `options.babelrc` is ignored by `babel-loader` thus we need to use `customize` api to exclude specific babel presets/plugins
 *
 * @private
 * @param {BabelLoaderOptions} loaderConfig
 */
function _processBabelLoaderOptions(loaderConfig) {
  const customLoaderPath = path.join(__dirname, './loaders/custom-loader.js');
  const customOptions = { customize: customLoaderPath };
  Object.assign(loaderConfig, customOptions);

  return loaderConfig;
}

/**
 * @typedef  {{loader: string; options: { [index: string]: any }}} LoaderObjectDef
 */

/**
 * Overrides storybooks babel-loader setup
 *
 * We might remove this once we'll came up with robust solution (or proper behaviors will be added to babel-loader). For more context @see https://github.com/microsoft/fluentui/issues/18775
 *
 * 📣 We don't use this override anymore as babel-loader is replaced by swc in whole webpack via `storybook-addon-swc`
 *
 * **Note:**
 * - this function mutates `rules` argument which is a reference to `modules.rules` webpack config property
 * - to print used babel-loader config run: `yarn start-storybook --no-manager-cache --debug-webpack` and look for
 * webpack rule set containing both:
 *  - `test: /\.(mjs|tsx?|jsx?)$/`
 *  - `node_modules/babel-loader/lib/index.js` as `loader` within module.rules
 *
 * @param {Object} options
 * @param {import('webpack').Configuration} options.config - webpack config
 */
function overrideDefaultBabelLoader(options) {
  const { config } = options;
  config.module = config.module ?? {};
  config.module.rules = config.module.rules ?? [];

  const loader = getBabelLoader(/** @type {import('webpack').RuleSetRule[]}*/ (config.module.rules));

  _processBabelLoaderOptions(loader.options);

  function getBabelLoader(/** @type {import('webpack').RuleSetRule[]} */ rules) {
    // eslint-disable-next-line no-shadow
    const ruleIdx = rules.findIndex(rule => {
      return String(rule.test) === '/\\.(mjs|tsx?|jsx?)$/';
    });

    const rule = /** @type {import("webpack").RuleSetRule}*/ (rules[ruleIdx]);

    if (!Array.isArray(rule.use)) {
      throw new Error('storybook webpack rules changed');
    }

    const loaderIdx = rule.use.findIndex(loaderConfig => {
      return /** @type {LoaderObjectDef} */ (loaderConfig).loader.includes('babel-loader');
    });

    // eslint-disable-next-line no-shadow
    const loader = /** @type {LoaderObjectDef}*/ (rule.use[loaderIdx]);

    if (!Object.prototype.hasOwnProperty.call(loader, 'options')) {
      throw new Error('storybook webpack #module.rules changed!');
    }

    return loader;
  }
}

/**
 * @param {string} projectName
 * @param {string} root
 */
function getProjectMetadata(projectName, root = workspaceRoot) {
  const tree = new FsTree(root, false);
  return readProjectConfiguration(tree, projectName);
}

exports.getPackageStoriesGlob = getPackageStoriesGlob;
exports.loadWorkspaceAddon = loadWorkspaceAddon;
exports.registerTsPaths = registerTsPaths;
exports.registerRules = registerRules;
exports.overrideDefaultBabelLoader = overrideDefaultBabelLoader;
exports._createCodesandboxRule = _createCodesandboxRule;
