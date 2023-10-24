import type { StoryContext as StoryContextOrigin, Parameters } from '@storybook/addons';
import type { ParametersExtension } from './public-types';

export interface StoryContext extends StoryContextOrigin {
  parameters: Parameters & ParametersExtension;
}

export type { ParametersExtension };
