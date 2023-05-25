import type { IPalette, ITheme } from '@fluentui/react';
import { createTheme } from '@fluentui/react';
import { IExtendedEffects, IExtendedSemanticColors } from './types';

import { fluent2ComponentStyles } from './fluent2ComponentStyles';
import { fluent2SharedColors } from './fluent2SharedColors';

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
  // properties are ordered here as in IPalette.ts

  themeDarker: '#0c3b5e',
  themeDark: '#0f548c',
  themeDarkAlt: '#115ea3',
  themePrimary: '#0f6cbd',
  themeSecondary: '#2886de', // Required by Fabric palette, only used in ShimmerWave
  themeTertiary: '#77b7f7',
  themeLight: '#b4d6fa',
  themeLighter: '#cfe4fa',
  themeLighterAlt: '#ebf3fc',

  black: '#000000',
  blackTranslucent40: 'rgba(0, 0, 0, 0.4)',
  neutralDark: '#141414',
  neutralPrimary: '#242424',
  neutralPrimaryAlt: '#383838',
  neutralSecondary: '#5c5c5c',
  neutralSecondaryAlt: '#8a8886',
  neutralTertiary: '#9e9e9e',
  neutralTertiaryAlt: '#c7c7c7',
  neutralQuaternary: '#d1d1d1',
  neutralQuaternaryAlt: '#e0e0e0',
  neutralLight: '#ebebeb',
  neutralLighter: '#f5f5f5',
  neutralLighterAlt: '#fafafa',

  accent: '#0f6cbd',
  white: '#FFFFFF',
  whiteTranslucent40: 'rgba(255 ,255 ,255 ,0.4)',

  ...fluent2SharedColors,
};

const p = fluent2LightPalette;

const semanticColorMappingOverridesForLight: Partial<IExtendedSemanticColors> = {
  // Extended slots
  inputBottomBorderFocus: p.themePrimary,
  inputBottomBorderRest: p.neutralLighter,

  // Base slot mapping changes
  // focusBorder seems to be used for keyboard focus on components that don't have text input.
  // inputFocusBorder seems to be used for keyboard focus on text input components.
  focusBorder: p.neutralTertiary,
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
