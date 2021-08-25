import { create } from '@storybook/theming';

export default create({
  base: 'light',
  brandTitle: 'Fluent Web Components',
  brandUrl: 'https://example.com',

  // Toolbar default and active colors
  barSelectedColor: '#0078d4', // use msft primary blue default

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

  // Toolbar default and active colors
  barTextColor: '#222',
  barSelectedColor: '#0078d4', // use msft primary blue default

  // Form colors
  inputBg: 'white',
  inputTextColor: 'black',
  inputBorderRadius: 4,
});
