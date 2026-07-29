'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { MenuButtonProps } from './MenuButton.types';
import { useMenuButton } from './useMenuButton';
import { renderMenuButton } from './renderMenuButton';

/**
 * A button that opens a menu, indicated by a chevron icon.
 */
export const MenuButton: ForwardRefComponent<MenuButtonProps> = React.forwardRef((props, ref) => {
  const state = useMenuButton(props, ref);

  return renderMenuButton(state);
});

MenuButton.displayName = 'MenuButton';
