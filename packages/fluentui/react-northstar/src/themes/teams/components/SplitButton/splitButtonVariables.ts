import { SiteVariablesPrepared } from '@fluentui/styles';
import { pxToRem } from '../../../../utils';

export interface SplitButtonVariables {
  borderRadius: string;
  borderColorPrimary: string;
  borderColor: string;
  borderColorDisabled: string;
  smallDimension: string;
  smallPadding: string;
  smallMinWidth: string;
  smallBoxShadow: string;
  padding: string;
  minWidth: string;
  boxShadow: string;
  dividerColor: string;
  dividerPrimaryColor: string;
  toggleButtonHeight: string;

  toggleButtonColor: string;
  toggleButtonBackgroundColor: string;
  toggleButtonBorderRadius: string;
  toggleButtonBorderColor: string;
  toggleButtonBoxShadow: string;

  toggleButtonColorHover: string;
  toggleButtonBackgroundColorHover: string;
  toggleButtonBorderColorHover: string;

  toggleButtonColorActive: string;
  toggleButtonBackgroundColorActive: string;
  toggleButtonBorderColorActive: string;

  toggleButtonBackgroundColorFocus: string;
  toggleButtonBorderColorFocus: string;
  toggleButtonColorFocus: string;

  toggleButtonPrimaryColor: string;
  toggleButtonPrimaryHoverBackgroundColor: string;
  toggleButtonPrimaryHoverColor: string;
  toggleButtonPrimaryBackgroundColor: string;
  toggleButtonPrimaryBorderColor: string;
  toggleButtonPrimaryBoxShadow: string;
  toggleButtonPrimaryBackgroundColorActive: string;
  toggleButtonPrimaryBackgroundColorFocus: string;

  toggleButtonColorDisabled: string;
  toggleButtonBackgroundColorDisabled: string;

  toggleButtonIndicatorSize: string;

  focusBorderRadius: string;
  focusBorderWidth: string;
  focusInnerBorderColor: string;
  focusOuterBorderColor: string;
  focusBorderZIndex: string;
}

export const splitButtonVariables = (siteVars: SiteVariablesPrepared): SplitButtonVariables => {
  return {
    borderRadius: siteVars.borderRadiusMedium,
    borderColor: siteVars.colorScheme.default.border,
    borderColorPrimary: siteVars.colors.brand[500],
    borderColorDisabled: siteVars.colorScheme.brand.foregroundDisabled,
    smallDimension: pxToRem(24),
    smallPadding: `0 ${pxToRem(8)}`,
    smallMinWidth: '0',
    smallBoxShadow: 'none',
    padding: `0 ${pxToRem(12)}`,
    minWidth: '0',
    boxShadow: siteVars.shadowLevel1,
    toggleButtonHeight: pxToRem(32),
    dividerColor: siteVars.colorScheme.default.border,
    dividerPrimaryColor: siteVars.colors.white,
    toggleButtonColor: siteVars.colorScheme.default.foreground,
    toggleButtonBackgroundColor: siteVars.colorScheme.default.background,
    toggleButtonBorderRadius: siteVars.borderRadiusMedium,
    toggleButtonBorderColor: siteVars.colorScheme.default.border,
    toggleButtonBoxShadow: siteVars.shadowLevel1,

    toggleButtonColorHover: siteVars.colorScheme.default.foregroundHover,
    toggleButtonBackgroundColorHover: siteVars.colorScheme.default.backgroundHover1,
    toggleButtonBorderColorHover: siteVars.colorScheme.default.borderHover,

    toggleButtonColorActive: siteVars.colorScheme.default.foregroundPressed,
    toggleButtonBackgroundColorActive: siteVars.colorScheme.default.backgroundPressed,
    toggleButtonBorderColorActive: siteVars.colorScheme.default.borderPressed,

    toggleButtonBackgroundColorFocus: undefined,
    toggleButtonBorderColorFocus: undefined,
    toggleButtonColorFocus: undefined,

    toggleButtonPrimaryHoverBackgroundColor: siteVars.colorScheme.brand.backgroundHover,
    toggleButtonPrimaryHoverColor: siteVars.colorScheme.brand.foregroundHover1,
    toggleButtonPrimaryColor: siteVars.colorScheme.brand.foreground4,
    toggleButtonPrimaryBackgroundColor: siteVars.colorScheme.brand.background,
    toggleButtonPrimaryBorderColor: 'transparent',
    toggleButtonPrimaryBoxShadow: siteVars.shadowLevel1Dark,
    toggleButtonPrimaryBackgroundColorActive: siteVars.colorScheme.brand.backgroundPressed,
    toggleButtonPrimaryBackgroundColorFocus: undefined,

    toggleButtonColorDisabled: siteVars.colorScheme.brand.foregroundDisabled,
    toggleButtonBackgroundColorDisabled: siteVars.colorScheme.default.backgroundDisabled,

    toggleButtonIndicatorSize: pxToRem(16),

    focusBorderRadius: siteVars.borderRadiusMedium,
    focusBorderWidth: siteVars.borderWidth,
    focusInnerBorderColor: siteVars.focusInnerBorderColor,
    focusOuterBorderColor: siteVars.focusOuterBorderColor,
    focusBorderZIndex: siteVars.zIndexes.foreground,
  };
};
