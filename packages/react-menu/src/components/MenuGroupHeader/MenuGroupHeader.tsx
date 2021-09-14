import * as React from 'react';
import { useMenuGroupHeader } from './useMenuGroupHeader';
import { useMenuGroupHeaderStyles } from './useMenuGroupHeaderStyles';
import { renderMenuGroupHeader } from './renderMenuGroupHeader';
import type { MenuGroupHeaderProps } from './MenuGroupHeader.types';

/**
 * Define a styled MenuGroupHeader, using the `useMenuGroupHeader` hook.
 * {@docCategory MenuGroupHeader }
 */
export const MenuGroupHeader: React.FunctionComponent<MenuGroupHeaderProps> = React.forwardRef((props, ref) => {
  const state = useMenuGroupHeader(props, ref);
  useMenuGroupHeaderStyles(state);

  return renderMenuGroupHeader(state);
});

MenuGroupHeader.displayName = 'MenuGroupHeader';
