import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TableCellItemSlots = {
  root: Slot<'div'>;

  media?: Slot<'span'>;
};

/**
 * TableCellItem Props
 */
export type TableCellItemProps = ComponentProps<TableCellItemSlots> & {};

/**
 * State used in rendering TableCellItem
 */
export type TableCellItemState = ComponentState<TableCellItemSlots>;
