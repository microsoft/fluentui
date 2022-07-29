import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
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
  const noNativeElements = useTableContext(ctx => ctx.noNativeElements);

  const rootComponent = props.as ?? noNativeElements ? 'div' : 'thead';
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
