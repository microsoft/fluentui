import { useMenuGroupHeader } from './useMenuGroupHeader';
import { useMenuGroupHeaderStyles } from './useMenuGroupHeaderStyles';
import { renderMenuGroupHeader } from './renderMenuGroupHeader';
import type { MenuGroupHeaderProps } from './MenuGroupHeader.types';
import { forwardRef } from '@fluentui/react-utilities';

/**
 * Define a styled MenuGroupHeader, using the `useMenuGroupHeader` hook.
 * {@docCategory MenuGroupHeader }
 */
export const MenuGroupHeader = forwardRef<MenuGroupHeaderProps>((props, ref) => {
  const state = useMenuGroupHeader(props, ref);
  useMenuGroupHeaderStyles(state);

  return renderMenuGroupHeader(state);
});

MenuGroupHeader.displayName = 'MenuGroupHeader';
