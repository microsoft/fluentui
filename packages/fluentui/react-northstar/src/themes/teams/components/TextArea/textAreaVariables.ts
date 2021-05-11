import { pxToRem } from '../../../../utils';

export interface TextAreaVariables {
  backgroundColor: string;
  invertedBackgroundColor: string;
  disabledColor: string;
  borderColor: string;
  borderRadius: string;
  borderWidth: string;
  fontColor: string;
  fontSize: string;
  borderColorFocus: string;
  placeholderColor: string;
  margin: string;
  padding: string;
  height: string;
  borderColorError: string;
}

export const textAreaVariables = (siteVars): TextAreaVariables => ({
  margin: '0',
  padding: `${pxToRem(7)} ${pxToRem(12)}`,

  borderColor: 'transparent',
  borderRadius: `${siteVars.borderRadiusMedium} ${siteVars.borderRadiusMedium} ${siteVars.borderRadiusSmall} ${siteVars.borderRadiusSmall}`,
  borderWidth: `0 0 ${pxToRem(2)} 0`,

  backgroundColor: siteVars.colorScheme.default.background2,
  invertedBackgroundColor: siteVars.colorScheme.default.background,
  placeholderColor: siteVars.colorScheme.default.foreground1,

  disabledColor: siteVars.colorScheme.brand.foregroundDisabled,

  fontColor: siteVars.colorScheme.default.foreground,
  fontSize: siteVars.fontSizes.medium,

  borderColorFocus: `transparent transparent ${siteVars.colorScheme.brand.borderFocus1} transparent`,

  height: 'auto',
  borderColorError: siteVars.colorScheme.red.background,
});
