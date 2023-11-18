import { pxToRem, stringLiteralsArray } from '../../../../utils';
import { extendColorScheme, pickValuesFromColorScheme } from '../../../colorUtils';
import { ItemType } from '../../../types';
import { TeamsSchemeMappingWithAreas } from '../../types';

export const toolbarColorAreas = stringLiteralsArray(
  'foreground1',
  'background',
  'border',

  'foregroundActive',

  'foregroundHover',
  'backgroundHover',

  'foregroundDisabled1',

  // custom
  'menuItemForegroundHover',
  'menuItemBackgroundHover',
);

export type ToolbarColorSchemeMapping = TeamsSchemeMappingWithAreas<ItemType<typeof toolbarColorAreas>>;

export interface ToolbarVariables {
  colorScheme: ToolbarColorSchemeMapping;
  foreground: string;
  background: string;
  dividerBorder: string;

  foregroundHover: string;
  backgroundHover: string;

  foregroundActive: string;
  backgroundActive: string;

  foregroundDisabled: string;
  backgroundDisabled: string;

  itemHeight: string;
  itemPadding: string;
  borderWidth: string;
  borderRadius: string;
  dividerMargin: string;

  menuMaxWidth: string;
  menuPadding: string;
  menuBackground: string;
  menuBorder: string; // border color
  menuBorderWidth: string;
  menuBorderRadius: string;
  menuBoxShadow: string;

  menuItemForeground: string;
  menuItemForegroundHover: string;
  menuItemBackgroundHover: string;
  menuItemForegroundDisabled: string;
  menuItemBackgroundDisabled: string;
  menuItemPadding: string;

  menuDividerBorder: string; // border color
  menuDividerMargin: string;

  customItemHorizontalPadding: string;
  customItemVerticalPadding: string;

  overlayZIndex: number;

  lineHeightBase: string;
}

export const toolbarVariables = (siteVars: any): ToolbarVariables => ({
  colorScheme: pickValuesFromColorScheme(
    extendColorScheme(siteVars.colorScheme, {
      default: {
        foregroundHover: siteVars.colorScheme.brand.foregroundHover,
        backgroundHover: 'transparent',
        foregroundActive: siteVars.colorScheme.brand.foregroundActive,

        menuItemForegroundHover: siteVars.colorScheme.default.foregroundHover,
        menuItemBackgroundHover: siteVars.colorScheme.default.backgroundHover,
      },
    }),
    toolbarColorAreas,
  ),
  foreground: undefined,
  background: 'transparent',
  dividerBorder: undefined,

  foregroundHover: undefined,
  backgroundHover: undefined,

  foregroundActive: undefined,
  backgroundActive: 'transparent',

  foregroundDisabled: undefined,
  backgroundDisabled: 'transparent',

  itemHeight: pxToRem(32),
  itemPadding: '0',
  borderWidth: '2px',
  borderRadius: siteVars.borderRadiusMedium,
  dividerMargin: `${pxToRem(10)} ${pxToRem(4)}`,

  menuMaxWidth: pxToRem(312),
  menuPadding: `${pxToRem(8)} 0`,
  menuBackground: undefined,
  menuBorder: undefined,
  menuBorderWidth: '1px',
  menuBorderRadius: siteVars.borderRadiusMedium,
  menuBoxShadow: siteVars.shadowLevel3,

  menuItemForeground: undefined,
  menuItemForegroundHover: undefined,
  menuItemBackgroundHover: undefined,
  menuItemForegroundDisabled: undefined,
  menuItemBackgroundDisabled: 'transparent',
  menuItemPadding: `${pxToRem(5)} ${pxToRem(15)}`,

  menuDividerBorder: undefined,
  menuDividerMargin: `${pxToRem(8)} 0`,

  customItemHorizontalPadding: pxToRem(16),
  customItemVerticalPadding: pxToRem(4),

  overlayZIndex: siteVars.zIndexes.overlay,

  lineHeightBase: siteVars.lineHeightMedium,
});
