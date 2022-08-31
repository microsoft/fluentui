import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
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
    root: getNativeElementProps(rootComponent, {
      ref,
      role: rootComponent === 'div' ? 'table' : undefined,
      ...props,
    }),
    size: props.size ?? 'medium',
    noNativeElements: props.noNativeElements ?? false,
    sortable: props.sortable ?? false,
  };
};
