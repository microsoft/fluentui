import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { TableContextValue } from '../Table/Table.types';

export type TableRowSlots = {
  root: Slot<'tr', 'div'>;
};

/**
 * TableRow Props
 */
export type TableRowProps = ComponentProps<TableRowSlots> & {
  /**
   * A table row can have different variants. These appearances are
   * intended to be used with selection.
   * @default none
   */
  appearance?: 'brand' | 'neutral' | 'none';
};

/**
 * TableRow props accepted by `useTableRowBase_unstable`, without design props.
 */
export type TableRowBaseProps = ComponentProps<TableRowSlots>;

/**
 * State returned by `useTableRowBase_unstable`.
 */
export type TableRowBaseState = ComponentState<TableRowSlots> &
  Pick<TableContextValue, 'noNativeElements'> & {
    isHeaderRow: boolean;
  };

/**
 * State used in rendering TableRow
 */
export type TableRowState = ComponentState<TableRowSlots> &
  Pick<TableContextValue, 'noNativeElements' | 'size'> &
  Pick<Required<TableRowProps>, 'appearance'> & {
    isHeaderRow: boolean;
  };
