import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TableContextValue } from '../Table/Table.types';

export type TableRowSlots = {
  root: NonNullable<Slot<'tr', 'div'>>;
};

/**
 * TableRow Props
 */
export type TableRowProps = ComponentProps<Partial<TableRowSlots>> & {
  /**
   * A table row can have different variants. These appearances are
   * intended to be used with selection.
   * @default none
   */
  appearance?: 'brand' | 'neutral' | 'none';
};

/**
 * State used in rendering TableRow
 */
export type TableRowState = ComponentState<TableRowSlots> &
  Pick<TableContextValue, 'noNativeElements' | 'size'> &
  Pick<Required<TableRowProps>, 'appearance'> & {
    isHeaderRow: boolean;
  };
