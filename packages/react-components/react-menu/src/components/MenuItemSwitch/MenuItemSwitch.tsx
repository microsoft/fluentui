import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useMenuItemSwitch_unstable } from './useMenuItemSwitch';
import { renderMenuItemSwitch_unstable } from './renderMenuItemSwitch';
import { useMenuItemSwitchStyles_unstable } from './useMenuItemSwitchStyles.styles';
import type { MenuItemSwitchProps } from './MenuItemSwitch.types';

/**
 * MenuItemSwitch component - TODO: add more docs
 */
export const MenuItemSwitch: ForwardRefComponent<MenuItemSwitchProps> = React.forwardRef((props, ref) => {
  const state = useMenuItemSwitch_unstable(props, ref);

  useMenuItemSwitchStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  useCustomStyleHook_unstable('useMenuItemSwitchStyles_unstable')(state);
  return renderMenuItemSwitch_unstable(state);
});

MenuItemSwitch.displayName = 'MenuItemSwitch';
