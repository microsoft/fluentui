import type { StoryContext as StoryContextOrigin, Parameters } from '@storybook/react-webpack5';
import type { ParametersExtension } from './public-types';

/** Parameters injected per-story at build time by `@fluentui/babel-preset-storybook-full-source`. */
interface InjectedParameters {
  fullSource?: string;
}

export interface StoryContext extends StoryContextOrigin {
  parameters: Parameters & ParametersExtension & InjectedParameters;
}

export type { ParametersExtension };
