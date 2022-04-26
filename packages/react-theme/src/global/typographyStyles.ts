import { tokens } from '../tokens';
import { TypographyStyles } from '../types';

/**
 * Global typography styles (fontSize, fontWeight, and lineHeight)
 */
export const typographyStyles: TypographyStyles = {
  body1: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    lineHeight: tokens.lineHeightBase300,
  },
  body1Strong: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase300,
  },
  body1Stronger: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightMedium,
    lineHeight: tokens.lineHeightBase300,
  },
  caption1: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
    lineHeight: tokens.lineHeightBase200,
  },
  caption1Strong: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase200,
  },
  caption1Stronger: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightMedium,
    lineHeight: tokens.lineHeightBase200,
  },
  caption2: {
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightRegular,
    lineHeight: tokens.lineHeightBase100,
  },
  caption2Strong: {
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase100,
  },
  subtitle1: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase500,
  },
  subtitle2: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase400,
  },
  subtitle2Stronger: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightMedium,
    lineHeight: tokens.lineHeightBase400,
  },
  title1: {
    fontSize: tokens.fontSizeHero800,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightHero800,
  },
  title2: {
    fontSize: tokens.fontSizeHero700,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.fontSizeHero700,
  },
  title3: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase600,
  },
  largeTitle: {
    fontSize: tokens.fontSizeHero900,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightHero900,
  },
  display: {
    fontSize: tokens.fontSizeHero1000,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightHero1000,
  },
};
