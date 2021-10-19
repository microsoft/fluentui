import * as React from 'react';
import { useMenuDivider } from './useMenuDivider';
import { useMenuDividerStyles } from './useMenuDividerStyles';
import { renderMenuDivider } from './renderMenuDivider';
import type { MenuDividerProps } from './MenuDivider.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled MenuDivider, using the `useMenuDivider` hook.
 */
export const MenuDivider: ForwardRefComponent<MenuDividerProps> = React.forwardRef((props, ref) => {
  const state = useMenuDivider(props, ref);
  useMenuDividerStyles(state);

  return renderMenuDivider(state);
});

MenuDivider.displayName = 'MenuDivider';
