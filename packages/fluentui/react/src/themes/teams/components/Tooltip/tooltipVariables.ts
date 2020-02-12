export interface TooltipVariables {
  zIndex: number
}

export default (siteVars: any): TooltipVariables => ({
  zIndex: siteVars.zIndexes.overlay,
})
