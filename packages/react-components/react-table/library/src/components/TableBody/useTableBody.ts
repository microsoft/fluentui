import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
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
  const { noNativeElements } = useTableContext();
  const rootComponent = props.as ?? noNativeElements ? 'div' : 'tbody';

  return {
    components: {
      root: rootComponent,
    },
    root: slot.always(
      getIntrinsicElementProps(rootComponent, {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: ref as React.Ref<HTMLDivElement>,
        role: rootComponent === 'div' ? 'rowgroup' : undefined,
        ...props,
      }),
      { elementType: rootComponent },
    ),
    noNativeElements,
  };
};
