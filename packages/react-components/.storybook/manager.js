import { addons } from '@storybook/addons';
import fluentuiTheme from './fluentuiTheme';

addons.setConfig({
  showPanel: true,
  panelPosition: 'right',
  theme: fluentuiTheme,
});
