import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { initializeFolderCovers } from '@uifabric/experiments/lib/FolderCover';

initializeIcons();
initializeFolderCovers();

export interface IStoryConfig {
  rtl?: boolean;
}

declare module '@storybook/react' {
  // tslint:disable-next-line:interface-name
  interface Story {
    addStory(storyName: string, callback: RenderFunction, config?: IStoryConfig): this;
  }
}

export * from './FabricDecorator';
export * from './DevOnlyStoryHeader';
