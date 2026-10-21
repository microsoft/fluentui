const { configureReactIcons } = require('./react-icons-webpack');
const rules = require('./rules');
const {
  getPackageStoriesGlob,
  loadWorkspaceAddon,
  registerRules,
  registerTsPaths,
  processBabelLoaderOptions,
  getImportMappingsForExportToSandboxAddon,
} = require('./utils');

module.exports = {
  configureReactIcons,
  getPackageStoriesGlob,
  loadWorkspaceAddon,
  registerRules,
  registerTsPaths,
  rules,
  getImportMappingsForExportToSandboxAddon,
  processBabelLoaderOptions,
};
