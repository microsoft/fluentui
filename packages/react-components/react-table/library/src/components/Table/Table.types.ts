import type { ComponentProps, ComponentState, DistributiveOmit, Slot } from '@fluentui/react-utilities';

export type TableSlots = {
  root: Slot<'table', 'div'>;
};

export type TableContextValue = {
  /**
   * Affects the sizes of all table subcomponents
   * @default medium
   */
  size: 'extra-small' | 'small' | 'medium';

  /**
   * Render all table elements as divs instead of semantic table elements
   * Using divs no longer uses `display: table` layout but `display: flex`
   * @default false
   */
  noNativeElements: boolean;

  /**
   * Whether the table is sortable
   * @default false
   */
  sortable: boolean;
};

export type SortDirection = 'ascending' | 'descending';

export type TableContextValues = {
  table: TableContextValue;
};

/**
 * Table Props
 */
export type TableProps = ComponentProps<TableSlots> & Partial<TableContextValue>;

/**
 * Table Props without design-only props.
 */
export type TableBaseProps = DistributiveOmit<TableProps, 'size'>;

/**
 * State used in rendering Table
 */
export type TableState = ComponentState<TableSlots> &
  Pick<Required<TableProps>, 'size' | 'noNativeElements'> &
  TableContextValue;

/**
 * State used in rendering Table, without design-only state.
 */
export type TableBaseState = DistributiveOmit<TableState, 'size'>;
