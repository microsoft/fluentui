import * as React from 'react';
import { useMenuGroupHeader } from './useMenuGroupHeader';
import { MenuGroupHeaderProps } from './MenuGroupHeader.types';
import { useMenuGroupHeaderStyles } from './useMenuGroupHeaderStyles';
import { renderMenuGroupHeader } from './renderMenuGroupHeader';

/**
 * Define a styled MenuGroupHeader, using the `useMenuGroupHeader` hook.
 * {@docCategory MenuGroupHeader }
 */
export const MenuGroupHeader: React.FunctionComponent<MenuGroupHeaderProps> = React.forwardRef<
  HTMLElement,
  MenuGroupHeaderProps
>((props, ref) => {
  const state = useMenuGroupHeader(props, ref);
  useMenuGroupHeaderStyles(state);

  return renderMenuGroupHeader(state);
});

MenuGroupHeader.displayName = 'MenuGroupHeader';
