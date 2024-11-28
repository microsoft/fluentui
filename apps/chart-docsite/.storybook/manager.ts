import { addons } from '@storybook/manager-api';

import fluentStorybookTheme from './theme';

addons.setConfig({
  enableShortcuts: false,
  theme: fluentStorybookTheme,
  showPanel: false,
  showToolbar: false,
});
