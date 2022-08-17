import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TableCellSlots } from '../TableCell/TableCell.types';

export type TablePrimaryCellSlots = {
  main: Slot<'span'>;

  secondary: Slot<'span'>;

  wrapper: Slot<'div'>;
} & TableCellSlots;

/**
 * TablePrimaryCell Props
 */
export type TablePrimaryCellProps = ComponentProps<Partial<TablePrimaryCellSlots>> & {};

/**
 * State used in rendering TablePrimaryCell
 */
export type TablePrimaryCellState = ComponentState<TablePrimaryCellSlots>;
