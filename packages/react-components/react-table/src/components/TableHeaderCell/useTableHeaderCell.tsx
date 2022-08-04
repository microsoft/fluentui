import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import { ArrowUpRegular, ArrowDownRegular } from '@fluentui/react-icons';
import type { TableHeaderCellProps, TableHeaderCellState } from './TableHeaderCell.types';
import { useTableContext } from '../../contexts/tableContext';
import { useARIAButtonShorthand } from '@fluentui/react-aria';

const sortIcons = {
  ascending: <ArrowUpRegular />,
  descending: <ArrowDownRegular />,
};

/**
 * Create the state required to render TableHeaderCell.
 *
 * The returned state can be modified with hooks such as useTableHeaderCellStyles_unstable,
 * before being passed to renderTableHeaderCell_unstable.
 *
 * @param props - props from this instance of TableHeaderCell
 * @param ref - reference to root HTMLElement of TableHeaderCell
 */
export const useTableHeaderCell_unstable = (
  props: TableHeaderCellProps,
  ref: React.Ref<HTMLElement>,
): TableHeaderCellState => {
  const noNativeElements = useTableContext(ctx => ctx.noNativeElements);
  const sortable = useTableContext(ctx => ctx.sortable);

  const rootComponent = props.as ?? noNativeElements ? 'div' : 'th';
  return {
    components: {
      root: rootComponent,
      button: 'button',
      sortIcon: 'span',
    },
    root: getNativeElementProps(rootComponent, {
      ref,
      role: rootComponent === 'div' ? 'columnheader' : undefined,
      'aria-sort': props.sortDirection,
      ...props,
    }),
    sortIcon: resolveShorthand(props.sortIcon, {
      required: !!props.sortDirection,
      defaultProps: { children: props.sortDirection ? sortIcons[props.sortDirection] : undefined },
    }),
    button: useARIAButtonShorthand(props.button, {
      required: true,
      defaultProps: {
        role: 'presentation',
        tabIndex: -1,
        type: 'button',
        ...(sortable && {
          role: undefined,
          tabIndex: undefined,
        }),
      },
    }),
    sortable,
  };
};
