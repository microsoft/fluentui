import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TableCellActionsSlots = {
  root: Slot<'div'>;
};

/**
 * TableCellActions Props
 */
export type TableCellActionsProps = ComponentProps<TableCellActionsSlots> & {
  /**
   * When true, the actions are always visible regardless of row hover.
   * Can be useful keeping the actions visible when a popout surface is opened.
   */
  visible?: boolean;
};

/**
 * State used in rendering TableCellActions
 */
export type TableCellActionsState = ComponentState<TableCellActionsSlots> &
  Pick<Required<TableCellActionsProps>, 'visible'>;
