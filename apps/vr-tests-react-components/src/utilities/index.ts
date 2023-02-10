import { ExtendedStoryApi } from './types';

declare module '@storybook/addons' {
  interface StoryApi {
    /** adds a story, but via VR Tests' addon which auto adds variants like RTL */
    addStory: ExtendedStoryApi['addStory'];
  }
}

export * from './TestWrapperDecorator';
export * from './getStoryVariant';
export * from './withStoryWrightSteps';
