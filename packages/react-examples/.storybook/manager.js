import { addons } from '@storybook/addons';
import fluentuiTheme from './fluentuiTheme';

addons.setConfig({
  showPanel: true,
  panelPosition: 'right',
  theme: fluentuiTheme, // override the default Storybook theme with a custom fluent theme
});
