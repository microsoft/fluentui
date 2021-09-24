import * as React from 'react';
import { useMenuDivider } from './useMenuDivider';
import { useMenuDividerStyles } from './useMenuDividerStyles';
import { renderMenuDivider } from './renderMenuDivider';
import type { MenuDividerProps } from './MenuDivider.types';

/**
 * Define a styled MenuDivider, using the `useMenuDivider` hook.
 */
export const MenuDivider = React.forwardRef<HTMLDivElement, MenuDividerProps>((props, ref) => {
  const state = useMenuDivider(props, ref);
  useMenuDividerStyles(state);

  return renderMenuDivider(state);
});

MenuDivider.displayName = 'MenuDivider';
