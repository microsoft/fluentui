const fs = require('fs');
const path = require('path');
const semver = require('semver');
const { stripIndents } = require('@nrwl/devkit');
const { workspaceRoot } = require('nx/src/utils/app-root');

const { isConvergedPackage, getAllPackageInfo } = require('../monorepo');

const loadWorkspaceAddonDefaultOptions = { workspaceRoot };
/**
 * Registers workspace custom storybook addon to storybook with build-less setup during development.
 *
 * For production builds this behaves as identity function (returns the passed addonName)
 *
 * @example
 * ```js
 *  module.exports = { addons: ['@storybook/addon-essentials', loadWorkspaceAddon('@fluentui/custom-storybook-addon')] }
 * ```
 *
 * @param {string} addonName - package name of custom workspace addon
 * @param {Partial<typeof loadWorkspaceAddonDefaultOptions>} options
 */
function loadWorkspaceAddon(addonName, options = {}) {
  const { workspaceRoot } = { ...loadWorkspaceAddonDefaultOptions, ...options };

  if (process.env.NODE_ENV === 'production') {
    return addonName;
  }

  function getPaths() {
    const workspaceJson = JSON.parse(fs.readFileSync(path.join(workspaceRoot, 'workspace.json'), 'utf-8'));
    const addonMetadata = workspaceJson.projects[addonName];
    const rootPath = path.join(workspaceRoot, addonMetadata.root);
    const tsConfigPath = path.join(rootPath, 'tsconfig.lib.json');
    const packageJsonPath = path.join(rootPath, 'package.json');
    const sourceRootPath = path.join(workspaceRoot, addonMetadata.sourceRoot);
    /**
     * @type {Record<string,unknown> & {compilerOptions:{outDir?:string}}}
     */
    const tsconfigJson = JSON.parse(fs.readFileSync(tsConfigPath, 'utf-8'));
    /**
     * @type {Record<string,unknown> & {module?:string}}
     */
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

    if (!packageJson.module) {
      throw new Error(
        `your addon package.json is missing valid entry point definition -> Please make sure module property is defined! Example: {"module":"path/to/your/build/entrypoint/index.js"}`,
      );
    }

    if (!tsconfigJson.compilerOptions.outDir) {
      throw new Error('your addon tsconfig.lib.json is missing compilerOptions.outDir definition');
    }

    const packageDistPath = path.dirname(packageJson.module);
    const tsConfigDistPath = path.join(rootPath, tsconfigJson.compilerOptions.outDir);
    /**
     * we use always POSIX path in js modules thus this needs to be converted explicitly to POSIX, not matter what OS is used
     * Example:
     * `../one/two' -> `../one/two'  | POSIX (nix OS)
     * `..\\one\\two` ->  `../one/two` | NON POSIX (windows)
     */
    const relativePathToSource = path
      .relative(tsConfigDistPath, sourceRootPath)
      .replace(new RegExp(`\\${path.sep}`, 'g'), path.posix.sep);
    const presetSourcePath = path.join(rootPath, 'preset.js');
    const presetMockedSourcePath = path.join(tsConfigDistPath, 'preset.js');

    return {
      tsConfigDistPath,
      packageDistPath,
      presetSourcePath,
      presetMockedSourcePath,
      relativePathToSource,
    };
  }

  const {
    relativePathToSource,
    tsConfigDistPath,
    packageDistPath,
    presetSourcePath,
    presetMockedSourcePath,
  } = getPaths();

  if (!fs.existsSync(presetSourcePath)) {
    throw new Error(
      'Looks like your storybook addon is missing "preset.js" module. This file needs to be placed on root of your package',
    );
  }

  const presetContent = fs.readFileSync(presetSourcePath, 'utf-8');

  const regex = new RegExp(`\\./${path.normalize(packageDistPath)}`, 'g');
  let modifiedPresetContent = presetContent.replace(regex, relativePathToSource);

  modifiedPresetContent = stripIndents`
    const { workspaceRoot } = require('nx/src/utils/app-root');
    const { registerTsProject } = require('nx/src/utils/register');

    registerTsProject(workspaceRoot, 'tsconfig.base.json');

    ${modifiedPresetContent}
  `;

  if (!fs.existsSync(tsConfigDistPath)) {
    fs.mkdirSync(tsConfigDistPath);
  }

  fs.writeFileSync(presetMockedSourcePath, modifiedPresetContent, { encoding: 'utf-8' });

  return tsConfigDistPath;
}

/**
 * @returns {import('storybook-addon-export-to-codesandbox').BabelPluginOptions}
 */
function getCodesandboxBabelOptions() {
  const allPackageInfo = getAllPackageInfo();

  return Object.values(allPackageInfo).reduce((acc, cur) => {
    if (isConvergedPackage({ packagePathOrJson: cur.packageJson, projectType: 'library' })) {
      const prereleaseTags = semver.prerelease(cur.packageJson.version);
      const isNonRcPrerelease = prereleaseTags && !prereleaseTags[0].includes('rc');
      acc[cur.packageJson.name] = isNonRcPrerelease
        ? { replace: '@fluentui/react-components/unstable' }
        : { replace: '@fluentui/react-components' };
    }

    return acc;
  }, /** @type import('storybook-addon-export-to-codesandbox').BabelPluginOptions*/ ({}));
}

exports.loadWorkspaceAddon = loadWorkspaceAddon;
exports.getCodesandboxBabelOptions = getCodesandboxBabelOptions;
