import { create } from '@storybook/theming';

export default create({
  base: 'light',
  brandTitle: 'Fluent Web Components',
  brandUrl: 'https://github.com/microsoft/fluentui',

  // Toolbar default and active colors
  barSelectedColor: '#0078d4', // use msft primary blue default
  barTextColor: '#222',

  colorPrimary: '#dedede',
  colorSecondary: 'deepskyblue',

  // UI
  // appBg: '#0ff',
  // appContentBg: '--fill',
  appBorderRadius: 4,

  // Typography
  // fontBase: '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#222',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Form colors
  inputBg: 'white',
  inputTextColor: 'black',
  inputBorderRadius: 4,
});
