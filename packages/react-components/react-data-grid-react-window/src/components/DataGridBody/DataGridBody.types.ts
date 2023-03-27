import * as React from 'react';
import type {
  TableRowData,
  DataGridBodyProps as DataGridBodyPropsBase,
  DataGridBodySlots as DataGridBodySlotsBase,
  DataGridBodyState as DataGridBodyStateBase,
} from '@fluentui/react-table';

export type DataGridBodySlots = DataGridBodySlotsBase;

export type RowRenderFunction<TItem = unknown> = (
  row: TableRowData<TItem>,
  style: React.CSSProperties,
) => React.ReactNode;

/**
 * DataGridBody Props
 */
export type DataGridBodyProps<TItem = unknown> = Omit<DataGridBodyPropsBase, 'children'> & {
  /**
   * The size of each row
   */
  itemSize: number;
  /**
   * The height of the virtualized container
   */
  height: number;
  /**
   * The width of the virtualized container
   * @default 100%
   */
  width?: string | number;
  /**
   * Children render function for rows
   */
  children: RowRenderFunction<TItem>;
  /**
   * All virtualized rows must have the [aria-rowindex](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-rowindex)
   * attribute for correct screen reader navigation. The default start index is 2 since we assume that there is only
   * one row in the header. If this is not the case, the start index can be reconfigured through this prop.
   * @default 2
   */
  ariaRowIndexStart?: number;
};

/**
 * State used in rendering DataGridBody
 */
export type DataGridBodyState = Omit<DataGridBodyStateBase, 'renderRow'> &
  Pick<DataGridBodyProps, 'itemSize' | 'height'> &
  Pick<Required<DataGridBodyProps>, 'width' | 'ariaRowIndexStart'> & {
    renderRow: RowRenderFunction;
  };
