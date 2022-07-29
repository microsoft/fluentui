import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TableContextValue } from '../../contexts/types';

export type TableSlots = {
  root: Slot<'table', 'div'>;
};

export type TableContextValues = {
  table: TableContextValue;
};

/**
 * Table Props
 */
export type TableProps = ComponentProps<TableSlots> & {} & Partial<TableContextValue>;

/**
 * State used in rendering Table
 */
export type TableState = ComponentState<TableSlots> & Pick<Required<TableProps>, 'size' | 'noNativeElements'>;
