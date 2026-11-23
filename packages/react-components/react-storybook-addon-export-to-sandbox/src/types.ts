import type { StoryContext as StoryContextOrigin, Parameters } from '@storybook/react-webpack5';
import type { ParametersExtension, PresetConfig } from './public-types';

export interface CssModuleEntry {
  name: string;
  source: string;
}

/** Parameters injected per-story at build time by the babel plugin. Not user-configurable. */
interface InjectedParameters {
  /** False when the extracted source is incomplete and must only be used for source display. */
  fullSourceIsRunnable?: boolean;
  fullSourceUnsupportedImports?: string[];
  cssModuleSources?: { cssModules?: CssModuleEntry[]; tokensSource?: string };
}

export interface StoryContext extends StoryContextOrigin {
  parameters: Parameters & ParametersExtension & InjectedParameters;
}

export type { ParametersExtension, PresetConfig };
