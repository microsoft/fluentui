import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { initializeFolderCovers } from '@uifabric/experiments/lib/FolderCover';

initializeIcons();
initializeFolderCovers();

export interface IStoryConfig {
  rtl?: boolean;
}

declare module '@storybook/addons/dist/types' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface StoryApi<StoryFnReturnType = unknown> {
    /** adds a story, but via VR Tests' addon which auto adds variants like RTL */
    addStory: this['add'];
  }
}

export * from './FabricDecorator';
export * from './DevOnlyStoryHeader';
