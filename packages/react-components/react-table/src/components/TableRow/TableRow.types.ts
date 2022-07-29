import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TableContextValue } from '../../contexts/types';

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
export type TableRowState = ComponentState<TableRowSlots> & { size: TableContextValue['size'] };
