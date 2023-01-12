import * as React from 'react';
import type {
  RowState,
  DataGridBodyProps as DataGridBodyPropsBase,
  DataGridBodySlots as DataGridBodySlotsBase,
  DataGridBodyState as DataGridBodyStateBase,
} from '@fluentui/react-components/unstable';

export type DataGridBodySlots = DataGridBodySlotsBase;

// Use any here since we can't know the user types
// The user is responsible for narrowing the type downstream
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RowRenderFunction = (row: RowState<any>, style: React.CSSProperties) => React.ReactNode;

/**
 * DataGridBody Props
 */
export type DataGridBodyProps = Omit<DataGridBodyPropsBase, 'children'> & {
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
  children: RowRenderFunction;
};

/**
 * State used in rendering DataGridBody
 */
export type DataGridBodyState = Omit<DataGridBodyStateBase, 'renderRow'> &
  Pick<DataGridBodyProps, 'itemSize' | 'height'> &
  Pick<Required<DataGridBodyProps>, 'width'> & {
    renderRow: RowRenderFunction;
  };
