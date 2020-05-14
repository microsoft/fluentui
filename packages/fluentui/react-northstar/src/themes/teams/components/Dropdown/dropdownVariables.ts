import { pxToRem } from '../../../../utils';

export interface DropdownVariables {
  backgroundColor: string;
  backgroundColorHover: string;
  borderColor: string;
  openBorderColorHover: string;
  borderColorFocus: string;
  borderColorHover: string;
  borderWidth: string;
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
  listItemHeaderFontSize: string;
  listItemHeaderColor: string;
  listItemContentFontSize: string;
  listItemContentColor: string;
  listItemBackgroundColor: string;
  listItemColorHover: string;
  listItemBackgroundColorHover: string;
  listItemBackgroundColorActive: string;
  listItemColorActive: string;
  listItemSelectedFontWeight: number;
  listItemSelectedColor: string;
  listItemHeaderLineHeight: string;
  listItemContentLineHeight: string;
  selectedItemColor: string;
  selectedItemBackgroundColor: string;
  selectedItemColorFocus: string;
  selectedItemBackgroundColorFocus: string;
  selectedItemsMaxHeight: string;
  toggleIndicatorSize: string;
  triggerButtonColorFocusActive: string;
  triggerButtonColorHover: string;
  width: string;
  overlayZIndex: number;
  disabledBorderColorHover: string;
  disabledTriggerColorHover: string;
  disabledBackgroundColorHover: string;
  headerMessageBackgroundColor: string;
  noResultsMessageBackgroundColor: string;
  loadingMessageBackgroundColor: string;
}

const [cornerRadius, _12px_asRem] = [3, 12].map(v => pxToRem(v));

export default (siteVars): DropdownVariables => ({
  backgroundColor: siteVars.colors.grey[100],
  backgroundColorHover: siteVars.colors.grey[150],
  borderColor: 'transparent',
  borderColorFocus: siteVars.colors.brand[600],
  openBorderColorHover: undefined,
  borderColorHover: undefined,
  borderWidth: '0px',
  containerBorderRadius: `${cornerRadius}`,
  disabledColor: siteVars.colors.grey[250],
  openAboveContainerBorderRadius: `0 0 ${cornerRadius} ${cornerRadius}`,
  openBelowContainerBorderRadius: `${cornerRadius} ${cornerRadius} 0 0`,
  searchBorderBottomWidth: pxToRem(2),
  color: siteVars.bodyColor,
  selectedItemColor: siteVars.bodyColor,
  comboboxPaddingButton: `0 ${_12px_asRem}`,
  comboboxFlexBasis: pxToRem(50),
  aboveListBorderRadius: `${cornerRadius} ${cornerRadius} 0 0`,
  belowListBorderRadius: `0 0 ${cornerRadius} ${cornerRadius}`,
  listBackgroundColor: siteVars.colors.white,
  listBorderColor: 'transparent',
  listBorderWidth: '0px',
  listPadding: `${pxToRem(8)} 0 ${pxToRem(6)}`,
  listBoxShadow: siteVars.shadowLevel3,
  listMaxHeight: pxToRem(296),
  listItemFocusBorderWidth: pxToRem(1),
  listItemBackgroundColor: siteVars.colors.white,
  listItemColorHover: siteVars.colors.grey[750],
  listItemBackgroundColorHover: siteVars.colors.grey[100],
  listItemBackgroundColorActive: siteVars.colors.grey[100],
  listItemColorActive: siteVars.colors.grey[750],
  listItemSelectedFontWeight: siteVars.fontWeightSemibold,
  listItemSelectedColor: siteVars.colors.grey[750],
  // TODO: prod app uses 17.5px here, it should be 16px per the design guide!
  listItemHeaderLineHeight: siteVars.lineHeightSmall,
  listItemContentLineHeight: siteVars.lineHeightSmall,
  selectedItemBackgroundColor: 'undefined',
  selectedItemColorFocus: siteVars.bodyColor,
  selectedItemBackgroundColorFocus: siteVars.colors.brand[200],
  selectedItemsMaxHeight: pxToRem(82),
  toggleIndicatorSize: pxToRem(32),
  triggerButtonColorFocusActive: undefined,
  triggerButtonColorHover: siteVars.bodyColor,
  width: pxToRem(356),
  overlayZIndex: siteVars.zIndexes.overlay,
  // disabled state
  disabledBorderColorHover: 'transparent',
  disabledTriggerColorHover: siteVars.bodyColor,
  disabledBackgroundColorHover: siteVars.colors.grey[100],

  // these should only apply when there is content in the image/media slot:
  listItemHeaderFontSize: siteVars.fontSizes.medium,
  listItemHeaderColor: siteVars.colors.grey[1000],
  listItemContentFontSize: siteVars.fontSizes.small,
  listItemContentColor: siteVars.colorScheme.default.foreground2,
  headerMessageBackgroundColor: siteVars.colors.white,
  noResultsMessageBackgroundColor: 'transparent',
  loadingMessageBackgroundColor: 'transparent',
});
