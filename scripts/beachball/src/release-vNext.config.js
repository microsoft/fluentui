require('./register').register();

const path = require('node:path');

const { isConvergedPackage } = require('@fluentui/scripts-monorepo');
const { readJsonFile } = require('@nx/devkit');
const semver = require('semver');

const { config: sharedConfig } = require('./shared.config');
const { getConfig } = require('./utils');

const { scope, groupConfig } = getConfig({ version: 'vNext' });

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

      // Validate that it's a vnext package, then log that the tag should be added.
      const projectJsonPath = path.join(packageRoot, 'project.json');
      try {
        /** @type {import('@nx/devkit').ProjectConfiguration} */
        const project = readJsonFile(projectJsonPath);
        if (isConvergedPackage({ project, packageJson: { name, version } })) {
          console.log(`${warningPrefix} after publish, use https://aka.ms/ReleaseUI to add the tag "${prereleaseTag}"`);
        }
      } catch (error) {
        console.log(`${warningPrefix} Failed to read ${projectJsonPath}:`, error);
      }
    },
  },
};

module.exports = config;
