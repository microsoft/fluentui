import { RadioGroupItemVariables } from '../../../teams/components/RadioGroup/radioGroupItemVariables'

export default (siteVars: any): Partial<RadioGroupItemVariables> => ({
  colorDisabled: siteVars.colors.grey[450],

  textColorDefault: siteVars.colors.grey[250],
  textColorDefaultHoverFocus: siteVars.colors.white,
  textColorChecked: siteVars.colors.white,

  iconBorderColorDefaultHover: siteVars.colors.white,
  iconBorderColorChecked: siteVars.colors.brand[400],

  iconBackgroundColorChecked: siteVars.colors.brand[400],
})
