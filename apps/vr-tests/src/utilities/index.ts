import { initializeIcons } from '@fluentui/react/lib/Icons';
import { initializeFolderCovers } from '@fluentui/react-experiments/lib/FolderCover';

import { StoryApi as StoryApiLib } from '@storybook/addons/dist/types';

initializeIcons();
initializeFolderCovers();

export interface IStoryConfig {
  rtl?: boolean;
}

declare module '@storybook/addons/dist/types' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface StoryApi<StoryFnReturnType = unknown> {
    /** adds a story, but via VR Tests' addon which auto adds variants like RTL */
    addStory: StoryApiLib<StoryFnReturnType>['add'];
  }
}

export * from './FabricDecorator';
export * from './DevOnlyStoryHeader';
