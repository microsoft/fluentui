import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';

import { useMenuGridRowGroupContext_unstable } from '../../contexts/menuGridRowGroupContext';
import { MenuGridRowGroupHeaderProps, MenuGridRowGroupHeaderState } from './MenuGridRowGroupHeader.types';

/**
 * Given user props, returns state and render function for a MenuGridRowGroupHeader.
 */
export function useMenuGridRowGroupHeader_unstable(
  props: MenuGridRowGroupHeaderProps,
  ref: React.Ref<HTMLElement>,
): MenuGridRowGroupHeaderState {
  const { headerId: id } = useMenuGridRowGroupContext_unstable();

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
        role: 'presentation',
        id,
        'aria-hidden': true,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
}
