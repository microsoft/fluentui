import * as React from 'react';
import { RowState } from '../../hooks';
import { DataGridBodyProps, DataGridBodySlots, DataGridBodyState } from '../DataGridBody/DataGridBody.types';

export type DataGridVirtualizedBodySlots = DataGridBodySlots;

// Use any here since we can't know the user types
// The user is responsible for narrowing the type downstream
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RowRenderFunction<TItem = any> = (row: RowState<TItem>, styles: React.CSSProperties) => React.ReactNode;

/**
 * DataGridVirtualizedBody Props
 */
export type DataGridVirtualizedBodyProps = DataGridBodyProps & {
  itemSize: number;
  height: number;
  children: RowRenderFunction;
};

/**
 * State used in rendering DataGridVirtualizedBody
 */
export type DataGridVirtualizedBodyState = DataGridBodyState &
  Pick<DataGridVirtualizedBodyProps, 'itemSize' | 'height'> & {
    childrenFn: RowRenderFunction;
  };
