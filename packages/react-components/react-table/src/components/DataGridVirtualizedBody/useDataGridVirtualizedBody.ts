import * as React from 'react';
import type { DataGridVirtualizedBodyProps, DataGridVirtualizedBodyState } from './DataGridVirtualizedBody.types';
import { useDataGridBody_unstable } from '../DataGridBody/useDataGridBody';

/**
 * Create the state required to render DataGridVirtualizedBody.
 *
 * The returned state can be modified with hooks such as useDataGridVirtualizedBodyStyles_unstable,
 * before being passed to renderDataGridVirtualizedBody_unstable.
 *
 * @param props - props from this instance of DataGridVirtualizedBody
 * @param ref - reference to root HTMLElement of DataGridVirtualizedBody
 */
export const useDataGridVirtualizedBody_unstable = (
  props: DataGridVirtualizedBodyProps,
  ref: React.Ref<HTMLElement>,
): DataGridVirtualizedBodyState => {
  const { height, itemSize } = props;
  const childrenFn = props.children;
  const baseState = useDataGridBody_unstable(props, ref);

  return {
    ...baseState,
    itemSize,
    height,
    childrenFn,
  };
};
