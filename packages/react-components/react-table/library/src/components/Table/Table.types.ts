import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

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
   * Render table elements as divs by default instead of semantic table elements.
   * Using divs no longer uses `display: table` layout but `display: flex`
   * An explicit `as` prop overrides the element default for that component.
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
 * State used in rendering Table
 */
export type TableState = ComponentState<TableSlots> &
  Pick<Required<TableProps>, 'size' | 'noNativeElements'> &
  TableContextValue;
