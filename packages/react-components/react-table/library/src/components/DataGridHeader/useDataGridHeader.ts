import * as React from 'react';
import type { DataGridHeaderProps, DataGridHeaderState } from './DataGridHeader.types';
import { useTableHeader_unstable } from '../TableHeader/useTableHeader';

/**
 * Create the state required to render DataGridHeader.
 *
 * The returned state can be modified with hooks such as useDataGridHeaderStyles_unstable,
 * before being passed to renderDataGridHeader_unstable.
 *
 * @param props - props from this instance of DataGridHeader
 * @param ref - reference to root HTMLElement of DataGridHeader
 */
export const useDataGridHeader_unstable = (
  props: DataGridHeaderProps,
  ref: React.Ref<HTMLElement>,
): DataGridHeaderState => {
  return useTableHeader_unstable({ ...props, as: 'div' }, ref);
};
