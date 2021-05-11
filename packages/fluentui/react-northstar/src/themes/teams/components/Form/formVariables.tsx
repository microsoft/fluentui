import { pxToRem } from '../../../../utils';

export interface FormVariables {
  lastChildMarginTop: string;
  fieldsMarginBottom: string;
}

export const formVariables = (siteVariables: any): FormVariables => ({
  lastChildMarginTop: pxToRem(12),
  fieldsMarginBottom: pxToRem(20),
});
