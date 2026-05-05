import { create } from 'storybook/theming';

/**
 * Custom Storybook chrome for the headless components docsite.
 *
 * Values mirror the light-mode tokens in `tokens.css`. The Storybook
 * theme builds at compile time and cannot read CSS custom properties, so the
 * palette is inlined here. Update this file alongside `tokens.css` if
 * the design tokens shift.
 */
const theme = create({
  base: 'light',

  // Storybook color palette
  colorPrimary: '#9b1f5a', // matches --accent
  colorSecondary: '#9b1f5a',

  // UI surfaces
  appBg: '#f7f7f8', // --bg-soft
  appContentBg: '#ffffff', // --bg
  appPreviewBg: '#ffffff',
  appBorderColor: '#e4e4e7', // --border
  appBorderRadius: 12, // --radius-lg

  // Fonts
  fontBase: '"Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif',
  fontCode: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',

  // Text
  textColor: '#0a0a0a', // --text
  textInverseColor: '#ffffff', // --text-on-accent
  textMutedColor: '#52525b', // --text-muted

  // Toolbar
  barTextColor: '#52525b',
  barHoverColor: '#9b1f5a',
  barSelectedColor: '#9b1f5a',
  barBg: '#ffffff',

  // Form controls
  buttonBg: '#ffffff',
  buttonBorder: '#e4e4e7',
  booleanBg: '#f2f2f4', // --surface-muted
  booleanSelectedBg: '#9b1f5a',
  inputBg: '#ffffff',
  inputBorder: '#e4e4e7',
  inputTextColor: '#0a0a0a',
  inputBorderRadius: 8, // --radius-md

  brandTitle: 'Fluent UI Headless Components',
  brandUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/react-components/react-headless-components-preview',
});

export default theme;
