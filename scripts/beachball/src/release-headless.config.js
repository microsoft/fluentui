require('./register').register();

const { getAllPackageInfo } = require('@fluentui/scripts-monorepo');

const { config: sharedConfig } = require('./shared.config');

function getHeadlessPaths() {
  const allProjects = getAllPackageInfo();
  return Object.values(allProjects)
    .filter(project => project.projectConfig.tags?.includes('react-headless') && !project.packageJson.private)
    .map(project => project.packagePath);
}

/**
 * @type {typeof sharedConfig}
 */
const config = {
  ...sharedConfig,
  scope: getHeadlessPaths(),
};

module.exports = config;
