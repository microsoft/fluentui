import { SplitButtonVariables } from '../../../teams/components/SplitButton/splitButtonVariables';

export const splitButtonVariables = (siteVars: any): Partial<SplitButtonVariables> => {
  return {
    toggleButtonBorderColor: 'pink', // test
    toggleButtonPrimaryBorderColor: 'pink', // siteVars.colors.default[800],
  };
};
