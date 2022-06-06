import { create } from '@storybook/theming';
import logo from '../public/fluent.svg';

/**
 * Theming and branding the storybook to fluent. Taken from https://storybook.js.org/docs/react/configure/theming
 */
const theme = create({
  base: 'light',

  // Storybook-specific color palette
  colorPrimary: 'rgba(255, 255, 255, .4)',
  colorSecondary: '#0078d4',

  // UI
  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appBorderColor: '#e0e0e0', // use msft gray
  appBorderRadius: 4,

  // Fonts
  fontBase:
    '"Segoe UI", "Segoe UI Web (West European)", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;',
  fontCode: 'monospace',

  // Text colors
  textColor: '#11100f',
  textInverseColor: '#0078d4', // use msft primary blue default

  // Toolbar default and active colors
  barSelectedColor: '#0078d4', // use msft primary blue default

  // Form colors
  inputBorderRadius: 4,

  // Use the fluent branding for the upper left image
  brandTitle: 'Fluent UI React Components',
  brandUrl: 'https://github.com/microsoft/fluentui',
  brandImage: logo,
});

export default theme;
