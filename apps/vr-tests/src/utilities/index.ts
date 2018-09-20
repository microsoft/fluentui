import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

initializeIcons();

declare module '@storybook/react' {
  interface Story {
    addStory(storyName: string, callback: RenderFunction): this;
  }
}

export * from './FabricDecorator';
