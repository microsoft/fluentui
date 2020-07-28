import { DialogVariables } from '../../../teams/components/Dialog/dialogVariables';

export const dialogVariables = (siteVars: any): Partial<DialogVariables> => {
  return {
    rootBackground: siteVars.colors.grey[650],
    foregroundColor: siteVars.colors.white,
  };
};
