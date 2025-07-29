import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';

import { useMenuGridRowGroupContext_unstable } from '../../contexts/menuGridRowGroupContext';
import { MenuGridRowGroupHeaderProps, MenuGridRowGroupHeaderState } from './MenuGridRowGroupHeader.types';

/**
 * Given user props, returns state and render function for a MenuGridRowGroupHeader.
 */
export function useMenuGridRowGroupHeader_unstable(
  props: MenuGridRowGroupHeaderProps,
  ref: React.Ref<HTMLDivElement>,
): MenuGridRowGroupHeaderState {
  const { headerId: id } = useMenuGridRowGroupContext_unstable();

  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        role: 'presentation',
        id,
        'aria-hidden': true,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
}
