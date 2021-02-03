import * as React from 'react';
import { useMenuGroupDivider } from './useMenuGroupDivider';
import { MenuGroupDividerProps } from './MenuGroupDivider.types';
import { renderMenuGroupDivider } from './renderMenuGroupDivider';
import { useMenuGroupDividerStyles } from './useMenuGroupDividerStyles';

/**
 * Define a styled MenuGroupDivider, using the `useMenuGroupDivider` hook.
 * {@docCategory MenuGroupDivider}
 */
export const MenuGroupDivider = React.forwardRef<HTMLElement, MenuGroupDividerProps>((props, ref) => {
  const state = useMenuGroupDivider(props, ref);

  useMenuGroupDividerStyles(state);

  return renderMenuGroupDivider(state);
});

MenuGroupDivider.displayName = 'MenuGroupDivider';
