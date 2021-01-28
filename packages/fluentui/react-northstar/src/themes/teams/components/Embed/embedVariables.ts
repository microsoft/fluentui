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

export const embedVariables = (siteVariables: any): EmbedVariables => ({
  controlColor: siteVariables.colors.white,
  controlBackgroundColor: siteVariables.colors.onyx[900],
  controlBackgroundSize: `${pxToRem(24)} ${pxToRem(24)}`,

  width: undefined,
  height: undefined,
  focusBorderColor: siteVariables.colors.brand[500],
  zIndex: siteVariables.zIndexes.foreground,
});
