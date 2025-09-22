import * as React from 'react';
import { useMergedRefs, getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { MenuGridCellProps, MenuGridCellState } from './MenuGridCell.types';
import { useValidateNesting } from '../../utils/useValidateNesting';

/**
 * Given user props, returns state and render function for a MenuGridCell.
 */
export function useMenuGridCell_unstable(props: MenuGridCellProps, ref: React.Ref<HTMLDivElement>): MenuGridCellState {
  const validateNestingRef = useValidateNesting('MenuGridCell');
  const { visuallyHidden } = props;

  return {
    visuallyHidden,
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref: useMergedRefs(ref, validateNestingRef),
        role: 'gridcell',
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
}
