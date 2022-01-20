import * as React from 'react';
import { useMenuDivider_unstable } from './useMenuDivider';
import { useMenuDividerStyles_unstable } from './useMenuDividerStyles';
import { renderMenuDivider } from './renderMenuDivider';
import type { MenuDividerProps } from './MenuDivider.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled MenuDivider, using the `useMenuDivider_unstable` hook.
 */
export const MenuDivider: ForwardRefComponent<MenuDividerProps> = React.forwardRef((props, ref) => {
  const state = useMenuDivider_unstable(props, ref);
  useMenuDividerStyles_unstable(state);

  return renderMenuDivider(state);
});

MenuDivider.displayName = 'MenuDivider';
