import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { TableProps, TableState } from './Table.types';

/**
 * Create the state required to render Table.
 *
 * The returned state can be modified with hooks such as useTableStyles_unstable,
 * before being passed to renderTable_unstable.
 *
 * @param props - props from this instance of Table
 * @param ref - reference to root HTMLElement of Table
 */
export const useTable_unstable = (props: TableProps, ref: React.Ref<HTMLElement>): TableState => {
  const rootComponent = props.as ?? props.noNativeElements ? 'div' : 'table';

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
        role: rootComponent === 'div' ? 'table' : undefined,
        ...props,
      }),
      { elementType: rootComponent },
    ),
    size: props.size ?? 'medium',
    noNativeElements: props.noNativeElements ?? false,
    sortable: props.sortable ?? false,
  };
};
