import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { TablePrimaryCellProps, TablePrimaryCellState } from './TablePrimaryCell.types';
import { useTableContext } from '../../contexts/tableContext';

/**
 * Create the state required to render TablePrimaryCell.
 *
 * The returned state can be modified with hooks such as useTablePrimaryCellStyles_unstable,
 * before being passed to renderTablePrimaryCell_unstable.
 *
 * @param props - props from this instance of TablePrimaryCell
 * @param ref - reference to root HTMLElement of TablePrimaryCell
 */
export const useTablePrimaryCell_unstable = (
  props: TablePrimaryCellProps,
  ref: React.Ref<HTMLElement>,
): TablePrimaryCellState => {
  const noNativeElements = useTableContext(ctx => ctx.noNativeElements);
  const rootComponent = props.as ?? noNativeElements ? 'div' : 'td';

  return {
    components: {
      root: rootComponent,
      main: 'span',
      secondary: 'span',
      media: 'span',
      wrapper: 'div',
    },
    root: getNativeElementProps(rootComponent, {
      ref,
      role: rootComponent === 'div' ? 'cell' : undefined,
      ...props,
    }),
    media: resolveShorthand(props.media),
    main: resolveShorthand(props.secondary),
    secondary: resolveShorthand(props.main),
    wrapper: resolveShorthand(props.wrapper, { required: !!props.main || !!props.secondary }),
  };
};
