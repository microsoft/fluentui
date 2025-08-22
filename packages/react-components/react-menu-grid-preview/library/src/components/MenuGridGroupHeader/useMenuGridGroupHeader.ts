import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';

import { useMenuGridGroupContext_unstable } from '../../contexts/menuGridGroupContext';
import { MenuGridGroupHeaderProps, MenuGridGroupHeaderState } from './MenuGridGroupHeader.types';

/**
 * Given user props, returns state and render function for a MenuGridGroupHeader.
 */
export function useMenuGridGroupHeader_unstable(
  props: MenuGridGroupHeaderProps,
  ref: React.Ref<HTMLDivElement>,
): MenuGridGroupHeaderState {
  const { headerId: id } = useMenuGridGroupContext_unstable();

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
