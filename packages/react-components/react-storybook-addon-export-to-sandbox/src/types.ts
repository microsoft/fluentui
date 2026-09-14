import type { StoryContext as StoryContextOrigin, Parameters } from '@storybook/react-webpack5';
import type { ParametersExtension, PresetConfig } from './public-types';

export interface CssModuleEntry {
  name: string;
  source: string;
}

/** Parameters injected per-story at build time by the babel plugin. Not user-configurable. */
interface InjectedParameters {
  cssModuleSources?: { cssModules?: CssModuleEntry[]; tokensSource?: string };
}

export interface StoryContext extends StoryContextOrigin {
  parameters: Parameters & ParametersExtension & InjectedParameters;
}

export type { ParametersExtension, PresetConfig };
