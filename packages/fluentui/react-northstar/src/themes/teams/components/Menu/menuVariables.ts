import { pxToRem, stringLiteralsArray } from '../../../../utils';
import { extendColorScheme, pickValuesFromColorScheme } from '../../../colorUtils';
import { ItemType } from '../../../types';
import { TeamsSchemeMappingWithAreas } from '../../types';

export const menuColorAreas = stringLiteralsArray(
  'border',
  'borderActive',
  'foregroundActive',
  'foregroundFocus',
  'foregroundHover',
  'backgroundHover',
  'backgroundActive',
  'backgroundFocus',
  'foregroundDisabled',
);
export type MenuColorSchemeMapping = TeamsSchemeMappingWithAreas<ItemType<typeof menuColorAreas>>;

export interface MenuVariables {
  colorScheme: MenuColorSchemeMapping;
  color: string;

  backgroundColor: string;
  backgroundColorFocus: string;
  backgroundColorHover: string;
  backgroundColorActive: string;

  borderColor: string;
  borderColorHover: string;
  borderColorActive: string;
  borderColorFocus: string;

  outlineColorFocus: string;
  colorActive: string;

  iconSize: string;
  iconOnlyBorderRadius: string;
  iconOnlyColorActive: string;
  iconOnlyColorFocus: string;
  iconOnlyBackgroundColorHover: string;
  iconOnlyColorHover: string;
  iconOnlyWrapperBackgroundColorFocus: string;

  colorFocus: string;
  colorHover: string;
  underlinedBorderColor: string;

  colorDisabled: string;
  lineHeightBase: string;
  horizontalPadding: string;

  activeUnderlinedColor: string;
  activeUnderlinedPrimaryColor: string;
  activeUnderlinedBorderBottomColor: string;
  activeUnderlinedWrapperColor: string;
  activeIconOnlyWrapperBackgroundColor: string;

  verticalBackgroundColor: string;
  verticalItemPadding: string;
  verticalBoxShadow: string;
  verticalDividerMargin: string;
  verticalItemBorderWidth: string;
  verticalItemBorderColor: string;
  verticalPointingBorderColor: string;
  verticalBackgroundColorFocus: string;
  verticalBorderColor: string;

  pointingIndicatorBackgroundColor: string;

  activeWrapperBackgroundColorHover: string;

  underlinedBottomBorderWidth: string;
  underlinedColorHover: string;
  underlinedWrapperColorHover: string;
  underlinedWrapperBackgroundHover: string;
  primaryBorderColor: string;
  primaryWrapperColorFocus: string;
  primaryWrapperBackgroundColorFocus: string;

  dividerHeight: string;
  borderWidth: string;

  menuZIndex: number;
  beakZIndex: number;

  wrapperColorActive: string;
  wrapperColorFocus: string;
  wrapperColorHover: string;
  primaryWrapperColor: string;
  primaryWrapperColorHover: string;
  wrapperBackgroundColorFocus: string;

  activeIndicatorColor: string;
  activePrimaryIndicatorColor: string;
  activePrimaryVerticalIndicatorColor: string;
  indicatorColor: string;
  primaryIndicatorColorHover: string;
  indicatorColorHover: string;
}

export const menuVariables = (siteVars: any): MenuVariables => {
  return {
    colorScheme: pickValuesFromColorScheme(
      extendColorScheme(siteVars.colorScheme, {
        default: {
          borderActive: siteVars.colorScheme.default.border2,
          backgroundActive: siteVars.colorScheme.default.backgroundActive2,
          backgroundFocus: siteVars.colorScheme.default.backgroundFocus1,
          foregroundDisabled: siteVars.colorScheme.default.foregroundDisabled1,
        },
        brand: {
          foregroundHover: siteVars.colors.white,
          backgroundHover: siteVars.colors.brand[300],
          foregroundActive: siteVars.colors.white,
          borderActive: siteVars.colors.brand[600],
          backgroundActive: siteVars.colors.brand[500], // it's 600 in the color scheme
          foregroundFocus: siteVars.colors.white,
          backgroundFocus: siteVars.colors.brand[300],
          foregroundDisabled: siteVars.colorScheme.brand.foregroundDisabled1,
        },
      }),
      menuColorAreas,
    ),
    color: siteVars.colors.grey[500],
    colorActive: siteVars.colors.black,
    colorFocus: undefined,
    colorHover: 'inherit',
    colorDisabled: undefined,

    borderColor: undefined,
    borderColorHover: undefined,
    borderColorActive: undefined,
    borderColorFocus: siteVars.colors.white,

    outlineColorFocus: siteVars.colors.black,

    backgroundColor: undefined,
    backgroundColorFocus: undefined,
    backgroundColorHover: undefined,
    backgroundColorActive: undefined,

    iconSize: pxToRem(16),

    iconOnlyBorderRadius: siteVars.borderRadiusMedium,
    iconOnlyColorActive: siteVars.colors.brand[600],
    iconOnlyColorFocus: siteVars.colors.brand[600],
    iconOnlyWrapperBackgroundColorFocus: undefined,
    activeIconOnlyWrapperBackgroundColor: undefined,
    iconOnlyBackgroundColorHover: undefined,
    iconOnlyColorHover: siteVars.colors.brand[600],

    underlinedBorderColor: siteVars.colors.grey[200],

    lineHeightBase: siteVars.lineHeightMedium,
    horizontalPadding: `${pxToRem(14)} ${pxToRem(18)}`,

    verticalBackgroundColor: siteVars.colorScheme.default.background,
    verticalItemPadding: `${pxToRem(7)} ${pxToRem(12)}`,
    verticalBoxShadow: siteVars.shadow16,
    verticalDividerMargin: `${pxToRem(8)} 0`,
    verticalItemBorderWidth: pxToRem(2),
    verticalItemBorderColor: 'transparent',
    verticalPointingBorderColor: siteVars.colorScheme.brand.borderActive,
    verticalBackgroundColorFocus: undefined,
    verticalBorderColor: siteVars.colorScheme.default.borderTransparent,

    activeUnderlinedColor: undefined,
    activeUnderlinedPrimaryColor: siteVars.colors.brand[600],
    activeUnderlinedBorderBottomColor: siteVars.colors.black,
    activeUnderlinedWrapperColor: undefined,

    pointingIndicatorBackgroundColor: siteVars.colors.brand[600],

    underlinedBottomBorderWidth: pxToRem(2),
    underlinedColorHover: 'inherit',
    primaryBorderColor: siteVars.colorScheme.default.border2,
    primaryWrapperColorFocus: siteVars.colors.black,
    primaryWrapperColor: siteVars.colors.black,

    primaryWrapperBackgroundColorFocus: siteVars.colors.brand[500],

    underlinedWrapperColorHover: siteVars.colors.black,
    underlinedWrapperBackgroundHover: 'transparent',

    dividerHeight: pxToRem(1),
    borderWidth: pxToRem(1),
    menuZIndex: siteVars.zIndexes.overlay,
    beakZIndex: siteVars.zIndexes.menuItem,

    wrapperColorActive: siteVars.colors.grey[500],
    wrapperColorFocus: siteVars.colors.grey[500],
    wrapperColorHover: undefined,
    primaryWrapperColorHover: siteVars.colors.black,
    wrapperBackgroundColorFocus: siteVars.colors.grey[150],

    activeWrapperBackgroundColorHover: undefined,

    indicatorColor: siteVars.colors.grey[500],
    activeIndicatorColor: siteVars.colors.grey[750],
    activePrimaryIndicatorColor: siteVars.colors.grey[750],
    activePrimaryVerticalIndicatorColor: siteVars.colors.black,
    primaryIndicatorColorHover: siteVars.colors.black,
    indicatorColorHover: siteVars.colors.grey[500],
  };
};
