import { pxToRem } from '../../../../utils';

export interface InputLabelVariables {
  insideLabelBottom: string;
  insideLabelPaddingLeft: string;
  insideLabelActiveFontSize: string;
  insideLabelActivePaddingTop: string;
  inlineLabelPaddingRight: string;
  lineHeight: string;
  marginBottom: string;
  inputLabelColor: string;
}

export const inputLabelVariables = (siteVars): InputLabelVariables => ({
  insideLabelBottom: pxToRem(-8),
  insideLabelPaddingLeft: pxToRem(12),
  insideLabelActiveFontSize: siteVars.fontSizes.smaller,
  insideLabelActivePaddingTop: pxToRem(6),
  inlineLabelPaddingRight: pxToRem(10),
  lineHeight: pxToRem(16),
  marginBottom: pxToRem(4),
  inputLabelColor: siteVars.colorScheme.default.foreground2,
});
