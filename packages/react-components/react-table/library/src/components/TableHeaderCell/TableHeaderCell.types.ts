import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { ARIAButtonSlotProps } from '@fluentui/react-aria';
import type { SortDirection, TableContextValue } from '../Table/Table.types';

export type TableHeaderCellSlots = {
  root: Slot<'th', 'div'>;

  sortIcon: Slot<'span'>;

  /**
   * Button handles correct narration and interactions for sorting;
   */
  button: NonNullable<Slot<ARIAButtonSlotProps>>;
  /**
   * aside content for anything that should be after main content of the table header cell
   */
  aside: Slot<'span'>;
};

/**
 * TableHeaderCell Props
 */
export type TableHeaderCellProps = ComponentProps<Partial<TableHeaderCellSlots>> & {
  /**
   * Whether the column is sortable
   * @default false
   */
  sortable?: boolean;
  /**
   * @default undefined
   */
  sortDirection?: SortDirection;
};

/**
 * State used in rendering TableHeaderCell
 */
export type TableHeaderCellState = ComponentState<TableHeaderCellSlots> &
  Pick<TableContextValue, 'noNativeElements'> &
  Pick<TableHeaderCellProps, 'sortable'>;
