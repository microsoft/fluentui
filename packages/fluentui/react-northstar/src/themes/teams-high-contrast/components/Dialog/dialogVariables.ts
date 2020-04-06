import { DialogVariables } from '../../../teams/components/Dialog/dialogVariables';

export default (siteVars: any): Partial<DialogVariables> => {
  return {
    boxShadow: 'none',
    border: `1px solid ${siteVars.colors.white}`,
    rootBackground: siteVars.colors.black,
    foregroundColor: siteVars.colors.white,
  };
};
