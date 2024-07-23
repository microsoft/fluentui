import * as React from 'react';
import { useMenuGroupContext_unstable } from '../../contexts/menuGroupContext';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { MenuGroupHeaderProps, MenuGroupHeaderState } from './MenuGroupHeader.types';

/**
 * Given user props, returns state and render function for a MenuGroupHeader.
 */
export function useMenuGroupHeader_unstable(
  props: MenuGroupHeaderProps,
  ref: React.Ref<HTMLElement>,
): MenuGroupHeaderState {
  const { headerId: id } = useMenuGroupContext_unstable();

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
        id,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
}
