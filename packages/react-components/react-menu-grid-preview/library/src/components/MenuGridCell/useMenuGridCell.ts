import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { MenuGridCellProps, MenuGridCellState } from './MenuGridCell.types';

/**
 * Given user props, returns state and render function for a MenuGridCell.
 */
export function useMenuGridCell_unstable(props: MenuGridCellProps, ref: React.Ref<HTMLElement>): MenuGridCellState {
  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: ref as React.Ref<HTMLDivElement>,
        role: 'gridcell',
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
}
