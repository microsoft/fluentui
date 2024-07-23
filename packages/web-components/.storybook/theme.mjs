import { create } from '@storybook/theming';

export default create({
  base: 'light',
  brandTitle: 'Fluent UI\nWeb Components',
  brandUrl: 'https://github.com/microsoft/fluentui',

  // Toolbar default and active colors
  barSelectedColor: '#0078d4', // use msft primary blue default
  barTextColor: '#222',

  colorPrimary: '#dedede',
  colorSecondary: 'deepskyblue',

  // UI
  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appBorderColor: '#e0e0e0', // use msft gray
  appBorderRadius: 4,

  // Typography
  fontBase:
      '"Segoe UI", "Segoe UI Web (West European)", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;',
  fontCode: 'monospace',

  // Text colors
  textColor: '#11100f',
  textInverseColor: '#0078d4', // use msft primary blue default

  // Form colors
  inputBg: 'white',
  inputTextColor: 'black',
  inputBorderRadius: 4,
});

