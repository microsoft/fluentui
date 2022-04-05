import { initializeIcons } from '@fluentui/react/lib/Icons';
import { initializeFolderCovers } from '@fluentui/react-experiments/lib/FolderCover';
import { ExtendedStoryApi } from './types';

initializeIcons();
initializeFolderCovers();

declare module '@storybook/addons' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface StoryApi {
    /** adds a story, but via VR Tests' addon which auto adds variants like RTL */
    addStory: ExtendedStoryApi['addStory'];
  }
}

export * from './TestWrapperDecorator';
export * from './DevOnlyStoryHeader';
