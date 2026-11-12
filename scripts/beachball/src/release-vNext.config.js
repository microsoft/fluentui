require('./register').register();

const path = require('node:path');

const { isConvergedPackage } = require('@fluentui/scripts-monorepo');
const { readJsonFile } = require('@nx/devkit');
const semver = require('semver');

const { config: sharedConfig } = require('./shared.config');
const { getConfig } = require('./utils');

const { scope, groupConfig } = getConfig({ version: 'vNext' });

/** @type {{ name: string, version: string, prereleaseTag: string }[]} */
const packagesToTag = [];
let isExitHookRegistered = false;

/**
 * @type {import('./shared.config').ScopedConfig}
 */
const config = {
  ...sharedConfig,
  scope,
  changelog: {
    ...sharedConfig.changelog,
    groups: [groupConfig],
  },
  hooks: {
    ...sharedConfig.hooks,
    // With ESRP, it's not possible to directly add a second tag for prereleases during the release process.
    // Instead, this hook logs a warning indicating that manual tagging is needed.
    postpublish: (packageRoot, name, version) => {
      const warningPrefix = `##vso[task.logissue type=warning]${name}@${version}:`;
      const prereleaseTag = semver.parse(version)?.prerelease?.[0];

      if (!process.env.RELEASE_VNEXT_OFFICIAL || !prereleaseTag) {
        return;
      }

      if (typeof prereleaseTag === 'number' || semver.validRange(String(prereleaseTag))) {
        console.log(
          `${warningPrefix} prerelease identifier "${prereleaseTag}" is not a usable tag name. ` +
            `Give this package a named prerelease version (e.g. "-beta.0") if it should be tagged.`,
        );
        return;
      }

      const projectJsonPath = path.join(packageRoot, 'project.json');
      try {
        /** @type {import('@nx/devkit').ProjectConfiguration} */
        const project = readJsonFile(projectJsonPath);
        if (isConvergedPackage({ project, packageJson: { name, version } })) {
          packagesToTag.push({ name, version, prereleaseTag });

          // Use a process exit hook to log the complete list of packages to tag.
          // This should be replaced with a repo-level postpublish hook once supported in beachball.
          if (!isExitHookRegistered) {
            isExitHookRegistered = true;
            process.once('exit', () => {
              const packageList = packagesToTag
                .map(packageToTag => `- ${packageToTag.name}@${packageToTag.version}: ${packageToTag.prereleaseTag}`)
                .join('\n');
              console.log(
                '##vso[task.logissue type=warning]After ESRP publishing completes, npm tags must be manually ' +
                  'added for the following package versions (see https://aka.ms/fluentui-esrp for instructions):\n' +
                  packageList,
              );
            });
          }
        }
      } catch (error) {
        console.log(`${warningPrefix} Failed to read ${projectJsonPath}:`, error);
      }
    },
  },
};

module.exports = config;
