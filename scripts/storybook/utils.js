// @ts-check

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
 * @param {{workspaceRoot?:string}=} options
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
    const sourceRootPath = path.join(workspaceRoot, addonMetadata.sourceRoot);
    const tsConfigPath = path.join(rootPath, 'tsconfig.lib.json');
    const packageJsonPath = path.join(rootPath, 'package.json');
    /**
     * @type {Record<string,any>}
     */
    const tsconfigLibJson = JSON.parse(fs.readFileSync(tsConfigPath, 'utf-8'));
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    const packageDistPath = path.dirname(packageJson.module);
    const distPath = path.join(rootPath, tsconfigLibJson.compilerOptions.outDir);
    const relativePathToSource = path.relative(distPath, sourceRootPath);
    const presetSourcePath = path.join(rootPath, 'preset.js');
    const presetMemorySourcePath = path.join(distPath, 'preset.js');

    return {
      distPath,
      packageDistPath,
      presetSourcePath,
      presetMemorySourcePath,
      relativePathToSource,
    };
  }

  const { relativePathToSource, distPath, packageDistPath, presetSourcePath, presetMemorySourcePath } = getPaths();

  if (!fs.existsSync(presetSourcePath)) {
    throw new Error(
      'Looks like your storybook addon is missing "preset.js" module. This file needs to be placed on root of your package',
    );
  }

  const presetContent = fs.readFileSync(presetSourcePath, 'utf-8');

  const regex = new RegExp(`\.\\/${path.normalize(packageDistPath)}`, 'g');
  let modifiedPresetContent = presetContent.replace(regex, relativePathToSource);
  modifiedPresetContent = stripIndents`
    const { workspaceRoot } = require('nx/src/utils/app-root');
    const { registerTsProject } = require('nx/src/utils/register');

    registerTsProject(workspaceRoot, 'tsconfig.base.json');

    ${modifiedPresetContent}
  `;

  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath);
  }

  fs.writeFileSync(presetMemorySourcePath, modifiedPresetContent, { encoding: 'utf-8' });

  return distPath;
}

/**
 * @returns {import('storybook-addon-export-to-codesandbox').BabelPluginOptions}
 */
function getCodesandboxBabelOptions() {
  const allPackageInfo = getAllPackageInfo();

  return Object.values(allPackageInfo).reduce((acc, cur) => {
    if (isConvergedPackage(cur.packageJson)) {
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
