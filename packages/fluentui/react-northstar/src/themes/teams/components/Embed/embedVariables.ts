export interface EmbedVariables {
  controlColor: string;
  controlBackgroundColor: string;
  width: string;
  height: string;
  focusBorderColor: string;
  zIndex: number;
}

export const embedVariables = (siteVariables): EmbedVariables => ({
  controlColor: siteVariables.bodyBackground,
  controlBackgroundColor: 'rgba(0,0,0,.25)',

  width: undefined,
  height: undefined,
  focusBorderColor: siteVariables.colors.brand[500],
  zIndex: siteVariables.zIndexes.foreground,
});
