import { SplitButtonVariables } from '../../../teams/components/SplitButton/splitButtonVariables';

export const splitButtonVariables = (siteVars: any): Partial<SplitButtonVariables> => {
  return {
    toggleButtonPrimaryBorderColor: siteVars.colors.grey[800],
  };
};
