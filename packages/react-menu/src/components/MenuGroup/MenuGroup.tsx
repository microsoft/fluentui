import * as React from 'react';
import { useMenuGroup_unstable } from './useMenuGroup';
import type { MenuGroupProps } from './MenuGroup.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled MenuGroup, using the `useMenuGroup_unstable` hook.
 */
export const MenuGroup: ForwardRefComponent<MenuGroupProps> = React.forwardRef((props, ref) => {
  const [state, render, context] = useMenuGroup_unstable(props, ref);

  return render(state, context);
});

MenuGroup.displayName = 'MenuGroup';
