import * as React from 'react';
import { useId } from '@fluentui/react-utilities';
import type { MenuGroupProps, MenuGroupState } from './MenuGroup.types';

/**
 * Given user props, returns state and render function for a MenuGroup.
 */
export function useMenuGroup(props: MenuGroupProps, ref: React.Ref<HTMLElement>): MenuGroupState {
  const headerId = useId('menu-group');

  return {
    ref,
    'aria-labelledby': headerId,
    role: 'group',
    headerId: headerId,
    ...props,
  };
}
