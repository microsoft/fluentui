import * as React from 'react';
import type { DataGridBodyProps, DataGridBodyState } from './DataGridBody.types';
import { useTableBody_unstable } from '../TableBody/useTableBody';

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
  return useTableBody_unstable({ ...props, as: 'div' }, ref);
};
