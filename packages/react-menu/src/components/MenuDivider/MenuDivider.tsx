import * as React from 'react';
import { useMenuDivider_unstable } from './useMenuDivider';
import type { MenuDividerProps } from './MenuDivider.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled MenuDivider, using the `useMenuDivider_unstable` hook.
 */
export const MenuDivider: ForwardRefComponent<MenuDividerProps> = React.forwardRef((props, ref) => {
  const [state, render] = useMenuDivider_unstable(props, ref);
  return render(state);
});

MenuDivider.displayName = 'MenuDivider';
