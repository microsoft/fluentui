import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TableContextValue } from '../Table/Table.types';

export type TableCellSlots = {
  root: NonNullable<Slot<'td', 'div'>>;
};

/**
 * TableCell Props
 */
export type TableCellProps = ComponentProps<Partial<TableCellSlots>>;

/**
 * State used in rendering TableCell
 */
export type TableCellState = ComponentState<TableCellSlots> & Pick<TableContextValue, 'noNativeElements' | 'size'>;
