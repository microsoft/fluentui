import * as React from 'react';
import { resolveShorthand } from '@fluentui/react-utilities';
import type { TableCellPrimaryLayoutProps, TableCellPrimaryLayoutState } from './TableCellPrimaryLayout.types';
import { useTableCellLayout_unstable } from '../TableCellLayout/useTableCellLayout';

/**
 * Create the state required to render TableCellPrimaryLayout.
 *
 * The returned state can be modified with hooks such as useTableCellPrimaryLayoutStyles_unstable,
 * before being passed to renderTableCellPrimaryLayout_unstable.
 *
 * @param props - props from this instance of TableCellPrimaryLayout
 * @param ref - reference to root HTMLElement of TableCellPrimaryLayout
 */
export const useTableCellPrimaryLayout_unstable = (
  props: TableCellPrimaryLayoutProps,
  ref: React.Ref<HTMLElement>,
): TableCellPrimaryLayoutState => {
  const tableCellState = useTableCellLayout_unstable(props, ref);

  return {
    ...tableCellState,
    components: {
      ...tableCellState.components,
      main: 'span',
      secondary: 'span',
      wrapper: 'div',
      media: 'span',
    },
    main: resolveShorthand(props.secondary),
    secondary: resolveShorthand(props.main),
    wrapper: resolveShorthand(props.wrapper, { required: !!props.main || !!props.secondary }),
  };
};
