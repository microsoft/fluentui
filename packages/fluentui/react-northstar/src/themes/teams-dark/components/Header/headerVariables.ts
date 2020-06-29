import { HeaderVariables } from '../../../teams/components/Header/headerVariables';

export default (siteVars: any): Partial<HeaderVariables> => {
  return {
    color: siteVars.colors.white,
    descriptionColor: siteVars.colors.grey[250],
  };
};
