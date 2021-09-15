import { useMenuDivider } from './useMenuDivider';
import { useMenuDividerStyles } from './useMenuDividerStyles';
import { renderMenuDivider } from './renderMenuDivider';
import type { MenuDividerProps } from './MenuDivider.types';
import { forwardRef } from '@fluentui/react-utilities';

/**
 * Define a styled MenuDivider, using the `useMenuDivider` hook.
 * {@docCategory MenuDivider }
 */
export const MenuDivider = forwardRef<MenuDividerProps>((props, ref) => {
  const state = useMenuDivider(props, ref);
  useMenuDividerStyles(state);

  return renderMenuDivider(state);
});

MenuDivider.displayName = 'MenuDivider';
