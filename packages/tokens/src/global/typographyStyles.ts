import { tokens } from '../tokens';
import { TypographyStyles } from '../types';

/**
 * Global typography styles (fontSize, fontWeight, and lineHeight)
 */
export const typographyStyles: TypographyStyles = {
  body1: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    lineHeight: tokens.lineHeightBase300,
  },
  body1Strong: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase300,
  },
  body1Stronger: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightBold,
    lineHeight: tokens.lineHeightBase300,
  },
  body2: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightRegular,
    lineHeight: tokens.lineHeightBase400,
  },
  caption1: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
    lineHeight: tokens.lineHeightBase200,
  },
  caption1Strong: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase200,
  },
  caption1Stronger: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightBold,
    lineHeight: tokens.lineHeightBase200,
  },
  caption2: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightRegular,
    lineHeight: tokens.lineHeightBase100,
  },
  caption2Strong: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase100,
  },
  subtitle1: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase500,
  },
  subtitle2: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase400,
  },
  subtitle2Stronger: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightBold,
    lineHeight: tokens.lineHeightBase400,
  },
  title1: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeHero800,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightHero800,
  },
  title2: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeHero700,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightHero700,
  },
  title3: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase600,
  },
  largeTitle: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeHero900,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightHero900,
  },
  display: {
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeHero1000,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightHero1000,
  },
};
