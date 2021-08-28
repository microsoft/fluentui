import type { MakeStylesStyleFunctionRule } from '@fluentui/make-styles';
import type { Theme } from '@fluentui/react-theme';

/**
 * Make-styles rules for the typography variants
 */
export const caption: MakeStylesStyleFunctionRule<Theme> = theme => ({
  fontFamily: theme.global.type.fontFamilies.base,
  fontSize: theme.global.type.fontSizes.base[200],
  lineHeight: theme.global.type.lineHeights.base[200],
  fontWeight: theme.global.type.fontWeights.regular,
});
export const body: MakeStylesStyleFunctionRule<Theme> = theme => ({
  fontFamily: theme.global.type.fontFamilies.base,
  fontSize: theme.global.type.fontSizes.base[300],
  lineHeight: theme.global.type.lineHeights.base[300],
  fontWeight: theme.global.type.fontWeights.regular,
});
export const subheadline: MakeStylesStyleFunctionRule<Theme> = theme => ({
  fontFamily: theme.global.type.fontFamilies.base,
  fontSize: theme.global.type.fontSizes.base[400],
  lineHeight: theme.global.type.lineHeights.base[400],
  fontWeight: theme.global.type.fontWeights.semibold,
});
export const headline: MakeStylesStyleFunctionRule<Theme> = theme => ({
  fontFamily: theme.global.type.fontFamilies.base,
  fontSize: theme.global.type.fontSizes.base[500],
  lineHeight: theme.global.type.lineHeights.base[500],
  fontWeight: theme.global.type.fontWeights.semibold,
});
export const title3: MakeStylesStyleFunctionRule<Theme> = theme => ({
  fontFamily: theme.global.type.fontFamilies.base,
  fontSize: theme.global.type.fontSizes.base[600],
  lineHeight: theme.global.type.lineHeights.base[600],
  fontWeight: theme.global.type.fontWeights.semibold,
});
export const title2: MakeStylesStyleFunctionRule<Theme> = theme => ({
  fontFamily: theme.global.type.fontFamilies.base,
  fontSize: theme.global.type.fontSizes.hero[700],
  lineHeight: theme.global.type.lineHeights.hero[700],
  fontWeight: theme.global.type.fontWeights.semibold,
});
export const title1: MakeStylesStyleFunctionRule<Theme> = theme => ({
  fontFamily: theme.global.type.fontFamilies.base,
  fontSize: theme.global.type.fontSizes.hero[800],
  lineHeight: theme.global.type.lineHeights.hero[800],
  fontWeight: theme.global.type.fontWeights.semibold,
});
export const largeTitle: MakeStylesStyleFunctionRule<Theme> = theme => ({
  fontFamily: theme.global.type.fontFamilies.base,
  fontSize: theme.global.type.fontSizes.hero[900],
  lineHeight: theme.global.type.lineHeights.hero[900],
  fontWeight: theme.global.type.fontWeights.semibold,
});
export const display: MakeStylesStyleFunctionRule<Theme> = theme => ({
  fontFamily: theme.global.type.fontFamilies.base,
  fontSize: theme.global.type.fontSizes.hero[1000],
  lineHeight: theme.global.type.lineHeights.hero[1000],
  fontWeight: theme.global.type.fontWeights.semibold,
});
