import { DialogVariables } from '../../../teams/components/Dialog/dialogVariables';

export default (siteVars: any): Partial<DialogVariables> => {
  return {
    rootBackground: siteVars.colors.grey[650],
    foregroundColor: siteVars.colors.white,
  };
};
