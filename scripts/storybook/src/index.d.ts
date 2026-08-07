export {
  getPackageStoriesGlob,
  loadWorkspaceAddon,
  registerTsPaths,
  registerRules,
  overrideDefaultBabelLoader,
  processBabelLoaderOptions,
  getImportMappingsForExportToSandboxAddon,
} from './utils';

export * as rules from './rules';

export type StateDataAttribute = {
  name: `data-${string}`;
  type: string;
  description: string;
};

export type StateDataAttributes = Record<string, StateDataAttribute[]>;

export function getStateDataAttributes(options: { tsconfigPath: string; sourceRoot: string }): StateDataAttributes;
