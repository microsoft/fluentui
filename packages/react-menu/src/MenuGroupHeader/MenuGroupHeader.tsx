import * as React from 'react';
import { useMenuGroupHeader } from './useMenuGroupHeader';
import { MenuGroupHeaderProps } from './MenuGroupHeader.types';
import { renderMenuGroupHeader } from './renderMenuGroupHeader';

/**
 * Define a styled MenuGroupHeader, using the `useMenuGroupHeader` hook.
 * {@docCategory MenuGroupHeader}
 */
export const MenuGroupHeader = React.forwardRef<HTMLElement, MenuGroupHeaderProps>((props, ref) => {
  const state = useMenuGroupHeader(props, ref, {
    role: 'presentation ',
    'aria-hidden': true,
  });

  return renderMenuGroupHeader(state);
});

MenuGroupHeader.displayName = 'MenuGroupHeader';
