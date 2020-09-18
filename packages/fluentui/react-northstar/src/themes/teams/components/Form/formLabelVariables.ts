import { pxToRem } from '../../../../utils';

export interface FormLabelVariables {
  lineHeight: string;
  marginBottom: string;
}

export const formLabelVariables = (siteVariables: any): FormLabelVariables => ({
  lineHeight: pxToRem(16),
  marginBottom: pxToRem(4),
});
