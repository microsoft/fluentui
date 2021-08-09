import { addons } from '@storybook/addons';
import webcomponentsTheme from './theme';

addons.setConfig({
  enableShortcuts: false,
  sidebar: {
    showRoots: true,
  },
  theme: webcomponentsTheme, // override the default Storybook theme with a custom fluent theme
});
