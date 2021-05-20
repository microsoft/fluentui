import * as React from 'react';
import { useMenuDivider } from './useMenuDivider';
import { MenuDividerProps } from './MenuDivider.types';
import { useMenuDividerStyles } from './useMenuDividerStyles';
import { renderMenuDivider } from './renderMenuDivider';

/**
 * Define a styled MenuDivider, using the `useMenuDivider` hook.
 * {@docCategory MenuDivider }
 */
export const MenuDivider: React.FunctionComponent<
  MenuDividerProps & React.RefAttributes<HTMLElement>
> = React.forwardRef<HTMLElement, MenuDividerProps>((props, ref) => {
  const state = useMenuDivider(props, ref);
  useMenuDividerStyles(state);

  return renderMenuDivider(state);
});

MenuDivider.displayName = 'MenuDivider';
