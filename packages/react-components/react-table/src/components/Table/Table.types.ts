import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TableSlots = {
  root: Slot<'table', 'div'>;
};

export type TableContextValue = {
  /**
   * Affects the sizes of all table subcomponents
   * @default medium
   */
  size: 'small' | 'smaller' | 'medium';

  /**
   * Render all table elements as divs intead of semantic table elements
   */
  noNativeElements: boolean;

  /**
   * Uses native browser `display: table` layout or flexbox layout.
   * Recommended to use flx layout for virtualized tables
   * @default native
   */
  layoutType: 'native' | 'flex';

  /**
   * Whether the table is sortable
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
  Pick<Required<TableProps>, 'size' | 'noNativeElements' | 'layoutType'> &
  TableContextValue;
