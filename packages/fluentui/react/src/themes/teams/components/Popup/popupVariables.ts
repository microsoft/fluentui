export interface PopupVariables {
  zIndex: number
  contentColor: string
  contentBackgroundColor: string
}

export default (siteVars: any): PopupVariables => ({
  zIndex: siteVars.zIndexes.overlay,
  contentColor: siteVars.colorScheme.default.foreground,
  contentBackgroundColor: siteVars.colorScheme.default.background,
})
