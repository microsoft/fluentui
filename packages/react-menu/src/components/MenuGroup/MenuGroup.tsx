import * as React from 'react';
import { useMenuGroup } from './useMenuGroup';
import { renderMenuGroup } from './renderMenuGroup';
import { useMenuGroupContextValues } from './useMenuGroupContextValues';
import type { MenuGroupProps } from './MenuGroup.types';

/**
 * Define a styled MenuGroup, using the `useMenuGroup` hook.
 * {@docCategory MenuGroup }
 */
export const MenuGroup: React.FunctionComponent<MenuGroupProps> = React.forwardRef<HTMLElement, MenuGroupProps>(
  (props, ref) => {
    const state = useMenuGroup(props, ref);
    const contextValues = useMenuGroupContextValues(state);

    return renderMenuGroup(state, contextValues);
  },
);

MenuGroup.displayName = 'MenuGroup';
