import type { IPalette, ISemanticColors, ITheme } from '@fluentui/react';
import { createTheme } from '@fluentui/react';
import { IExtendedEffects } from './types';
import { fluent2ComponentStyles } from './fluent2ComponentStyles';

const fluent2ForV8DarkEffects: IExtendedEffects = {
  elevation4: '0px 2px 4px rgba(0, 0, 0, 0.14), 0px 0px 2px rgba(0, 0, 0, 0.12)',
  elevation8: '0px 4px 8px rgba(0, 0, 0, 0.14), 0px 0px 2px rgba(0, 0, 0, 0.12)',
  elevation16: '0px 8px 16px rgba(0, 0, 0, 0.14), 0px 0px 2px rgba(0, 0, 0, 0.12)',
  elevation64: '0px 32px 64px rgba(0, 0, 0, 0.24), 0px 0px 8px rgba(0, 0, 0, 0.2)',
  roundedCorner2: '2px',
  roundedCorner4: '4px',
  roundedCorner6: '6px',
  roundedCorner8: '8px',
  roundedCornerCircle: '50%',
};

const fluent2ForV8DarkPalette: Partial<IPalette> = {
  accent: '#2886de',
  themePrimary: '#2886de',
  themeLighterAlt: '#0A2E4A',
  themeLighter: '#0c3b5e',
  themeLight: '#0e4775',
  themeTertiary: '#0f548c',
  themeSecondary: '#2886de',
  themeDarkAlt: '#479ef5',
  themeDark: '#479ef5',
  themeDarker: '#62abf5',
  neutralLighterAlt: '#1a1a1a',
  neutralLighter: '#242424',
  neutralLight: '#292929',
  neutralQuaternaryAlt: '#2e2e2e',
  neutralQuaternary: '#3d3d3d',
  neutralTertiaryAlt: '#424242',
  neutralTertiary: '#707070',
  neutralSecondary: '#d1d1d1',
  neutralPrimaryAlt: '#d6d6d6',
  neutralPrimary: '#f5f5f5',
  neutralDark: '#fafafa',
  black: '#ffffff', // Note white and black are inverted in this theme
  white: '#141414',
};

const p = fluent2ForV8DarkPalette;

// shortcut since the gray scale isn't part of the v8 palette.
const grey36 = '#5C5C5C';

const semanticColorMappingOverridesForDark: Partial<ISemanticColors> = {
  primaryButtonText: p.black,
  primaryButtonTextHovered: p.black,
  primaryButtonTextPressed: p.black,
  primaryButtonTextDisabled: p.neutralTertiaryAlt,
  primaryButtonBackgroundDisabled: p.neutralLighter,
  accentButtonText: p.black,
  accentButtonBackground: p.themePrimary,
  inputPlaceholderText: p.neutralSecondaryAlt,
  inputForegroundChecked: p.black,
  inputBorder: p.neutralQuaternary,

  // Checkbox
  inputBackgroundChecked: p.themePrimary,
  inputBackground: p.white,
  bodyTextChecked: p.neutralPrimary,
  inputBackgroundCheckedHovered: p.themeDarkAlt,

  // Errors and warnings
  warningText: p.neutralPrimary,

  // Message bar colors
  messageText: p.neutralPrimary,
  messageLink: p.themeDarkAlt,
  messageLinkHovered: p.themeDarker,
  infoIcon: p.neutralSecondary,
  warningIcon: p.neutralPrimary,
  infoBackground: p.neutralLighter,
  disabledBorder: grey36,
  disabledText: grey36,
  inputIconHovered: p.black,
};

export const Fluent2WebDarkTheme: ITheme = createTheme({
  palette: fluent2ForV8DarkPalette,
  semanticColors: semanticColorMappingOverridesForDark,
  components: fluent2ComponentStyles,
  effects: fluent2ForV8DarkEffects,
});
