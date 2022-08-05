import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TableCellActionsSlots = {
  root: Slot<'div'>;
};

/**
 * TableCellActions Props
 */
export type TableCellActionsProps = ComponentProps<TableCellActionsSlots> & {};

/**
 * State used in rendering TableCellActions
 */
export type TableCellActionsState = ComponentState<TableCellActionsSlots>;
