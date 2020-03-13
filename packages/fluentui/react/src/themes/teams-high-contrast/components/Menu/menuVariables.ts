import { MenuVariables, menuColorAreas } from '../../../teams/components/Menu/menuVariables';
import { extendColorScheme, pickValuesFromColorScheme } from '../../../colorUtils';

export default (siteVars: any): Partial<MenuVariables> => ({
  colorScheme: pickValuesFromColorScheme(
    extendColorScheme(siteVars.colorScheme, {
      default: {
        backgroundActive: siteVars.colorScheme.default.backgroundActive1,
        backgroundFocus: siteVars.colorScheme.default.backgroundFocus1,
        foregroundDisabled: siteVars.colorScheme.default.foregroundDisabled1
      },
      brand: {
        foregroundActive: siteVars.colors.black,
        foregroundDisabled: siteVars.colorScheme.brand.foregroundDisabled1
      }
    }),
    menuColorAreas
  ),
  color: siteVars.colors.white,
  colorActive: siteVars.colors.black,
  colorFocus: siteVars.colors.black,
  backgroundColorFocus: siteVars.accessibleCyan,
  backgroundColorActive: siteVars.accessibleCyan,
  primaryBorderColor: siteVars.colors.white,
  activeUnderlinedColor: siteVars.colors.white,
  activeUnderlinedBorderBottomColor: siteVars.colors.white,
  activeUnderlinedWrapperColor: siteVars.colors.white,
  pointingIndicatorBackgroundColor: 'transparent',

  verticalBackgroundColor: siteVars.colors.black,
  verticalBackgroundColorFocus: siteVars.accessibleCyan,
  iconOnlyColorActive: siteVars.colors.black,
  iconOnlyColorFocus: 'transparent',
  iconOnlyColorHover: siteVars.colors.black,
  iconOnlyWrapperBackgroundColorFocus: siteVars.accessibleCyan,
  activeIconOnlyWrapperBackgroundColor: siteVars.accessibleCyan,

  wrapperColorActive: siteVars.colors.black,
  wrapperBackgroundColorFocus: siteVars.accessibleCyan,
  wrapperColorFocus: siteVars.colors.black,
  wrapperColorHover: siteVars.colors.black,

  primaryWrapperColorFocus: siteVars.colors.black,
  primaryWrapperBackgroundColorFocus: siteVars.accessibleCyan,
  underlinedColorHover: siteVars.colors.white,

  indicatorColor: siteVars.colors.black
});
