import * as React from 'react';
import type { DataGridBodyProps, DataGridBodyState } from './DataGridBody.types';
import { useDataGridBody_unstable as useDataGridBodyBase_unstable } from '@fluentui/react-components/unstable';

/**
 * Create the state required to render DataGridBody.
 *
 * The returned state can be modified with hooks such as useDataGridBodyStyles_unstable,
 * before being passed to renderDataGridBody_unstable.
 *
 * @param props - props from this instance of DataGridBody
 * @param ref - reference to root HTMLElement of DataGridBody
 */
export const useDataGridBody_unstable = (props: DataGridBodyProps, ref: React.Ref<HTMLElement>): DataGridBodyState => {
  const { height, itemSize, width = '100%' } = props;
  const baseState = useDataGridBodyBase_unstable(props, ref);

  return {
    ...baseState,
    itemSize,
    height,
    renderRow: props.children,
    width,
  };
};
