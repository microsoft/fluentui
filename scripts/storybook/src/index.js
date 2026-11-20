const { configureReactIcons } = require('./react-icons-webpack');
const rules = require('./rules');
const { registerStylingMetadataRule } = require('./styling-metadata');
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
  registerStylingMetadataRule,
  getPackageStoriesGlob,
  loadWorkspaceAddon,
  registerRules,
  registerTsPaths,
  rules,
  getImportMappingsForExportToSandboxAddon,
  processBabelLoaderOptions,
};
