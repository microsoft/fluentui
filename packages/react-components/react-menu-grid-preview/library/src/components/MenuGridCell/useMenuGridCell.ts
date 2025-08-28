import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { MenuGridCellProps, MenuGridCellState } from './MenuGridCell.types';

/**
 * Given user props, returns state and render function for a MenuGridCell.
 */
export function useMenuGridCell_unstable(props: MenuGridCellProps, ref: React.Ref<HTMLDivElement>): MenuGridCellState {
  const { visuallyHidden } = props;

  return {
    visuallyHidden,
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        role: 'gridcell',
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
}
