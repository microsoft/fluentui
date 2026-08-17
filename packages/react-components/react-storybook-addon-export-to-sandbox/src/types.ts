import type { StoryContext as StoryContextOrigin, Parameters } from '@storybook/react-webpack5';
import type { CssModuleSources, ParametersExtension, PresetConfig } from './public-types';

/** Parameters injected per-story at build time by the babel plugin. Not user-configurable. */
interface InjectedParameters {
  cssModuleSources?: CssModuleSources;
}

export interface StoryContext extends StoryContextOrigin {
  parameters: Parameters & ParametersExtension & InjectedParameters;
}

export type { ParametersExtension, PresetConfig };
export type { CssModuleEntry, CssModuleSources } from './public-types';
