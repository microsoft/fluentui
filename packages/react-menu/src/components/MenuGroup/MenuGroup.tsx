import * as React from 'react';
import { useMenuGroup } from './useMenuGroup';
import { MenuGroupProps } from './MenuGroup.types';
import { renderMenuGroup } from './renderMenuGroup';

/**
 * Define a styled MenuGroup, using the `useMenuGroup` hook.
 * {@docCategory MenuGroup }
 */
export const MenuGroup: React.FunctionComponent<MenuGroupProps> = React.forwardRef<HTMLElement, MenuGroupProps>(
  (props, ref) => {
    const state = useMenuGroup(props, ref);

    return renderMenuGroup(state);
  },
);

MenuGroup.displayName = 'MenuGroup';
