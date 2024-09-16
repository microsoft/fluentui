import { WCThemeDecorator } from '../src/utilities/WCThemeDecorator';

export const parameters = {
  layout: 'fullscreen',
  controls: { expanded: true },
  viewMode: 'docs',
  previewTabs: {
    canvas: { hidden: true },
  },
  options: {
    storySort: {
      method: 'alphabetical',
    },
  },
};

export const decorators = [WCThemeDecorator];
