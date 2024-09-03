import { addons } from '@storybook/manager-api';
import webcomponentsTheme from './theme.mjs';

addons.setConfig({
  previewTabs: {
    canvas: { hidden: true },
  },
  enableShortcuts: false,
  sidebar: {
    showRoots: true,
  },
  showPanel: false,
  theme: webcomponentsTheme, // override the default Storybook theme with a custom fluent theme
});
