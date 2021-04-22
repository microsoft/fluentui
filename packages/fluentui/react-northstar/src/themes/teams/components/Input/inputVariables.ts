import { pxToRem } from '../../../../utils';

export interface InputVariables {
  backgroundColor: string;
  backgroundColorInverted: string;
  borderColor: string;
  borderRadius: string;
  borderWidth: string;
  colorDisabled: string;
  fontColor: string;
  fontSize: string;
  iconColor: string;
  iconPosition: string;
  iconRight: string;
  iconLeft: string;
  inputPaddingWithIconAtStart: string;
  inputPaddingWithIconAtEnd: string;
  inputPadding: string;
  inputFocusBorderColor: string;
  inputFocusBorderRadius: string;
  inputInsideLabelPaddingTop: string;
  placeholderColor: string;
  successfulColor: string;
  borderColorError: string;
  colorError: string;
}

export const inputVariables = (siteVars): InputVariables => ({
  colorDisabled: siteVars.colorScheme.brand.foregroundDisabled,
  colorError: siteVars.colorScheme.red.foreground,
  borderColorError: siteVars.colorScheme.red.background,
  iconPosition: 'absolute',
  iconRight: pxToRem(10),
  iconLeft: pxToRem(9),

  inputPaddingWithIconAtStart: `${pxToRem(5)} ${pxToRem(12)} ${pxToRem(5)} ${pxToRem(34)}`,
  inputPaddingWithIconAtEnd: `${pxToRem(5)} ${pxToRem(35)} ${pxToRem(5)} ${pxToRem(12)}`,
  inputPadding: `${pxToRem(5)} ${pxToRem(12)}`,
  inputInsideLabelPaddingTop: pxToRem(14),

  borderColor: 'transparent',
  borderRadius: siteVars.borderRadiusMedium,
  borderWidth: `0 0 ${pxToRem(2)} 0`,
  backgroundColor: siteVars.colorScheme.default.background2,
  backgroundColorInverted: siteVars.colorScheme.default.background,

  fontColor: siteVars.colorScheme.default.foreground,
  fontSize: siteVars.fontSizes.medium,

  iconColor: siteVars.colorScheme.default.foreground,
  successfulColor: siteVars.colorScheme.green.foreground,
  inputFocusBorderColor: `transparent transparent ${siteVars.colorScheme.brand.borderFocus1} transparent`,
  inputFocusBorderRadius: `${siteVars.borderRadiusMedium} ${siteVars.borderRadiusMedium} ${siteVars.borderRadiusSmall} ${siteVars.borderRadiusSmall}`,
  placeholderColor: siteVars.colorScheme.default.foreground1,
});
