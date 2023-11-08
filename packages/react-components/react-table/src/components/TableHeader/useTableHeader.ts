import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { TableHeaderProps, TableHeaderState } from './TableHeader.types';
import { useTableContext } from '../../contexts/tableContext';

/**
 * Create the state required to render TableHeader.
 *
 * The returned state can be modified with hooks such as useTableHeaderStyles_unstable,
 * before being passed to renderTableHeader_unstable.
 *
 * @param props - props from this instance of TableHeader
 * @param ref - reference to root HTMLElement of TableHeader
 */
export const useTableHeader_unstable = (props: TableHeaderProps, ref: React.Ref<HTMLElement>): TableHeaderState => {
  const { noNativeElements } = useTableContext();

  const rootComponent = props.as ?? noNativeElements ? 'div' : 'thead';
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
