import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { TableCellLayoutProps, TableCellLayoutState } from './TableCellLayout.types';

/**
 * Create the state required to render TableCellLayout.
 *
 * The returned state can be modified with hooks such as useTableCellLayoutStyles_unstable,
 * before being passed to renderTableCellLayout_unstable.
 *
 * @param props - props from this instance of TableCellLayout
 * @param ref - reference to root HTMLElement of TableCellLayout
 */
export const useTableCellLayout_unstable = (
  props: TableCellLayoutProps,
  ref: React.Ref<HTMLElement>,
): TableCellLayoutState => {
  return {
    components: {
      root: 'div',
      main: 'span',
      description: 'span',
      wrapper: 'div',
      media: 'span',
    },
    root: getNativeElementProps('div', { ref, ...props }),
    appearance: props.appearance,
    main: resolveShorthand(props.main, { required: true }),
    media: resolveShorthand(props.media),
    description: resolveShorthand(props.description),
    wrapper: resolveShorthand(props.wrapper, { required: !!props.description || !!props.children }),
  };
};
