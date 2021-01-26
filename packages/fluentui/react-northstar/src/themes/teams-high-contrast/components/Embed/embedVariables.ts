import { EmbedVariables } from '../../../teams/components/Embed/embedVariables';

export const embedVariables = (siteVars: any): Partial<EmbedVariables> => {
  return {
    controlColor: siteVars.bodyColor,
    controlBackgroundColor: siteVars.bodyBackground,
  };
};
