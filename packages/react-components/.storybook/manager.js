import { addons } from '@storybook/addons';
import theme from './theme';

addons.setConfig({
  showPanel: true,
  panelPosition: 'right',
  theme,
  toolbar: {
    zoom: { hidden: true },
    outline: { hidden: true },
    eject: { hidden: true },
    copy: { hidden: true },
    fullscreen: { hidden: true },
    'storybook/background': { hidden: true },
    'storybook/viewport': { hidden: true },
    'storybook/measure-addon/tool': { hidden: true },
    'storybook/outline': { hidden: true },
    'storybook/a11y/panel': { hidden: true },
  },
});
