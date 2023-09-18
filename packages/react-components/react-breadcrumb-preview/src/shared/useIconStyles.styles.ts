import { makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

/**
 * CSS variable names used internally for styling in the Breadcrumb.
 */
export const breadcrumbCSSVars = {
  breadcrumbIconSizeVar: '--fui-Breadcrumb--icon-size',
  breadcrumbIconLineHeightVar: '--fui-Breadcrumb--icon-line-height',
};

export const useIconStyles = makeStyles({
  base: {
    fontSize: `var(${breadcrumbCSSVars.breadcrumbIconSizeVar})`,
    height: `var(${breadcrumbCSSVars.breadcrumbIconSizeVar})`,
    lineHeight: `var(${breadcrumbCSSVars.breadcrumbIconLineHeightVar})`,
    width: `var(${breadcrumbCSSVars.breadcrumbIconSizeVar})`,
    marginRight: tokens.spacingHorizontalXS,
  },
  small: {
    [breadcrumbCSSVars.breadcrumbIconSizeVar]: '12px',
    [breadcrumbCSSVars.breadcrumbIconLineHeightVar]: tokens.lineHeightBase200,
  },
  medium: {
    [breadcrumbCSSVars.breadcrumbIconSizeVar]: '16px',
    [breadcrumbCSSVars.breadcrumbIconLineHeightVar]: tokens.lineHeightBase400,
  },
  large: {
    [breadcrumbCSSVars.breadcrumbIconSizeVar]: '20px',
    [breadcrumbCSSVars.breadcrumbIconLineHeightVar]: tokens.lineHeightBase600,
  },
});
