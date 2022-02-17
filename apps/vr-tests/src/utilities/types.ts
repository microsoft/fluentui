import * as React from 'react';
import { StoryApi, StoryName, StoryFn, StoryContext } from '@storybook/addons';

/** Extra parameters provided by our addon (see `.storybook/preview.js`) */
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface AddStoryConfig {
  /** Whether to include an RTL version of the story */
  includeRtl?: boolean;
  /** Whether to include a high contrast *theme* version of the story (converged only) */
  includeHighContrast?: boolean;
  /** Whether to include a dark theme version of the story (converged only) */
  includeDarkMode?: boolean;
}

export declare type LegacyStoryFn<ReturnType = unknown> = (p?: StoryContext) => ReturnType;

export type ExtendedStoryFnReturnType = React.ReactElement<unknown>;

export type ExtendedStoryFn = StoryFn<ExtendedStoryFnReturnType>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ExtendedStoryApi extends StoryApi<ExtendedStoryFnReturnType> {
  addStory: (
    storyName: StoryName,
    storyFn: ExtendedStoryFn,
    config?: AddStoryConfig,
  ) => ExtendedStoryApi;

  add: (storyName: StoryName, storyFn: ExtendedStoryFn) => StoryApi<ExtendedStoryFnReturnType>;
}
