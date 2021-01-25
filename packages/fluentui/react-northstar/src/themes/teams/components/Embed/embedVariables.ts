import { pxToRem } from '../../../../utils';

export interface EmbedVariables {
  controlColor: string;
  controlBackgroundColor: string;
  controlBackgroundSize: string;
  width: string;
  height: string;
  focusBorderColor: string;
  zIndex: number;
}

export const embedVariables = (siteVars: any): EmbedVariables => ({
  controlColor: siteVars.colors.white,
  controlBackgroundColor: 'rgba(0, 0, 0, .25)',
  controlBackgroundSize: `${pxToRem(12)} ${pxToRem(12)}`,

  width: undefined,
  height: undefined,
  focusBorderColor: siteVars.colors.brand[500],
  zIndex: siteVars.zIndexes.foreground,
});
