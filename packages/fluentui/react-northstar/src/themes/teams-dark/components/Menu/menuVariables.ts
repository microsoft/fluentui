import { MenuVariables, menuColorAreas } from '../../../teams/components/Menu/menuVariables';
import { extendColorScheme, pickValuesFromColorScheme } from '../../../colorUtils';

export const menuVariables = (siteVars: any): Partial<MenuVariables> => ({
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
  borderColor: siteVars.colorScheme.default.border2,

  primaryBorderColor: siteVars.colors.grey[600],
  pointingIndicatorBackgroundColor: siteVars.colors.brand[400],

  activeUnderlinedBorderBottomColor: siteVars.colors.white,
  activeUnderlinedPrimaryColor: siteVars.colors.brand[400],

  iconOnlyColorActive: siteVars.colors.brand[400],
  iconOnlyColorFocus: siteVars.colors.brand[400],
  iconOnlyColorHover: siteVars.colors.brand[400],

  wrapperColorActive: siteVars.colors.grey[250],
  wrapperColorFocus: siteVars.colors.white,
  wrapperColorHover: siteVars.colors.white,
  primaryIndicatorColorHover: siteVars.colors.white,
  wrapperBackgroundColorFocus: siteVars.colors.brand[400],
  underlinedWrapperColorHover: siteVars.colors.white,

  primaryWrapperColorFocus: siteVars.colors.black,
  primaryWrapperColor: siteVars.colors.white,
  primaryWrapperBackgroundColorFocus: siteVars.colors.brand[400],

  indicatorColor: siteVars.colors.grey[250],
  activeIndicatorColor: siteVars.colors.white,
  activePrimaryIndicatorColor: siteVars.colors.white,
  activePrimaryVerticalIndicatorColor: siteVars.colors.white,
  indicatorColorHover: siteVars.colors.white,
});
