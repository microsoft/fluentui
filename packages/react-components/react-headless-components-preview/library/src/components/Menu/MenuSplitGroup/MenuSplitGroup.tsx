'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMenuSplitGroup } from './useMenuSplitGroup';
import { renderMenuSplitGroup } from './renderMenuSplitGroup';
import type { MenuSplitGroupProps } from './MenuSplitGroup.types';

/**
 * Headless MenuSplitGroup component.
 *
 * Wraps two `MenuItem` children (an action item plus a submenu trigger) in
 * a layout group with arrow-key navigation between them. The renderer's
 * MenuSplitGroupContextProvider falls back to its default value (no
 * multiline integration); the headless package does not currently re-export
 * `useMenuSplitGroupContextValues_unstable` because it is private to v9.
 */
export const MenuSplitGroup: ForwardRefComponent<MenuSplitGroupProps> = React.forwardRef((props, ref) => {
  const state = useMenuSplitGroup(props, ref);
  return renderMenuSplitGroup(state);
});

MenuSplitGroup.displayName = 'MenuSplitGroup';
