import * as React from 'react';
import { getIntrinsicElementProps, useId, slot } from '@fluentui/react-utilities';
import { MenuGridGroupProps, MenuGridGroupState } from './MenuGridGroup.types';

/**
 * Given user props, returns state and render function for a MenuGridGroup.
 */
export function useMenuGridGroup_unstable(
  props: MenuGridGroupProps,
  ref: React.Ref<HTMLDivElement>,
): MenuGridGroupState {
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
