'use client';

import * as React from 'react';

/**
 * A consumer-supplied styles hook that participates in a component's style composition.
 *
 * D14 (state-mutation removal) redesigned this contract to a functional one: a custom hook
 * SHOULD return the state it wants the component to render. The `| void` arm is deliberate
 * dual-shape tolerance, not an oversight — the pre-D14 contract was `(state) => void` and
 * consumers implemented it by mutating the state object they were handed. Those hooks keep
 * working unchanged: `useCustomStyleHook` normalizes `undefined` back to the input state, so
 * a void-returning consumer hook still gets its mutations rendered. New consumer hooks
 * should return a new state object instead of mutating the argument.
 */
type CustomStyleHook<TState = unknown> = (state: TState) => TState | void;

/* eslint-disable @typescript-eslint/naming-convention */
// The list of hooks is built from the exports from react-components/src/index
export type CustomStyleHooksContextValue = Partial<{
  useAccordionHeaderStyles_unstable: CustomStyleHook;
  useAccordionItemStyles_unstable: CustomStyleHook;
  useAccordionPanelStyles_unstable: CustomStyleHook;
  useAccordionStyles_unstable: CustomStyleHook;
  useAlphaSliderStyles_unstable: CustomStyleHook;
  useAvatarGroupItemStyles_unstable: CustomStyleHook;
  useAvatarGroupPopoverStyles_unstable: CustomStyleHook;
  useAvatarGroupStyles_unstable: CustomStyleHook;
  useAvatarStyles_unstable: CustomStyleHook;
  useBadgeStyles_unstable: CustomStyleHook;
  useBreadcrumbButtonStyles_unstable: CustomStyleHook;
  useBreadcrumbDividerStyles_unstable: CustomStyleHook;
  useBreadcrumbItemStyles_unstable: CustomStyleHook;
  useBreadcrumbStyles_unstable: CustomStyleHook;
  useButtonStyles_unstable: CustomStyleHook;
  useCardFooterStyles_unstable: CustomStyleHook;
  useCardHeaderStyles_unstable: CustomStyleHook;
  useCardPreviewStyles_unstable: CustomStyleHook;
  useCardStyles_unstable: CustomStyleHook;
  useCarouselAutoplayButtonStyles_unstable: CustomStyleHook;
  useCarouselButtonStyles_unstable: CustomStyleHook;
  useCarouselCardStyles_unstable: CustomStyleHook;
  useCarouselNavButtonStyles_unstable: CustomStyleHook;
  useCarouselNavContainerStyles_unstable: CustomStyleHook;
  useCarouselNavImageButtonStyles_unstable: CustomStyleHook;
  useCarouselNavStyles_unstable: CustomStyleHook;
  useCarouselSliderStyles_unstable: CustomStyleHook;
  useCarouselStyles_unstable: CustomStyleHook;
  useCarouselViewportStyles_unstable: CustomStyleHook;
  useCheckboxStyles_unstable: CustomStyleHook;
  useComboboxStyles_unstable: CustomStyleHook;
  useCompoundButtonStyles_unstable: CustomStyleHook;
  useColorAreaStyles_unstable: CustomStyleHook;
  useColorPickerStyles_unstable: CustomStyleHook;
  useColorSliderStyles_unstable: CustomStyleHook;
  useColorSwatchStyles_unstable: CustomStyleHook;
  useCounterBadgeStyles_unstable: CustomStyleHook;
  useDataGridBodyStyles_unstable: CustomStyleHook;
  useDataGridCellStyles_unstable: CustomStyleHook;
  useDataGridHeaderCellStyles_unstable: CustomStyleHook;
  useDataGridHeaderStyles_unstable: CustomStyleHook;
  useDataGridRowStyles_unstable: CustomStyleHook;
  useDataGridSelectionCellStyles_unstable: CustomStyleHook;
  useDataGridStyles_unstable: CustomStyleHook;
  useDialogActionsStyles_unstable: CustomStyleHook;
  useDialogBodyStyles_unstable: CustomStyleHook;
  useDialogContentStyles_unstable: CustomStyleHook;
  useDialogSurfaceStyles_unstable: CustomStyleHook;
  useDialogTitleStyles_unstable: CustomStyleHook;
  useDividerStyles_unstable: CustomStyleHook;
  useDrawerBodyStyles_unstable: CustomStyleHook;
  useDrawerFooterStyles_unstable: CustomStyleHook;
  useDrawerHeaderNavigationStyles_unstable: CustomStyleHook;
  useDrawerHeaderStyles_unstable: CustomStyleHook;
  useDrawerHeaderTitleStyles_unstable: CustomStyleHook;
  /** @deprecated Use useInlineDrawerStyles_unstable instead. */
  useDrawerInlineStyles_unstable: CustomStyleHook;
  /** @deprecated Use useOverlayDrawerStyles_unstable instead. */
  useDrawerOverlayStyles_unstable: CustomStyleHook;
  useOverlayDrawerSurfaceStyles_unstable: CustomStyleHook;
  useDrawerStyles_unstable: CustomStyleHook;
  useDropdownStyles_unstable: CustomStyleHook;
  useEmptySwatchStyles_unstable: CustomStyleHook;
  useFieldStyles_unstable: CustomStyleHook;
  useFlatTreeStyles_unstable: CustomStyleHook;
  useImageStyles_unstable: CustomStyleHook;
  useImageSwatchStyles_unstable: CustomStyleHook;
  useInfoButtonStyles_unstable: CustomStyleHook;
  useInfoLabelStyles_unstable: CustomStyleHook;
  useInlineDrawerStyles_unstable: CustomStyleHook;
  useInputStyles_unstable: CustomStyleHook;
  useInteractionTagPrimaryStyles_unstable: CustomStyleHook;
  useInteractionTagSecondaryStyles_unstable: CustomStyleHook;
  useInteractionTagStyles_unstable: CustomStyleHook;
  useLabelStyles_unstable: CustomStyleHook;
  useLinkStyles_unstable: CustomStyleHook;
  /** @deprecated Use onClick handler on the ListItem itself instead. */
  useListItemButtonStyles_unstable: CustomStyleHook;
  useListItemStyles_unstable: CustomStyleHook;
  useListStyles_unstable: CustomStyleHook;
  useListboxStyles_unstable: CustomStyleHook;
  useMenuButtonStyles_unstable: CustomStyleHook;
  useMenuDividerStyles_unstable: CustomStyleHook;
  useMenuGroupHeaderStyles_unstable: CustomStyleHook;
  useMenuGroupStyles_unstable: CustomStyleHook;
  useMenuItemCheckboxStyles_unstable: CustomStyleHook;
  useMenuItemLinkStyles_unstable: CustomStyleHook;
  useMenuItemRadioStyles_unstable: CustomStyleHook;
  useMenuItemStyles_unstable: CustomStyleHook;
  useMenuItemSwitchStyles_unstable: CustomStyleHook;
  useMenuListStyles_unstable: CustomStyleHook;
  useMenuPopoverStyles_unstable: CustomStyleHook;
  useMenuSplitGroupStyles_unstable: CustomStyleHook;
  useMessageBarActionsStyles_unstable: CustomStyleHook;
  useMessageBarBodyStyles_unstable: CustomStyleHook;
  useMessageBarGroupStyles_unstable: CustomStyleHook;
  useMessageBarStyles_unstable: CustomStyleHook;
  useMessageBarTitleStyles_unstable: CustomStyleHook;
  useAppItemStyles_unstable: CustomStyleHook;
  useAppItemStaticStyles_unstable: CustomStyleHook;
  useHamburgerStyles_unstable: CustomStyleHook;
  useNavCategoryItemStyles: CustomStyleHook;
  useNavDividerStyles_unstable: CustomStyleHook;
  useNavDrawerStyles_unstable: CustomStyleHook;
  useNavDrawerBodyStyles_unstable: CustomStyleHook;
  useNavDrawerFooterStyles_unstable: CustomStyleHook;
  useNavDrawerHeaderStyles_unstable: CustomStyleHook;
  useNavItemStyles_unstable: CustomStyleHook;
  useNavSectionHeaderStyles_unstable: CustomStyleHook;
  useNavSubItemStyles_unstable: CustomStyleHook;
  useNavSubItemGroupStyles_unstable: CustomStyleHook;
  useSplitNavItemStyles_unstable: CustomStyleHook;
  useOptionGroupStyles_unstable: CustomStyleHook;
  useOptionStyles_unstable: CustomStyleHook;
  useOverlayDrawerStyles_unstable: CustomStyleHook;
  usePersonaStyles_unstable: CustomStyleHook;
  usePopoverSurfaceStyles_unstable: CustomStyleHook;
  usePresenceBadgeStyles_unstable: CustomStyleHook;
  useProgressBarStyles_unstable: CustomStyleHook;
  useRadioGroupStyles_unstable: CustomStyleHook;
  useRadioStyles_unstable: CustomStyleHook;
  useRatingDisplayStyles_unstable: CustomStyleHook;
  useRatingItemStyles_unstable: CustomStyleHook;
  useRatingStyles_unstable: CustomStyleHook;
  useSearchBoxStyles_unstable: CustomStyleHook;
  useSelectStyles_unstable: CustomStyleHook;
  useSkeletonItemStyles_unstable: CustomStyleHook;
  useSkeletonStyles_unstable: CustomStyleHook;
  useSliderStyles_unstable: CustomStyleHook;
  useSpinButtonStyles_unstable: CustomStyleHook;
  useSpinnerStyles_unstable: CustomStyleHook;
  useSplitButtonStyles_unstable: CustomStyleHook;
  useSwatchPickerRowStyles_unstable: CustomStyleHook;
  useSwatchPickerStyles_unstable: CustomStyleHook;
  useSwitchStyles_unstable: CustomStyleHook;
  useTabListStyles_unstable: CustomStyleHook;
  useTabStyles_unstable: CustomStyleHook;
  useTeachingPopoverBodyStyles_unstable: CustomStyleHook;
  useTeachingPopoverCarouselCardStyles_unstable: CustomStyleHook;
  useTeachingPopoverCarouselFooterButtonStyles_unstable: CustomStyleHook;
  useTeachingPopoverCarouselFooterStyles_unstable: CustomStyleHook;
  useTeachingPopoverCarouselNavButtonStyles_unstable: CustomStyleHook;
  useTeachingPopoverCarouselNavStyles_unstable: CustomStyleHook;
  useTeachingPopoverCarouselPageCountStyles_unstable: CustomStyleHook;
  useTeachingPopoverCarouselStyles_unstable: CustomStyleHook;
  useTeachingPopoverFooterStyles_unstable: CustomStyleHook;
  useTeachingPopoverHeaderStyles_unstable: CustomStyleHook;
  /** @deprecated Replaced by TeachingPopoverFooter / TeachingPopoverCarousel internal functionality. */
  useTeachingPopoverActionsStyles_unstable: CustomStyleHook;
  /** @deprecated Replaced by TeachingPopoverFooter / TeachingPopoverCarousel styling hooks */
  useTeachingPopoverButtonStyles_unstable: CustomStyleHook;
  /** @deprecated TeachingPopover wrapper has no styles (non-UI hooks only). */
  useTeachingPopoverStyles_unstable: CustomStyleHook;
  /** @deprecated Replaced by TeachingPopoverCarouselNav styling hooks */
  useTeachingPopoverPageCountStyles_unstable: CustomStyleHook;
  useTeachingPopoverSurfaceStyles_unstable: CustomStyleHook;
  useTeachingPopoverTitleStyles_unstable: CustomStyleHook;
  useTagGroupStyles_unstable: CustomStyleHook;
  useTagPickerButtonStyles_unstable: CustomStyleHook;
  useTagPickerControlStyles_unstable: CustomStyleHook;
  useTagPickerGroupStyles_unstable: CustomStyleHook;
  useTagPickerInputStyles_unstable: CustomStyleHook;
  useTagPickerListStyles_unstable: CustomStyleHook;
  useTagPickerOptionGroupStyles_unstable: CustomStyleHook;
  useTagPickerOptionStyles_unstable: CustomStyleHook;
  useTagStyles_unstable: CustomStyleHook;
  useTableBodyStyles_unstable: CustomStyleHook;
  useTableCellActionsStyles_unstable: CustomStyleHook;
  useTableCellLayoutStyles_unstable: CustomStyleHook;
  useTableCellStyles_unstable: CustomStyleHook;
  useTableHeaderCellStyles_unstable: CustomStyleHook;
  useTableHeaderStyles_unstable: CustomStyleHook;
  useTableResizeHandleStyles_unstable: CustomStyleHook;
  useTableRowStyles_unstable: CustomStyleHook;
  useTableSelectionCellStyles_unstable: CustomStyleHook;
  useTableStyles_unstable: CustomStyleHook;
  useTextareaStyles_unstable: CustomStyleHook;
  useTextStyles_unstable: CustomStyleHook;
  useTimePickerCompatStyles_unstable: CustomStyleHook;
  useToastBodyStyles_unstable: CustomStyleHook;
  useToastContainerStyles_unstable: CustomStyleHook;
  useToasterStyles_unstable: CustomStyleHook;
  useToastFooterStyles_unstable: CustomStyleHook;
  useToastStyles_unstable: CustomStyleHook;
  useToastTitleStyles_unstable: CustomStyleHook;
  useToggleButtonStyles_unstable: CustomStyleHook;
  useToolbarButtonStyles_unstable: CustomStyleHook;
  useToolbarDividerStyles_unstable: CustomStyleHook;
  useToolbarGroupStyles_unstable: CustomStyleHook;
  useToolbarRadioButtonStyles_unstable: CustomStyleHook;
  useToolbarToggleButtonStyles_unstable: CustomStyleHook;
  useToolbarStyles_unstable: CustomStyleHook;
  useTooltipStyles_unstable: CustomStyleHook;
  useTreeItemLayoutStyles_unstable: CustomStyleHook;
  useTreeItemPersonaLayoutStyles_unstable: CustomStyleHook;
  useTreeItemStyles_unstable: CustomStyleHook;
  useTreeStyles_unstable: CustomStyleHook;
  useVirtualizerScrollViewDynamicStyles_unstable: CustomStyleHook;
  useVirtualizerScrollViewStyles_unstable: CustomStyleHook;
  useVirtualizerStyles_unstable: CustomStyleHook;
}>;
/* eslint-enable */

/**
 * @internal
 */
export const CustomStyleHooksContext = React.createContext<CustomStyleHooksContextValue | undefined>(undefined);

/**
 * @internal
 */
export const CustomStyleHooksProvider = CustomStyleHooksContext.Provider;

/**
 * Gets a custom style hook.
 *
 * The returned function is always safe to thread: it returns the state to render whether or not
 * a custom hook is registered, and whether that hook follows the functional D14 contract or the
 * pre-D14 void/mutating one.
 *
 * @param hook - One of the hook properties in CustomStyleHooksContextValue
 * @returns A function that returns the custom hook's state, or the input state when no hook is
 * registered (previously a no-op).
 */
export const useCustomStyleHook = (hook: keyof CustomStyleHooksContextValue): (<TState>(state: TState) => TState) => {
  const customStyleHook = React.useContext(CustomStyleHooksContext)?.[hook];

  // The type parameter belongs to the RETURNED function, not to `useCustomStyleHook`: the state
  // type is only observable at `useCustomStyleHook_unstable('…')(state)`, so a parameter on the
  // outer call would have no inference site and would resolve to its default (`unknown`),
  // widening every threaded call site.
  //
  // `?? state` is the dual-shape tolerance described on `CustomStyleHook`: a consumer hook
  // written against the pre-D14 contract mutates `state` and returns `undefined`, and its
  // mutations are already visible on the object we hand back.
  return <TState>(state: TState): TState => (customStyleHook as CustomStyleHook<TState> | undefined)?.(state) ?? state;
};
