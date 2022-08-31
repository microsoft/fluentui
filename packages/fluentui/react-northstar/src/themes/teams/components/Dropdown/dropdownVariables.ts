import { pxToRem } from '../../../../utils';

export interface DropdownVariables {
  backgroundColor: string;
  backgroundColorHover: string;
  invertedBackgroundColor: string;
  invertedBackgroundColorHover: string;
  borderColor: string;
  borderColorHover: string;
  borderColorFocus: string;
  borderError: string;
  borderWidth: string;
  openBorderColorHover: string;
  containerBorderRadius: string;
  disabledColor: string;
  openAboveContainerBorderRadius: string;
  openBelowContainerBorderRadius: string;
  searchBorderBottomWidth: string;
  color: string;
  comboboxPaddingButton: string;
  comboboxFlexBasis: string;
  aboveListBorderRadius: string;
  belowListBorderRadius: string;
  listBackgroundColor: string;
  listBorderColor: string;
  listBorderWidth: string;
  listPadding: string;
  listBoxShadow: string;
  listMaxHeight: string;
  listItemFocusBorderWidth: string;
  listItemBackgroundColor: string;
  listItemBackgroundColorActive: string;
  listItemBackgroundColorHover: string;
  listItemColorActive: string;
  listItemColorHover: string;
  listItemSelectedColor: string;
  listItemSelectedFontWeight: number;
  listItemHeaderLineHeight: string;
  listItemContentLineHeight: string;
  selectedItemBackgroundColor: string;
  selectedItemBackgroundColorHover: string;
  selectedItemBorder: string;
  selectedItemColor: string;
  selectedItemColorHover: string;
  selectedItemIconColor: string;
  selectedItemIconColorHover: string;
  selectedItemColorFocus: string;
  selectedItemsMaxHeight: string;
  selectedItemsMaxWidth: string;
  toggleIndicatorSize: string;
  triggerButtonColorFocusActive: string;
  triggerButtonColorHover: string;
  width: string;
  overlayZIndex: number;
  disabledBorderColorHover: string;
  disabledTriggerColorHover: string;
  disabledBackgroundColorHover: string;

  listItemHeaderFontSize: string;
  listItemHeaderColor: string;
  listItemContentFontSize: string;
  listItemContentColor: string;
}

export const dropdownVariables = (siteVars): DropdownVariables => ({
  backgroundColor: siteVars.colorScheme.default.background2,
  backgroundColorHover: siteVars.colorScheme.default.backgroundHover3,
  invertedBackgroundColor: siteVars.colorScheme.default.background,
  invertedBackgroundColorHover: siteVars.colorScheme.default.backgroundHover4,
  borderColor: 'transparent',
  borderColorHover: 'transparent',
  borderColorFocus: siteVars.colorScheme.brand.borderFocus1,
  borderError: siteVars.colorScheme.red.background,
  borderWidth: '0px',
  openBorderColorHover: undefined,
  containerBorderRadius: siteVars.borderRadiusMedium,
  disabledColor: siteVars.colorScheme.default.foregroundDisabled,
  openAboveContainerBorderRadius: `0 0 ${siteVars.borderRadiusMedium} ${siteVars.borderRadiusMedium}`,
  openBelowContainerBorderRadius: `${siteVars.borderRadiusMedium} ${siteVars.borderRadiusMedium} 0 0`,
  searchBorderBottomWidth: pxToRem(2),
  color: siteVars.colorScheme.default.foreground1,
  comboboxPaddingButton: `0 ${pxToRem(12)}`,
  comboboxFlexBasis: pxToRem(50),
  aboveListBorderRadius: `${siteVars.borderRadiusMedium} ${siteVars.borderRadiusMedium} 0 0`,
  belowListBorderRadius: `0 0 ${siteVars.borderRadiusMedium} ${siteVars.borderRadiusMedium}`,
  listBackgroundColor: siteVars.colorScheme.default.background,
  listBorderColor: 'transparent',
  listBorderWidth: pxToRem(1),
  listPadding: `${pxToRem(8)} 0 ${pxToRem(6)}`,
  listBoxShadow: siteVars.shadow16,
  listMaxHeight: pxToRem(296),
  listItemFocusBorderWidth: pxToRem(1),
  listItemBackgroundColor: 'transparent',
  listItemBackgroundColorActive: siteVars.colorScheme.default.backgroundActive,
  listItemBackgroundColorHover: siteVars.colorScheme.default.backgroundHover,
  listItemColorActive: siteVars.colorScheme.default.backgroundFocus3,
  listItemColorHover: siteVars.colorScheme.default.foregroundHover,
  listItemSelectedColor: siteVars.colorScheme.default.foreground,
  listItemSelectedFontWeight: siteVars.fontWeightSemibold,
  // TODO: prod app uses 17.5px here, it should be 16px per the design guide!
  listItemHeaderLineHeight: siteVars.lineHeightSmall,
  listItemContentLineHeight: siteVars.lineHeightSmall,
  selectedItemBackgroundColor: siteVars.colorScheme.default.background,
  selectedItemBackgroundColorHover: siteVars.colorScheme.brand.backgroundHover2,
  selectedItemBorder: 'none',
  selectedItemColor: siteVars.colorScheme.default.foreground,
  selectedItemColorHover: siteVars.colorScheme.default.foregroundHover,
  selectedItemIconColor: siteVars.colorScheme.default.foreground1,
  selectedItemIconColorHover: siteVars.colorScheme.brand.foregroundHover,
  selectedItemsMaxWidth: pxToRem(140),
  selectedItemColorFocus: siteVars.bodyColor,

  selectedItemsMaxHeight: pxToRem(82),
  toggleIndicatorSize: pxToRem(32),
  triggerButtonColorFocusActive: undefined,
  triggerButtonColorHover: siteVars.bodyColor,
  width: pxToRem(356),
  overlayZIndex: siteVars.zIndexes.overlay,
  // disabled state
  disabledBorderColorHover: 'transparent',
  disabledTriggerColorHover: siteVars.colorScheme.brand.foregroundDisabled,
  disabledBackgroundColorHover: siteVars.colorScheme.brand.backgroundDisabled,

  // these should only apply when there is content in the image/media slot:
  listItemHeaderFontSize: siteVars.fontSizes.medium,
  listItemHeaderColor: siteVars.colorScheme.default.foreground1,
  listItemContentFontSize: siteVars.fontSizes.small,
  listItemContentColor: siteVars.colorScheme.default.foreground2,
});
