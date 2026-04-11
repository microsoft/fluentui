import type { ComponentProps, ComponentState, DistributiveOmit, Slot } from '@fluentui/react-utilities';
import { TableContextValue } from '../Table/Table.types';

export type TableCellSlots = {
  root: Slot<'td', 'div'>;
};

/**
 * TableCell Props
 */
export type TableCellProps = ComponentProps<TableCellSlots> & {};

/**
 * TableCell Props without design-only props.
 */
export type TableCellBaseProps = TableCellProps;

/**
 * State used in rendering TableCell
 */
export type TableCellState = ComponentState<TableCellSlots> & Pick<TableContextValue, 'noNativeElements' | 'size'>;

/**
 * State used in rendering TableCell, without design-only state.
 */
export type TableCellBaseState = DistributiveOmit<TableCellState, 'size'>;
