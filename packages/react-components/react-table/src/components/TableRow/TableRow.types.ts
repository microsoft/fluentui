import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TableState } from '../Table/Table.types';

export type TableRowSlots = {
  root: Slot<'tr', 'div'>;
};

/**
 * TableRow Props
 */
export type TableRowProps = ComponentProps<TableRowSlots> & {};

/**
 * State used in rendering TableRow
 */
export type TableRowState = ComponentState<TableRowSlots> & { size: TableState['size'] };
