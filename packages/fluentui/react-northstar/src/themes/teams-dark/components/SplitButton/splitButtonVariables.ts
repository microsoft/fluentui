import { SplitButtonVariables } from '../../../teams/components/SplitButton/splitButtonVariables';

export const splitButtonVariables = (siteVars: any): Partial<SplitButtonVariables> => {
  return {
    toggleButtonBorderColor: 'red', // test
    toggleButtonPrimaryBorderColor: 'red', // siteVars.colors.default[800],
  };
};
