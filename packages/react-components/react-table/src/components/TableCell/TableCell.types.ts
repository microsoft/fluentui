import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TableCellSlots = {
  root: Slot<'td', 'div'>;
};

/**
 * TableCell Props
 */
export type TableCellProps = ComponentProps<TableCellSlots> & {};

/**
 * State used in rendering TableCell
 */
export type TableCellState = ComponentState<TableCellSlots>;
