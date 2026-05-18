'use client';

import type * as React from 'react';
import { useMenuItemSwitchBase_unstable } from '@fluentui/react-menu';
import type { MenuItemSwitchProps, MenuItemSwitchState } from '@fluentui/react-menu';

/**
 * Returns the state for a MenuItemSwitch.
 *
 * Delegates to v9's `useMenuItemSwitchBase_unstable`. Renders a toggle-style
 * item with a `switchIndicator` slot. The base hook does not inject the
 * default `CircleFilled` indicator — headless consumers supply their own.
 */
export const useMenuItemSwitch = (props: MenuItemSwitchProps, ref: React.Ref<HTMLDivElement>): MenuItemSwitchState => {
  return useMenuItemSwitchBase_unstable(props, ref);
};
