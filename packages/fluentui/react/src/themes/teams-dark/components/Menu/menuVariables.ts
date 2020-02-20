import { MenuVariables, menuColorAreas } from '../../../teams/components/Menu/menuVariables'
import { extendColorScheme, pickValuesFromColorScheme } from '../../../colorUtils'

export default (siteVars: any): Partial<MenuVariables> => ({
  colorScheme: pickValuesFromColorScheme(
    extendColorScheme(siteVars.colorScheme, {
      default: {
        borderActive: siteVars.colors.grey[600],
        backgroundFocus: siteVars.colors.grey[500],
        backgroundActive: siteVars.colorScheme.default.backgroundActive1,
        foregroundDisabled: siteVars.colorScheme.default.foregroundDisabled1,
      },
      brand: {
        foregroundHover: siteVars.colors.white,
        backgroundHover: siteVars.colors.brand[300],
        borderActive: siteVars.colors.brand[400],
        foregroundActive: siteVars.colors.white,
        foregroundFocus: siteVars.colors.white,
        backgroundFocus: siteVars.colors.brand[300],
        foregroundDisabled: siteVars.colorScheme.brand.foregroundDisabled1,
      },
    }),
    menuColorAreas,
  ),

  color: siteVars.colors.grey[250],
  colorActive: siteVars.colors.white,

  primaryBorderColor: siteVars.colors.grey[600],
  pointingIndicatorBackgroundColor: siteVars.colors.brand[400],

  verticalBackgroundColor: siteVars.colors.grey[600],
  verticalBackgroundColorFocus: siteVars.colors.grey[550],
  iconOnlyColorActive: siteVars.colors.brand[400],
})
