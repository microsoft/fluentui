import { SplitButtonVariables } from '../../../teams/components/SplitButton/splitButtonVariables';

export const splitButtonVariables = (siteVars: any): Partial<SplitButtonVariables> => {
  return {
    dividerPrimaryColor: siteVars.colors.black,
  };
};
