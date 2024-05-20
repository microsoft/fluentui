/* eslint-disable */

import * as React from 'react';

type CustomStyleHook = (state: unknown) => void;

// The list of hooks is built from the exports from react-components/src/index
export type CustomStyleHooksContextValue = Partial<{
  useAccordionHeaderStyles_unstable: CustomStyleHook;
  useAccordionItemStyles_unstable: CustomStyleHook;
  useAccordionPanelStyles_unstable: CustomStyleHook;
  useAccordionStyles_unstable: CustomStyleHook;
  useAvatarStyles_unstable: CustomStyleHook;
  useAvatarGroupStyles_unstable: CustomStyleHook;
  useAvatarGroupItemStyles_unstable: CustomStyleHook;
  useAvatarGroupPopoverStyles_unstable: CustomStyleHook;
  useBadgeStyles_unstable: CustomStyleHook;
  useCounterBadgeStyles_unstable: CustomStyleHook;
  useCardHeaderStyles_unstable: CustomStyleHook;
  useCardStyles_unstable: CustomStyleHook;
  useCardFooterStyles_unstable: CustomStyleHook;
  useCardPreviewStyles_unstable: CustomStyleHook;
  usePresenceBadgeStyles_unstable: CustomStyleHook;
  useButtonStyles_unstable: CustomStyleHook;
  useCompoundButtonStyles_unstable: CustomStyleHook;
  useMenuButtonStyles_unstable: CustomStyleHook;
  useSplitButtonStyles_unstable: CustomStyleHook;
  useToggleButtonStyles_unstable: CustomStyleHook;
  useCheckboxStyles_unstable: CustomStyleHook;
  useComboboxStyles_unstable: CustomStyleHook;
  useDropdownStyles_unstable: CustomStyleHook;
  useListboxStyles_unstable: CustomStyleHook;
  useListStyles_unstable: CustomStyleHook;
  useListItemStyles_unstable: CustomStyleHook;
  /* @deprecated Use onClick handler on the ListItem itself instead. */
  useListItemButtonStyles_unstable: CustomStyleHook;
  useOptionStyles_unstable: CustomStyleHook;
  useOptionGroupStyles_unstable: CustomStyleHook;
  useDividerStyles_unstable: CustomStyleHook;
  useInputStyles_unstable: CustomStyleHook;
  useImageStyles_unstable: CustomStyleHook;
  useLabelStyles_unstable: CustomStyleHook;
  useLinkStyles_unstable: CustomStyleHook;
  useMenuDividerStyles_unstable: CustomStyleHook;
  useMenuGroupHeaderStyles_unstable: CustomStyleHook;
  useMenuGroupStyles_unstable: CustomStyleHook;
  useMenuItemCheckboxStyles_unstable: CustomStyleHook;
  useMenuItemSwitchStyles_unstable: CustomStyleHook;
  useMenuItemRadioStyles_unstable: CustomStyleHook;
  useMenuItemStyles_unstable: CustomStyleHook;
  useMenuListStyles_unstable: CustomStyleHook;
  useMenuPopoverStyles_unstable: CustomStyleHook;
  useMenuSplitGroupStyles_unstable: CustomStyleHook;
  usePersonaStyles_unstable: CustomStyleHook;
  usePopoverSurfaceStyles_unstable: CustomStyleHook;
  useRadioGroupStyles_unstable: CustomStyleHook;
  useRadioStyles_unstable: CustomStyleHook;
  useSelectStyles_unstable: CustomStyleHook;
  useSliderStyles_unstable: CustomStyleHook;
  useSpinButtonStyles_unstable: CustomStyleHook;
  useSpinnerStyles_unstable: CustomStyleHook;
  useSwitchStyles_unstable: CustomStyleHook;
  useTabStyles_unstable: CustomStyleHook;
  useTabListStyles_unstable: CustomStyleHook;
  useTextStyles_unstable: CustomStyleHook;
  useTextareaStyles_unstable: CustomStyleHook;
  useTooltipStyles_unstable: CustomStyleHook;
  useDialogTitleStyles_unstable: CustomStyleHook;
  useDialogBodyStyles_unstable: CustomStyleHook;
  useDialogActionsStyles_unstable: CustomStyleHook;
  useDialogSurfaceStyles_unstable: CustomStyleHook;
  useDialogContentStyles_unstable: CustomStyleHook;
  useProgressBarStyles_unstable: CustomStyleHook;
  useToolbarButtonStyles_unstable: CustomStyleHook;
  useToolbarRadioButtonStyles_unstable: CustomStyleHook;
  useToolbarGroupStyles_unstable: CustomStyleHook;
  useToolbarToggleButtonStyles_unstable: CustomStyleHook;
  useToolbarDividerStyles_unstable: CustomStyleHook;
  useToolbarStyles_unstable: CustomStyleHook;
  useTableCellStyles_unstable: CustomStyleHook;
  useTableRowStyles_unstable: CustomStyleHook;
  useTableBodyStyles_unstable: CustomStyleHook;
  useTableStyles_unstable: CustomStyleHook;
  useTableHeaderStyles_unstable: CustomStyleHook;
  useTableHeaderCellStyles_unstable: CustomStyleHook;
  useTableResizeHandleStyles_unstable: CustomStyleHook;
  useTableSelectionCellStyles_unstable: CustomStyleHook;
  useTableCellActionsStyles_unstable: CustomStyleHook;
  useTableCellLayoutStyles_unstable: CustomStyleHook;
  useDataGridCellStyles_unstable: CustomStyleHook;
  useDataGridRowStyles_unstable: CustomStyleHook;
  useDataGridBodyStyles_unstable: CustomStyleHook;
  useDataGridStyles_unstable: CustomStyleHook;
  useDataGridHeaderStyles_unstable: CustomStyleHook;
  useDataGridHeaderCellStyles_unstable: CustomStyleHook;
  useDataGridSelectionCellStyles_unstable: CustomStyleHook;
  useDrawerStyles_unstable: CustomStyleHook;
  /** @deprecated Use useInlineDrawerStyles_unstable instead. */
  useDrawerInlineStyles_unstable: CustomStyleHook;
  /** @deprecated Use useOverlayDrawerStyles_unstable instead. */
  useDrawerOverlayStyles_unstable: CustomStyleHook;
  useInlineDrawerStyles_unstable: CustomStyleHook;
  useOverlayDrawerStyles_unstable: CustomStyleHook;
  useDrawerHeaderStyles_unstable: CustomStyleHook;
  useDrawerHeaderNavigationStyles_unstable: CustomStyleHook;
  useDrawerHeaderTitleStyles_unstable: CustomStyleHook;
  useDrawerBodyStyles_unstable: CustomStyleHook;
  useDrawerFooterStyles_unstable: CustomStyleHook;
  useInteractionTagStyles_unstable: CustomStyleHook;
  useInteractionTagPrimaryStyles_unstable: CustomStyleHook;
  useInteractionTagSecondaryStyles_unstable: CustomStyleHook;
  useTagStyles_unstable: CustomStyleHook;
  useTagGroupStyles_unstable: CustomStyleHook;
  useBreadcrumbStyles_unstable: CustomStyleHook;
  useBreadcrumbButtonStyles_unstable: CustomStyleHook;
  useBreadcrumbItemStyles_unstable: CustomStyleHook;
  useBreadcrumbDividerStyles_unstable: CustomStyleHook;
  useMessageBarStyles_unstable: CustomStyleHook;
  useMessageBarBodyStyles_unstable: CustomStyleHook;
  useMessageBarTitleStyles_unstable: CustomStyleHook;
  useMessageBarActionsStyles_unstable: CustomStyleHook;
  useMessageBarGroupStyles_unstable: CustomStyleHook;
  useToasterStyles_unstable: CustomStyleHook;
  /** @deprecated TeachingPopover wrapper has no styles (non-UI hooks only). */
  useTeachingPopoverStyles_unstable: CustomStyleHook;
  /** @deprecated Replaced by TeachingPopoverFooter / TeachingPopoverCarousel internal functionality. */
  useTeachingPopoverActionsStyles_unstable: CustomStyleHook;
  useTeachingPopoverBodyStyles_unstable: CustomStyleHook;
  /** @deprecated Replaced by TeachingPopoverFooter / TeachingPopoverCarousel styling hooks */
  useTeachingPopoverButtonStyles_unstable: CustomStyleHook;
  useTeachingPopoverCarouselStyles_unstable: CustomStyleHook;
  useTeachingPopoverHeaderStyles_unstable: CustomStyleHook;
  /** @deprecated Replaced by TeachingPopoverCarouselNav styling hooks */
  useTeachingPopoverPageCountStyles_unstable: CustomStyleHook;
  useTeachingPopoverSurfaceStyles_unstable: CustomStyleHook;
  useTeachingPopoverTitleStyles_unstable: CustomStyleHook;
  useTimePickerCompatStyles_unstable: CustomStyleHook;
  useTagPickerInputStyles_unstable: CustomStyleHook;
  useTagPickerButtonStyles_unstable: CustomStyleHook;
  useTagPickerControlStyles_unstable: CustomStyleHook;
  useTagPickerGroupStyles_unstable: CustomStyleHook;
  useTagPickerListStyles_unstable: CustomStyleHook;
  useTagPickerOptionStyles_unstable: CustomStyleHook;
  useTagPickerOptionGroupStyles_unstable: CustomStyleHook;
  useColorSwatchStyles_unstable: CustomStyleHook;
  useImageSwatchStyles_unstable: CustomStyleHook;
  useEmptySwatchStyles_unstable: CustomStyleHook;
  useSwatchPickerRowStyles_unstable: CustomStyleHook;
  useSwatchPickerStyles_unstable: CustomStyleHook;
}>;

/**
 * @internal
 */
export const CustomStyleHooksContext = React.createContext<CustomStyleHooksContextValue | undefined>(undefined);

const noop = () => {};

/**
 * @internal
 */
export const CustomStyleHooksProvider = CustomStyleHooksContext.Provider;

/**
 * Gets a custom style hook
 * @param hook - One of the hook properties in CustomStyleHooksContextValue
 * @returns The corresponding hook when defined, otherwise a no-op function.
 */
export const useCustomStyleHook = (hook: keyof CustomStyleHooksContextValue): CustomStyleHook => {
  return React.useContext(CustomStyleHooksContext)?.[hook] ?? noop;
};
