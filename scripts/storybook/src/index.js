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
  getPackageStoriesGlob,
  loadWorkspaceAddon,
  registerRules,
  registerStylingMetadataRule,
  registerTsPaths,
  rules,
  getImportMappingsForExportToSandboxAddon,
  processBabelLoaderOptions,
};
