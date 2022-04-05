import { pxToRem } from '../../../../utils';

export interface InputLabelVariables {
  insideLabelBottom: string;
  insideLabelPaddingLeft: string;
  insideLabelActiveFontSize: string;
  inlineLabelPaddingRight: string;
  lineHeight: string;
  marginBottom: string;
}

export const inputLabelVariables = (siteVars): InputLabelVariables => ({
  insideLabelBottom: pxToRem(-8),
  insideLabelPaddingLeft: pxToRem(12),
  insideLabelActiveFontSize: pxToRem(12),
  inlineLabelPaddingRight: pxToRem(10),
  lineHeight: pxToRem(16),
  marginBottom: pxToRem(4),
});
