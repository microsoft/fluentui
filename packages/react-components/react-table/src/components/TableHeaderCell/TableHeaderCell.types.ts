import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { ARIAButtonSlotProps } from '@fluentui/react-aria';
import { SortDirection, TableContextValue } from '../Table/Table.types';

export type TableHeaderCellSlots = {
  root: Slot<'th', 'div'>;

  sortIcon: Slot<'span'>;

  /**
   * Button handles correct narration and interactions for sorting;
   */
  button: NonNullable<Slot<ARIAButtonSlotProps>>;
};

/**
 * TableHeaderCell Props
 */
export type TableHeaderCellProps = ComponentProps<Partial<TableHeaderCellSlots>> & {
  /**
   * @default undefined
   */
  sortDirection?: SortDirection;
};

/**
 * State used in rendering TableHeaderCell
 */
export type TableHeaderCellState = ComponentState<TableHeaderCellSlots> &
  Pick<TableContextValue, 'noNativeElements' | 'sortable'>;
