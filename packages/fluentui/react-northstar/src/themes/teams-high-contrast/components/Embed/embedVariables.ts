import { EmbedVariables } from '../../../teams/components/Embed/embedVariables';

export const embedVariables = (siteVariables: any): Partial<EmbedVariables> => {
  return {
    controlColor: siteVariables.bodyColor,
    controlBackgroundColor: siteVariables.bodyBackground,
  };
};
