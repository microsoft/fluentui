import type { IPalette, ITheme } from '@fluentui/react';
import { createTheme } from '@fluentui/react';
import { IExtendedEffects, IExtendedSemanticColors } from './types';
import { fluent2ComponentStyles } from './fluent2ComponentStyles';
import { fluent2SharedColors } from './fluent2SharedColors';
import { Fluent2WebLightTheme } from './fluent2WebLightTheme';

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
  // properties are ordered here as in IPalette.ts

  themeDarker: '#62abf5',
  themeDark: '#479ef5',
  themeDarkAlt: '#479ef5',
  themePrimary: '#2886de',
  themeSecondary: '#2886de',
  themeTertiary: '#0f548c',
  themeLight: '#0e4775',
  themeLighter: '#0c3b5e',
  themeLighterAlt: '#0A2E4A',

  black: '#ffffff', // Note white and black are inverted in this theme
  blackTranslucent40: 'rgba(255 ,255 ,255 ,0.4)',
  neutralDark: '#fafafa',
  neutralPrimary: '#f5f5f5',
  neutralPrimaryAlt: '#d6d6d6',
  neutralSecondary: '#d1d1d1',
  neutralSecondaryAlt: '#8a8886',
  neutralTertiary: '#707070',
  neutralTertiaryAlt: '#424242',
  neutralQuaternary: '#3d3d3d',
  neutralQuaternaryAlt: '#2e2e2e',
  neutralLight: '#292929',
  neutralLighter: '#242424',
  neutralLighterAlt: '#1a1a1a',
  accent: '#2886de',
  white: '#141414',
  whiteTranslucent40: 'rgba(0, 0, 0, 0.4)',

  ...fluent2SharedColors,
};

const p = fluent2ForV8DarkPalette;

// shortcut since the gray scale isn't part of the v8 palette.
const grey36 = '#5C5C5C';

const semanticColorMappingOverridesForDark: Partial<IExtendedSemanticColors> = {
  // Primary button is unique, it's background color is shared across themes
  primaryButtonBackgroundHovered: Fluent2WebLightTheme.palette.themePrimary,
  primaryButtonBackgroundPressed: Fluent2WebLightTheme.palette.themeDarker,
  primaryButtonBackground: Fluent2WebLightTheme.palette.themeDarkAlt,

  // This hex matches the v9 theme.
  link: p.themeDark,

  // Extended semantic colors
  inputBottomBorderFocus: p.themePrimary,
  inputBottomBorderRest: p.neutralLighter,

  // Base semantic mapping overrides
  primaryButtonText: p.black,
  primaryButtonTextHovered: p.black,
  primaryButtonTextPressed: p.black,
  primaryButtonTextDisabled: p.neutralTertiaryAlt,
  primaryButtonBackgroundDisabled: p.neutralLighter,
  accentButtonText: p.black,
  accentButtonBackground: p.themePrimary,

  inputPlaceholderText: p.neutralSecondaryAlt,
  inputForegroundChecked: p.black,
  inputFocusBorderAlt: p.neutralTertiary,
  inputBorder: p.neutralQuaternary,
  focusBorder: p.neutralTertiary,

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
  isInverted: true,
});
