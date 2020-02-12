import { pxToRem } from '../../../../utils'

export type RadioGroupItemVariables = {
  colorDisabled: string

  textFontSize: string

  textColorDefault: string
  textColorDefaultHoverFocus: string
  textColorChecked: string

  iconBorderColorDefaultHover: string
  iconBorderColorChecked: string

  iconBackgroundColorChecked: string

  padding: string
}

export default (siteVars: any): RadioGroupItemVariables => ({
  colorDisabled: siteVars.colors.grey[250],

  textFontSize: siteVars.fontSizes.medium,

  textColorDefault: siteVars.colors.grey[500],
  textColorDefaultHoverFocus: siteVars.colors.grey[750],
  textColorChecked: siteVars.colors.grey[750],

  iconBorderColorDefaultHover: siteVars.colors.grey[750],
  iconBorderColorChecked: siteVars.colors.brand[600],

  iconBackgroundColorChecked: siteVars.colors.brand[600],

  padding: `0 ${pxToRem(4)}`,
})
