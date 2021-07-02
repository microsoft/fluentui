import { MakeStylesStyleFunctionRule } from '@fluentui/make-styles';
import { Theme } from '@fluentui/react-theme';

/**
 * Make-styles rules for the typography variants
 */
export const typographyStyles: {
  caption: MakeStylesStyleFunctionRule<Theme>;
  body: MakeStylesStyleFunctionRule<Theme>;
  subheadline: MakeStylesStyleFunctionRule<Theme>;
  headline: MakeStylesStyleFunctionRule<Theme>;
  title3: MakeStylesStyleFunctionRule<Theme>;
  title2: MakeStylesStyleFunctionRule<Theme>;
  title1: MakeStylesStyleFunctionRule<Theme>;
  largeTitle: MakeStylesStyleFunctionRule<Theme>;
  display: MakeStylesStyleFunctionRule<Theme>;
} = {
  caption: theme => ({
    fontFamily: theme.global.type.fontFamilies.base,
    fontSize: theme.global.type.fontSizes.base[200],
    lineHeight: theme.global.type.lineHeights.base[200],
    fontWeight: theme.global.type.fontWeights.regular,
  }),
  body: theme => ({
    fontFamily: theme.global.type.fontFamilies.base,
    fontSize: theme.global.type.fontSizes.base[300],
    lineHeight: theme.global.type.lineHeights.base[300],
    fontWeight: theme.global.type.fontWeights.regular,
  }),
  subheadline: theme => ({
    fontFamily: theme.global.type.fontFamilies.base,
    fontSize: theme.global.type.fontSizes.base[400],
    lineHeight: theme.global.type.lineHeights.base[400],
    fontWeight: theme.global.type.fontWeights.semibold,
  }),
  headline: theme => ({
    fontFamily: theme.global.type.fontFamilies.base,
    fontSize: theme.global.type.fontSizes.base[500],
    lineHeight: theme.global.type.lineHeights.base[500],
    fontWeight: theme.global.type.fontWeights.semibold,
  }),
  title3: theme => ({
    fontFamily: theme.global.type.fontFamilies.base,
    fontSize: theme.global.type.fontSizes.base[600],
    lineHeight: theme.global.type.lineHeights.base[600],
    fontWeight: theme.global.type.fontWeights.semibold,
  }),
  title2: theme => ({
    fontFamily: theme.global.type.fontFamilies.base,
    fontSize: theme.global.type.fontSizes.hero[700],
    lineHeight: theme.global.type.lineHeights.hero[700],
    fontWeight: theme.global.type.fontWeights.semibold,
  }),
  title1: theme => ({
    fontFamily: theme.global.type.fontFamilies.base,
    fontSize: theme.global.type.fontSizes.hero[800],
    lineHeight: theme.global.type.lineHeights.hero[800],
    fontWeight: theme.global.type.fontWeights.semibold,
  }),
  largeTitle: theme => ({
    fontFamily: theme.global.type.fontFamilies.base,
    fontSize: theme.global.type.fontSizes.hero[900],
    lineHeight: theme.global.type.lineHeights.hero[900],
    fontWeight: theme.global.type.fontWeights.semibold,
  }),
  display: theme => ({
    fontFamily: theme.global.type.fontFamilies.base,
    fontSize: theme.global.type.fontSizes.hero[1000],
    lineHeight: theme.global.type.lineHeights.hero[1000],
    fontWeight: theme.global.type.fontWeights.semibold,
  }),
};
