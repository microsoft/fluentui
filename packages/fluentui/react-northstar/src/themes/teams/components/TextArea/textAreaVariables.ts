import { pxToRem } from '../../../../utils';

export interface TextAreaVariables {
  backgroundColor: string;
  invertedBackgroundColor: string;
  disabledBackgroundColor: string;
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
}

export const textAreaVariables = (siteVars): TextAreaVariables => ({
  margin: '0',
  padding: `${pxToRem(7)} ${pxToRem(12)}`,

  borderColor: 'transparent',
  borderRadius: `${pxToRem(3)} ${pxToRem(3)} ${pxToRem(2)} ${pxToRem(2)}`,
  borderWidth: `0 0 ${pxToRem(2)} 0`,

  backgroundColor: siteVars.colorScheme.default.background2,
  invertedBackgroundColor: siteVars.colorScheme.default.background,
  placeholderColor: siteVars.colorScheme.default.foreground1,

  disabledBackgroundColor: siteVars.colorScheme.default.backgroundColorDisabled,
  disabledColor: siteVars.colorScheme.default.colorDisabled,

  fontColor: siteVars.colorScheme.default.foreground,
  fontSize: siteVars.fontSizes.medium,

  borderColorFocus: `transparent transparent ${siteVars.colorScheme.brand.borderFocus1} transparent`,

  height: 'auto',
});
