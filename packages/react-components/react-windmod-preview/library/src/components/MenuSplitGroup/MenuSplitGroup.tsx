'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderMenuSplitGroup, useMenuSplitGroup } from '@fluentui/react-headless-components-preview/menu';

import { MenuItemContextProvider } from '../MenuItem/menuItemContext';
import type { MenuSplitGroupProps } from './MenuSplitGroup.types';
import { menuSplitGroupItemContext, useMenuSplitGroupStyles } from './useMenuSplitGroupStyles';

/**
 * A MenuSplitGroup pairs an action half with a submenu trigger half. Windmod MenuSplitGroup: the
 * headless group decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 *
 * Two contexts are published. The item context carries the seam look to halves the consumer
 * supplies, which the group can neither class nor slot. The split-group context is what makes
 * useIsInMenuSplitGroup true for those halves, so the trigger half drops its icon and checkmark
 * gutters; its identity has to be stable, and setMultiline stays the headless no-op.
 */
export const MenuSplitGroup: ForwardRefComponent<MenuSplitGroupProps> = React.forwardRef((props, ref) => {
  const state = useMenuSplitGroup(props, ref);
  const contexts = React.useMemo(
    () => ({ menuSplitGroup: { setMultiline: state.setMultiline } }),
    [state.setMultiline],
  );

  return (
    <MenuItemContextProvider value={menuSplitGroupItemContext}>
      {renderMenuSplitGroup(useMenuSplitGroupStyles(state), contexts)}
    </MenuItemContextProvider>
  );
});

MenuSplitGroup.displayName = 'MenuSplitGroup';
