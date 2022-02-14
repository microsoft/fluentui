import { ExtendedStoryApi } from './types';

declare module '@storybook/addons' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface StoryApi {
    /** adds a story, but via VR Tests' addon which auto adds variants like RTL */
    addStory: ExtendedStoryApi['addStory'];
  }
}

export * from './TestWrapperDecorator';
