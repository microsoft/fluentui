import { IPalette } from '@fluentui/react';

/**
 * Shared colors from the Fluent 2 global palettes mapped to the v8 shared colors.
 * The mappings are based on closest color match available as semantic name.
 */
export const fluent2SharedColors: Partial<IPalette> = {
  yellowDark: '#d39300', // sharedColors.marigold.shade10
  yellow: '#fde300', // sharedColors.yellow.primary
  yellowLight: '#fef7b2', // sharedColors.yellow.tint40
  orange: '#f7630c', // sharedColors.orange.primary
  orangeLight: '#f98845', // sharedColors.orange.tint20
  orangeLighter: '#fdcfb4', // sharedColors.orange.tint40
  redDark: '#750b1c', // sharedColors.darkRed.primary
  red: '#d13438', // sharedColors.red.primary
  magentaDark: '#6b0043', // sharedColors.magenta.shade30
  magenta: '#bf0077', // sharedColors.magenta.primary
  magentaLight: '#d957a8', // sharedColors.magenta.tint30
  purpleDark: '#401b6c', // sharedColors.darkPurple.primary
  purple: '#5c2e91', // sharedColors.purple.primary
  purpleLight: '#c6b1de', // sharedColors.purple.tint40
  blueDark: '#003966', // sharedColors.darkBlue.primary
  blueMid: '#004e8c', // sharedColors.royalBlue.primary
  blue: '#0078d4', // sharedColors.blue.primary
  blueLight: '#3a96dd', // sharedColors.lightBlue.primary
  tealDark: '#006666', // sharedColors.darkTeal.primary
  teal: '#038387', // sharedColors.teal.primary
  tealLight: '#00b7c3', // sharedColors.lightTeal.primary
  greenDark: '#0b6a0b', // sharedColors.darkGreen.primary
  green: '#107c10', // sharedColors.green.primary
  greenLight: '#13a10e', // sharedColors.lightGreen.primary
};
