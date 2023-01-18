import { addons } from '@storybook/addons';
import webcomponentsTheme from './theme.mjs';

addons.setConfig({
  previewTabs: {
    canvas: { hidden: true },
  },
  enableShortcuts: false,
  sidebar: {
    showRoots: true,
  },
  theme: webcomponentsTheme, // override the default Storybook theme with a custom fluent theme
});
