import { MenuVariables, menuColorAreas } from '../../../teams/components/Menu/menuVariables';
import { extendColorScheme, pickValuesFromColorScheme } from '../../../colorUtils';

export const menuVariables = (siteVars: any): Partial<MenuVariables> => ({
  colorScheme: pickValuesFromColorScheme(
    extendColorScheme(siteVars.colorScheme, {
      default: {
        backgroundActive: siteVars.colorScheme.default.backgroundActive1,
        backgroundFocus: siteVars.colorScheme.default.backgroundFocus1,
        foregroundDisabled: siteVars.colorScheme.default.foregroundDisabled1,
      },
      brand: {
        foregroundActive: siteVars.colors.black,
        foregroundDisabled: siteVars.colorScheme.brand.foregroundDisabled1,
      },
    }),
    menuColorAreas,
  ),
  color: siteVars.colors.white,
  colorActive: siteVars.colors.black,
  colorFocus: siteVars.colors.white,
  backgroundColorFocus: siteVars.accessibleCyan,
  backgroundColorActive: siteVars.accessibleCyan,
  primaryBorderColor: siteVars.colors.white,
  activeUnderlinedColor: siteVars.colors.white,
  activeUnderlinedBorderBottomColor: siteVars.colors.white,
  activeUnderlinedWrapperColor: siteVars.colors.white,
  pointingIndicatorBackgroundColor: 'transparent',

  verticalBackgroundColorFocus: undefined,
  iconOnlyColorActive: siteVars.colors.black,
  iconOnlyColorFocus: 'transparent',
  iconOnlyColorHover: siteVars.colors.black,
  iconOnlyWrapperBackgroundColorFocus: siteVars.accessibleCyan,
  activeIconOnlyWrapperBackgroundColor: siteVars.accessibleCyan,
  activeUnderlinedPrimaryColor: siteVars.colors.white,

  wrapperColorActive: siteVars.colors.black,
  wrapperBackgroundColorFocus: siteVars.accessibleCyan,
  wrapperColorFocus: siteVars.colors.black,
  primaryWrapperColorHover: siteVars.colors.black,
  wrapperColorHover: siteVars.colors.black,

  primaryWrapperColorFocus: siteVars.colors.black,
  primaryWrapperBackgroundColorFocus: siteVars.accessibleCyan,
  underlinedColorHover: siteVars.colors.white,
  underlinedWrapperColorHover: siteVars.colors.white,

  iconOnlyBackgroundColorHover: siteVars.accessibleCyan,

  indicatorColor: siteVars.colors.white,
  activeIndicatorColor: siteVars.colors.black,
  activePrimaryIndicatorColor: siteVars.colors.black,
  activePrimaryVerticalIndicatorColor: siteVars.colors.black,
  indicatorColorHover: siteVars.colors.black,
  primaryIndicatorColorHover: siteVars.colors.black,
  primaryWrapperColor: siteVars.colors.white,

  borderColorFocus: siteVars.colors.black,
  outlineColorFocus: siteVars.accessibleCyan,
});
