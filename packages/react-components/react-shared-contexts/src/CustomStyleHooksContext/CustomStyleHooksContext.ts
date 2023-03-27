/* eslint-disable */

import * as React from 'react';

type CustomStyleHook = (state: unknown) => void;

// The list of hooks is built from the exports from react-components/src/index
export type CustomStyleHooksContextValue = {
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
};

/**
 * @internal
 */
export const CustomStyleHooksContext = React.createContext<CustomStyleHooksContextValue | undefined>(undefined);

const noop = () => {};
const customStyleHooksContextDefaultValue: CustomStyleHooksContextValue = {
  useAccordionHeaderStyles_unstable: noop,
  useAccordionItemStyles_unstable: noop,
  useAccordionPanelStyles_unstable: noop,
  useAccordionStyles_unstable: noop,
  useAvatarStyles_unstable: noop,
  useAvatarGroupStyles_unstable: noop,
  useAvatarGroupItemStyles_unstable: noop,
  useAvatarGroupPopoverStyles_unstable: noop,
  useBadgeStyles_unstable: noop,
  useCounterBadgeStyles_unstable: noop,
  useCardHeaderStyles_unstable: noop,
  useCardStyles_unstable: noop,
  useCardFooterStyles_unstable: noop,
  useCardPreviewStyles_unstable: noop,
  usePresenceBadgeStyles_unstable: noop,
  useButtonStyles_unstable: noop,
  useCompoundButtonStyles_unstable: noop,
  useMenuButtonStyles_unstable: noop,
  useSplitButtonStyles_unstable: noop,
  useToggleButtonStyles_unstable: noop,
  useCheckboxStyles_unstable: noop,
  useComboboxStyles_unstable: noop,
  useDropdownStyles_unstable: noop,
  useListboxStyles_unstable: noop,
  useOptionStyles_unstable: noop,
  useOptionGroupStyles_unstable: noop,
  useDividerStyles_unstable: noop,
  useInputStyles_unstable: noop,
  useImageStyles_unstable: noop,
  useLabelStyles_unstable: noop,
  useLinkStyles_unstable: noop,
  useMenuDividerStyles_unstable: noop,
  useMenuGroupHeaderStyles_unstable: noop,
  useMenuGroupStyles_unstable: noop,
  useMenuItemCheckboxStyles_unstable: noop,
  useMenuItemRadioStyles_unstable: noop,
  useMenuItemStyles_unstable: noop,
  useMenuListStyles_unstable: noop,
  useMenuPopoverStyles_unstable: noop,
  useMenuSplitGroupStyles_unstable: noop,
  usePersonaStyles_unstable: noop,
  usePopoverSurfaceStyles_unstable: noop,
  useRadioGroupStyles_unstable: noop,
  useRadioStyles_unstable: noop,
  useSelectStyles_unstable: noop,
  useSliderStyles_unstable: noop,
  useSpinButtonStyles_unstable: noop,
  useSpinnerStyles_unstable: noop,
  useSwitchStyles_unstable: noop,
  useTabStyles_unstable: noop,
  useTabListStyles_unstable: noop,
  useTextStyles_unstable: noop,
  useTextareaStyles_unstable: noop,
  useTooltipStyles_unstable: noop,
  useDialogTitleStyles_unstable: noop,
  useDialogBodyStyles_unstable: noop,
  useDialogActionsStyles_unstable: noop,
  useDialogSurfaceStyles_unstable: noop,
  useDialogContentStyles_unstable: noop,
  useProgressBarStyles_unstable: noop,
  useToolbarButtonStyles_unstable: noop,
  useToolbarRadioButtonStyles_unstable: noop,
  useToolbarGroupStyles_unstable: noop,
  useToolbarToggleButtonStyles_unstable: noop,
  useToolbarDividerStyles_unstable: noop,
  useToolbarStyles_unstable: noop,
  useTableCellStyles_unstable: noop,
  useTableRowStyles_unstable: noop,
  useTableBodyStyles_unstable: noop,
  useTableStyles_unstable: noop,
  useTableHeaderStyles_unstable: noop,
  useTableHeaderCellStyles_unstable: noop,
  useTableResizeHandleStyles_unstable: noop,
  useTableSelectionCellStyles_unstable: noop,
  useTableCellActionsStyles_unstable: noop,
  useTableCellLayoutStyles_unstable: noop,
  useDataGridCellStyles_unstable: noop,
  useDataGridRowStyles_unstable: noop,
  useDataGridBodyStyles_unstable: noop,
  useDataGridStyles_unstable: noop,
  useDataGridHeaderStyles_unstable: noop,
  useDataGridHeaderCellStyles_unstable: noop,
  useDataGridSelectionCellStyles_unstable: noop,
};

/**
 * @internal
 */
export const CustomStyleHooksProvider = CustomStyleHooksContext.Provider;

export function useCustomStyleHooks(): CustomStyleHooksContextValue {
  return React.useContext(CustomStyleHooksContext) ?? customStyleHooksContextDefaultValue;
}
