import type { IPalette, ISemanticColors, ITheme } from '@fluentui/react';
import { createTheme } from '@fluentui/react';
import { IExtendedEffects } from './types';

import { fluent2ComponentStyles } from './fluent2ComponentStyles';

const fluent2ForV8DLightEffects: IExtendedEffects = {
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

// grays used in semantic slots but don't fit in the palette.
const grey38 = '#616161';
const grey26 = '#424242';
const grey74 = '#BDBDBD';

const fluent2LightPalette: Partial<IPalette> = {
  accent: '#0f6cbd',
  themePrimary: '#0f6cbd',
  themeLighterAlt: '#ebf3fc',
  themeLighter: '#cfe4fa',
  themeLight: '#b4d6fa',
  themeTertiary: '#77b7f7',
  themeSecondary: '#2886de', // Required by Fabric palette, only used in ShimmerWave
  themeDarkAlt: '#115ea3',
  themeDark: '#0f548c',
  themeDarker: '#0c3b5e',
  neutralLighterAlt: '#fafafa',
  neutralLighter: '#f5f5f5',
  neutralLight: '#ebebeb',
  neutralQuaternaryAlt: '#e0e0e0',
  neutralQuaternary: '#d1d1d1',
  neutralTertiaryAlt: '#c7c7c7',
  neutralTertiary: '#9e9e9e',
  neutralSecondary: '#5c5c5c',
  neutralPrimaryAlt: '#383838',
  neutralPrimary: '#242424',
  neutralDark: '#141414',
  black: '#000000',
  white: '#FFFFFF',

  yellowDark: '#835C00',
  yellow: '#F2E384',
  yellowLight: '#FBF6D9',
  orange: '#A33D2A',
  orangeLight: '#CC4A31',
  orangeLighter: '#EDC2A7',
  redDark: '#8E192E',
  red: '#C4314B',
};

const p = fluent2LightPalette;

const semanticColorMappingOverridesForLight: Partial<ISemanticColors> = {
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

  // Grey values
  inputIconHovered: grey26,
  inputPlaceholderText: grey38,
  disabledBorder: grey74,
  disabledText: grey74,
};

export const Fluent2WebLightTheme: ITheme = createTheme({
  palette: fluent2LightPalette,
  semanticColors: semanticColorMappingOverridesForLight,
  components: fluent2ComponentStyles,
  effects: fluent2ForV8DLightEffects,
});
