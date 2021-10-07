import type { MakeStylesStyleFunctionRule } from '@fluentui/make-styles';
import type { Theme } from '@fluentui/react-theme';

/**
 * Make-styles rules for the typography variants
 */
export const caption: MakeStylesStyleFunctionRule<Theme> = theme => ({
  fontFamily: theme.fontFamilyBase,
  fontSize: theme.fontSizeBase200,
  lineHeight: theme.lineHeightBase200,
  fontWeight: theme.fontWeightRegular,
});
export const body: MakeStylesStyleFunctionRule<Theme> = theme => ({
  fontFamily: theme.fontFamilyBase,
  fontSize: theme.fontSizeBase300,
  lineHeight: theme.lineHeightBase300,
  fontWeight: theme.fontWeightRegular,
});
export const subheadline: MakeStylesStyleFunctionRule<Theme> = theme => ({
  fontFamily: theme.fontFamilyBase,
  fontSize: theme.fontSizeBase400,
  lineHeight: theme.lineHeightBase400,
  fontWeight: theme.fontWeightSemibold,
});
export const headline: MakeStylesStyleFunctionRule<Theme> = theme => ({
  fontFamily: theme.fontFamilyBase,
  fontSize: theme.fontSizeBase500,
  lineHeight: theme.lineHeightBase500,
  fontWeight: theme.fontWeightSemibold,
});
export const title3: MakeStylesStyleFunctionRule<Theme> = theme => ({
  fontFamily: theme.fontFamilyBase,
  fontSize: theme.fontSizeBase600,
  lineHeight: theme.lineHeightBase600,
  fontWeight: theme.fontWeightSemibold,
});
export const title2: MakeStylesStyleFunctionRule<Theme> = theme => ({
  fontFamily: theme.fontFamilyBase,
  fontSize: theme.fontSizeHero700,
  lineHeight: theme.lineHeightHero700,
  fontWeight: theme.fontWeightSemibold,
});
export const title1: MakeStylesStyleFunctionRule<Theme> = theme => ({
  fontFamily: theme.fontFamilyBase,
  fontSize: theme.fontSizeHero800,
  lineHeight: theme.lineHeightHero800,
  fontWeight: theme.fontWeightSemibold,
});
export const largeTitle: MakeStylesStyleFunctionRule<Theme> = theme => ({
  fontFamily: theme.fontFamilyBase,
  fontSize: theme.fontSizeHero900,
  lineHeight: theme.lineHeightHero900,
  fontWeight: theme.fontWeightSemibold,
});
export const display: MakeStylesStyleFunctionRule<Theme> = theme => ({
  fontFamily: theme.fontFamilyBase,
  fontSize: theme.fontSizeHero1000,
  lineHeight: theme.lineHeightHero1000,
  fontWeight: theme.fontWeightSemibold,
});
