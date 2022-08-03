import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { TableRowProps, TableRowState } from './TableRow.types';
import { useTableContext } from '../../contexts/tableContext';

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
  const noNativeElements = useTableContext(ctx => ctx.noNativeElements);
  const size = useTableContext(ctx => ctx.size);
  const rootComponent = props.as ?? noNativeElements ? 'div' : 'tr';

  return {
    components: {
      root: rootComponent,
    },
    root: getNativeElementProps(rootComponent, {
      ref,
      role: rootComponent === 'div' ? 'row' : undefined,
      ...props,
    }),
    size,
  };
};
