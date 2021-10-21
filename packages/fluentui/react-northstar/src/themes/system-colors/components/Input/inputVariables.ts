import { InputVariables } from '../../../teams/components/Input/inputVariables';
import { pxToRem } from '../../../../utils';

export const inputVariables = (siteVars: any): Partial<InputVariables> => {
  return {
    borderColor: siteVars.bodyColor,
    borderWidth: `${pxToRem(1)} ${pxToRem(1)} ${pxToRem(2)} ${pxToRem(1)}`,
    inputFocusBorderColor: `${siteVars.colors.white} ${siteVars.colors.white} ${siteVars.colorScheme.brand.borderFocus1} ${siteVars.colors.white}`,
  };
};
