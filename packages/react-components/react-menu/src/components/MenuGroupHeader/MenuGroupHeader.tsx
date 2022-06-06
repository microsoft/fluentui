import * as React from 'react';
import { useMenuGroupHeader_unstable } from './useMenuGroupHeader';
import { useMenuGroupHeaderStyles_unstable } from './useMenuGroupHeaderStyles';
import { renderMenuGroupHeader_unstable } from './renderMenuGroupHeader';
import type { MenuGroupHeaderProps } from './MenuGroupHeader.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled MenuGroupHeader, using the `useMenuGroupHeader_unstable` hook.
 */
export const MenuGroupHeader: ForwardRefComponent<MenuGroupHeaderProps> = React.forwardRef((props, ref) => {
  const state = useMenuGroupHeader_unstable(props, ref);
  useMenuGroupHeaderStyles_unstable(state);

  return renderMenuGroupHeader_unstable(state);
});

MenuGroupHeader.displayName = 'MenuGroupHeader';
