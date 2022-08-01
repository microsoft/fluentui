import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { TableHeaderCellProps, TableHeaderCellState } from './TableHeaderCell.types';
import { useTableContext } from '../../contexts/tableContext';
import { useARIAButton } from '@fluentui/react-aria';

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

  const rootComponent = props.as ?? noNativeElements ? 'div' : 'th';
  return {
    components: {
      root: rootComponent,
      button: 'button',
    },
    root: getNativeElementProps(rootComponent, {
      ref,
      role: rootComponent === 'div' ? 'columnheader' : undefined,
      ...props,
    }),
    button: useARIAButton(props.button, {
      required: true,
      defaultProps: {
        // TODO implement sort state
        role: 'presentation',
        tabIndex: -1,
      },
    }),
  };
};
