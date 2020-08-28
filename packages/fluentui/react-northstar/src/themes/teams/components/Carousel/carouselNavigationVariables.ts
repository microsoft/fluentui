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

export interface CarouselNavigationVariables {
  width: number;
  colorScheme: MenuColorSchemeMapping;
  color: string;

  backgroundColor: string;
  backgroundColorFocus: string;
  backgroundColorHover: string;
  backgroundColorActive: string;

  borderColor: string;
  borderColorActive: string;
  borderColorFocus: string;

  outlineColorFocus: string;
  colorActive: string;
  iconOnlyColorActive: string;

  lineHeightBase: string;
  horizontalPadding: string;

  verticalBackgroundColor: string;
  verticalItemPadding: string;
  verticalItemBorderWidth: string;
  verticalItemBorderColor: string;
  verticalBackgroundColorFocus: string;

  primaryBorderColor: string;

  indicatorBackgroundColor: string;
  indicatorActiveBackgroundColor: string;

  borderWidth: string;

  thumbnailWidth: number;
}

export const carouselNavigationVariables = (siteVars: any): CarouselNavigationVariables => {
  return {
    width: 300,
    colorScheme: pickValuesFromColorScheme(
      extendColorScheme(siteVars.colorScheme, {
        default: {
          borderActive: siteVars.colorScheme.default.border2,
          backgroundActive: siteVars.colorScheme.default.backgroundActive1,
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

    borderColor: undefined,
    borderColorActive: undefined,
    borderColorFocus: siteVars.colors.white,

    outlineColorFocus: siteVars.colors.black,

    backgroundColor: undefined,
    backgroundColorFocus: undefined,
    backgroundColorHover: undefined,
    backgroundColorActive: undefined,

    iconOnlyColorActive: siteVars.colors.brand[600],

    lineHeightBase: siteVars.lineHeightMedium,
    horizontalPadding: `${pxToRem(14)} ${pxToRem(18)}`,

    verticalBackgroundColor: siteVars.colors.white,
    verticalItemPadding: `${pxToRem(7)} ${pxToRem(14)}`,
    verticalItemBorderWidth: pxToRem(2),
    verticalItemBorderColor: 'transparent',
    verticalBackgroundColorFocus: siteVars.colors.grey[150],
    primaryBorderColor: siteVars.colorScheme.default.border2,

    indicatorBackgroundColor: siteVars.colors.grey[500],
    indicatorActiveBackgroundColor: siteVars.colors.brand[600],

    borderWidth: pxToRem(1),

    thumbnailWidth: 75,
  };
};
