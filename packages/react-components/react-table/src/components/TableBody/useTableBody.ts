import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { TableBodyProps, TableBodyState } from './TableBody.types';
import { useTableContext } from '../../contexts/tableContext';

/**
 * Create the state required to render TableBody.
 *
 * The returned state can be modified with hooks such as useTableBodyStyles_unstable,
 * before being passed to renderTableBody_unstable.
 *
 * @param props - props from this instance of TableBody
 * @param ref - reference to root HTMLElement of TableBody
 */
export const useTableBody_unstable = (props: TableBodyProps, ref: React.Ref<HTMLElement>): TableBodyState => {
  const noNativeElements = useTableContext(ctx => ctx.noNativeElements);
  const rootComponent = props.as ?? noNativeElements ? 'div' : 'tbody';

  return {
    components: {
      root: rootComponent,
    },
    root: getNativeElementProps(rootComponent, {
      ref,
      role: rootComponent === 'div' ? 'rowgroup' : undefined,
      ...props,
    }),
  };
};
