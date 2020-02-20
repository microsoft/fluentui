import { CheckboxVariables } from '../../../teams/components/Checkbox/checkboxVariables'

export default (siteVars: any): Partial<CheckboxVariables> => {
  return {
    borderColorHover: siteVars.accessibleYellow,
    disabledToggleIndicatorColor: siteVars.accessibleGreen,
  }
}
