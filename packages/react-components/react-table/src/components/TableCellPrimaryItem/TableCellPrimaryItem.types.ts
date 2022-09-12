import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TableCellItemSlots } from '../TableCellItem';

export type TableCellPrimaryItemSlots = {
  main: Slot<'span'>;

  secondary: Slot<'span'>;

  wrapper: Slot<'div'>;
} & TableCellItemSlots;

/**
 * TableCellPrimaryItem Props
 */
export type TableCellPrimaryItemProps = ComponentProps<Partial<TableCellPrimaryItemSlots>> & {};

/**
 * State used in rendering TableCellPrimaryItem
 */
export type TableCellPrimaryItemState = ComponentState<TableCellPrimaryItemSlots>;
