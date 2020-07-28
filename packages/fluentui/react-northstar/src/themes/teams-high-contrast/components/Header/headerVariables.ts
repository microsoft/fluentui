import { HeaderVariables } from '../../../teams/components/Header/headerVariables';

export const headerVariables = (siteVars: any): Partial<HeaderVariables> => {
  return {
    color: siteVars.colors.white,
    descriptionColor: siteVars.colors.white,
  };
};
