import { initializeIcons } from '@fluentui/react/lib/Icons';
import { initializeFolderCovers } from '@fluentui/react-experiments/lib/FolderCover';

initializeIcons();
initializeFolderCovers();

export interface IStoryConfig {
  rtl?: boolean;
}

declare module '@storybook/addons/dist/ts3.9/types' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface StoryApi<StoryFnReturnType = unknown> {
    /** adds a story, but via VR Tests' addon which auto adds variants like RTL */
    addStory: this['add'];
  }
}

export * from './FabricDecorator';
export * from './FluentProviderDecorator';
export * from './DevOnlyStoryHeader';
