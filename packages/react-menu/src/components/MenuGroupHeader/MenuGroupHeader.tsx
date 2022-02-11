import * as React from 'react';
import { useMenuGroupHeader_unstable } from './useMenuGroupHeader';
import type { MenuGroupHeaderProps } from './MenuGroupHeader.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled MenuGroupHeader, using the `useMenuGroupHeader_unstable` hook.
 */
export const MenuGroupHeader: ForwardRefComponent<MenuGroupHeaderProps> = React.forwardRef((props, ref) => {
  const [state, render] = useMenuGroupHeader_unstable(props, ref);
  return render(state);
});

MenuGroupHeader.displayName = 'MenuGroupHeader';
