import * as React from 'react';
import { getIntrinsicElementProps, useId, slot } from '@fluentui/react-utilities';
import { MenuGroupProps, MenuGroupState } from './MenuGroup.types';

/**
 * Given user props, returns state and render function for a MenuGroup.
 */
export function useMenuGroup_unstable(props: MenuGroupProps, ref: React.Ref<HTMLElement>): MenuGroupState {
  const headerId = useId('menu-group');

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
        'aria-labelledby': headerId,
        role: 'group',
        ...props,
      }),
      { elementType: 'div' },
    ),
    headerId,
  };
}
