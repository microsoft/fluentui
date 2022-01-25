import * as React from 'react';
import { getNativeElementProps, useId } from '@fluentui/react-utilities';
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
    root: getNativeElementProps('div', {
      ref,
      'aria-labelledby': headerId,
      role: 'group',
      ...props,
    }),
    headerId: headerId,
  };
}
