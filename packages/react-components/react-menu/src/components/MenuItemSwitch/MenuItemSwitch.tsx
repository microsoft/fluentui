import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useMenuItemSwitch_unstable } from './useMenuItemSwitch';
import { renderMenuItemSwitch_unstable } from './renderMenuItemSwitch';
import { useMenuItemSwitchStyles_unstable } from './useMenuItemSwitchStyles.styles';
import type { MenuItemSwitchProps } from './MenuItemSwitch.types';

export const MenuItemSwitch: ForwardRefComponent<MenuItemSwitchProps> = React.forwardRef((props, ref) => {
  const state = useMenuItemSwitch_unstable(props, ref);

  useMenuItemSwitchStyles_unstable(state);
  useCustomStyleHook_unstable('useMenuItemSwitchStyles_unstable')(state);
  return renderMenuItemSwitch_unstable(state);
});

MenuItemSwitch.displayName = 'MenuItemSwitch';
