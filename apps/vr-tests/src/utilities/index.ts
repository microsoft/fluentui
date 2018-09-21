import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

initializeIcons();

export interface IStoryConfig {
  rtl?: boolean;
}

declare module '@storybook/react' {
  interface Story {
    addStory(storyName: string, callback: RenderFunction, config?: IStoryConfig): this;
  }
}

export * from './FabricDecorator';
