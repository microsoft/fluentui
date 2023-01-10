import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { ARIAButtonSlotProps } from '@fluentui/react-aria';
import { SortDirection, TableContextValue } from '../Table/Table.types';
import { ColumnId } from '../../hooks';

export type TableHeaderCellSlots = {
  root: Slot<'th', 'div'>;

  sortIcon: Slot<'span'>;

  /**
   * Button handles correct narration and interactions for sorting;
   */
  button: NonNullable<Slot<ARIAButtonSlotProps>>;

  resizeHandle: Slot<'div'>;
};

/**
 * TableHeaderCell Props
 */
export type TableHeaderCellProps = ComponentProps<Partial<TableHeaderCellSlots>> & {
  /**
   * @default undefined
   */
  sortDirection?: SortDirection;

  columnId?: ColumnId;
};

/**
 * State used in rendering TableHeaderCell
 */
export type TableHeaderCellState = ComponentState<TableHeaderCellSlots> &
  Pick<TableHeaderCellProps, 'columnId'> &
  Pick<TableContextValue, 'noNativeElements' | 'sortable'>;
