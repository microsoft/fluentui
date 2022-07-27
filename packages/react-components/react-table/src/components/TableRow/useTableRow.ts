import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { TableRowProps, TableRowState } from './TableRow.types';

/**
 * Create the state required to render TableRow.
 *
 * The returned state can be modified with hooks such as useTableRowStyles_unstable,
 * before being passed to renderTableRow_unstable.
 *
 * @param props - props from this instance of TableRow
 * @param ref - reference to root HTMLElement of TableRow
 */
export const useTableRow_unstable = (props: TableRowProps, ref: React.Ref<HTMLElement>): TableRowState => {
  return {
    components: {
      root: 'tr',
    },
    root: getNativeElementProps(props.as ?? 'tr', {
      ref,
      ...props,
    }),
  };
};
