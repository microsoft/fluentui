import { EmbedVariables } from '../../../teams/components/Embed/embedVariables';
// import { pxToRem } from '../../../../utils';

export const embedVariables = (siteVars: any): Partial<EmbedVariables> => {
  return {
    controlColor: `${siteVars.bodyColor}`,
    controlBackgroundColor: siteVars.bodyBackground,
    // controlBackgroundSize: `${pxToRem(12)} ${pxToRem(12)}`,
  };
};
