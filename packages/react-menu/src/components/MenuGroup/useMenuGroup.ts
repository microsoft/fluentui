import * as React from 'react';
<<<<<<< HEAD
import { useId } from '@fluentui/react-utilities';
import type { MenuGroupProps, MenuGroupState } from './MenuGroup.types';
=======
import { getNativeElementProps, useId } from '@fluentui/react-utilities';
import { MenuGroupProps, MenuGroupState } from './MenuGroup.types';
>>>>>>> Updates react-menu to use root as slot

/**
 * Given user props, returns state and render function for a MenuGroup.
 */
export function useMenuGroup(props: MenuGroupProps, ref: React.Ref<HTMLElement>): MenuGroupState {
  const headerId = useId('menu-group');

  return {
    root: getNativeElementProps('div', {
      ref,
      'aria-labelledby': headerId,
      role: 'group',
      ...props,
    }),
    headerId: headerId,
    ...props,
  };
}
