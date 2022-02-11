import * as React from 'react';
import { useMenuButton_unstable } from './useMenuButton';
import type { MenuButtonProps } from './MenuButton.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * MenuButtons are buttons that handle opening and closing a menu when they are triggered.
 */
export const MenuButton: ForwardRefComponent<MenuButtonProps> = React.forwardRef((props, ref) => {
  const [state, render] = useMenuButton_unstable(props, ref);

  return render(state);
  // Casting is required due to lack of distributive union to support unions on @types/react
}) as ForwardRefComponent<MenuButtonProps>;

MenuButton.displayName = 'MenuButton';
