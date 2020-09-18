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
  headerMessageBackgroundColor: string;
  noResultsMessageBackgroundColor: string;
  loadingMessageBackgroundColor: string;
}

const [cornerRadius, _12px_asRem] = [3, 12].map(v => pxToRem(v));

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
  containerBorderRadius: `${cornerRadius}`,
  disabledColor: siteVars.colorScheme.default.foregroundDisabled,
  openAboveContainerBorderRadius: `0 0 ${cornerRadius} ${cornerRadius}`,
  openBelowContainerBorderRadius: `${cornerRadius} ${cornerRadius} 0 0`,
  searchBorderBottomWidth: pxToRem(2),
  color: siteVars.colorScheme.default.foreground1,
  comboboxPaddingButton: `0 ${_12px_asRem}`,
  comboboxFlexBasis: pxToRem(50),
  aboveListBorderRadius: `${cornerRadius} ${cornerRadius} 0 0`,
  belowListBorderRadius: `0 0 ${cornerRadius} ${cornerRadius}`,
  listBackgroundColor: siteVars.colorScheme.default.background,
  listBorderColor: 'transparent',
  listBorderWidth: '0px',
  listPadding: `${pxToRem(8)} 0 ${pxToRem(6)}`,
  listBoxShadow: siteVars.shadowLevel3,
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
  headerMessageBackgroundColor: siteVars.colors.white,
  noResultsMessageBackgroundColor: 'transparent',
  loadingMessageBackgroundColor: 'transparent',
});
