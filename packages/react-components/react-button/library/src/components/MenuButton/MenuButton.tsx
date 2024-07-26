import * as React from 'react';
import { renderMenuButton_unstable } from './renderMenuButton';
import { useMenuButton_unstable } from './useMenuButton';
import { useMenuButtonStyles_unstable } from './useMenuButtonStyles.styles';
import type { MenuButtonProps } from './MenuButton.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * MenuButtons are buttons that have a chevron icon after the button contents and are usually clicked to open/close
 * menus.
 */
//TODO: migrate to fc to ensure v18 compatibility
// eslint-disable-next-line deprecation/deprecation
export const MenuButton: ForwardRefComponent<MenuButtonProps> = React.forwardRef((props, ref) => {
  const state = useMenuButton_unstable(props, ref);

  useMenuButtonStyles_unstable(state);

  useCustomStyleHook_unstable('useMenuButtonStyles_unstable')(state);

  return renderMenuButton_unstable(state);
  //FIXME: migrate to fc to remove this assertion
  // Casting is required due to lack of distributive union to support unions on @types/react
  // eslint-disable-next-line deprecation/deprecation
}) as ForwardRefComponent<MenuButtonProps>;

MenuButton.displayName = 'MenuButton';
