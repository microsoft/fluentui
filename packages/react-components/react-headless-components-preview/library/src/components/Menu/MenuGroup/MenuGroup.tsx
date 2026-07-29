'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMenuGroup } from './useMenuGroup';
import { useMenuGroupContextValues } from './useMenuGroupContextValues';
import { renderMenuGroup } from './renderMenuGroup';
import type { MenuGroupProps } from '@fluentui/react-menu';

/**
 * Headless MenuGroup component.
 *
 * Wraps a logical group of menu items, exposing a `headerId` through context
 * so that an optional `MenuGroupHeader` child can wire `aria-labelledby`.
 */
export const MenuGroup: ForwardRefComponent<MenuGroupProps> = React.forwardRef((props, ref) => {
  const state = useMenuGroup(props, ref);
  const contextValues = useMenuGroupContextValues(state);
  return renderMenuGroup(state, contextValues);
});

MenuGroup.displayName = 'MenuGroup';
