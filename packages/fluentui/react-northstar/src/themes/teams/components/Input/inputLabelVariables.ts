import { pxToRem } from '../../../../utils';

export interface InputLabelVariables {
  insideLabelBottom: string;
  insideLabelPaddingLeft: string;
  insideLabelActiveFontSize: string;
  inlineLabelPaddingRight: string;
}

export const inputLabelVariables = (siteVars): InputLabelVariables => ({
  insideLabelBottom: pxToRem(-8),
  insideLabelPaddingLeft: pxToRem(12),
  insideLabelActiveFontSize: pxToRem(12),
  inlineLabelPaddingRight: pxToRem(10),
});
