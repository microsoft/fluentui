import * as React from 'react';
import { getIntrinsicElementProps, useId, slot } from '@fluentui/react-utilities';
import { MenuGridRowGroupProps, MenuGridRowGroupState } from './MenuGridRowGroup.types';

/**
 * Given user props, returns state and render function for a MenuGridRowGroup.
 */
export function useMenuGridRowGroup_unstable(
  props: MenuGridRowGroupProps,
  ref: React.Ref<HTMLDivElement>,
): MenuGridRowGroupState {
  const headerId = useId('menu-grid-row-group-header');

  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        role: 'rowgroup',
        'aria-labelledby': headerId,
        ...props,
      }),
      { elementType: 'div' },
    ),
    headerId,
  };
}
