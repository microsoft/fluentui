'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderMenuGroup,
  useMenuGroup,
  useMenuGroupContextValues,
} from '@fluentui/react-headless-components-preview/menu';

import type { MenuGroupProps } from './MenuGroup.types';
import { useMenuGroupStyles } from './useMenuGroupStyles';

/**
 * A MenuGroup clusters related menu items under an optional header. Windmod MenuGroup: the
 * headless group decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const MenuGroup: ForwardRefComponent<MenuGroupProps> = React.forwardRef((props, ref) => {
  const base = useMenuGroup(props, ref);
  const state = useMenuGroupStyles(base);

  const contextValues = useMenuGroupContextValues(state);

  return renderMenuGroup(state, contextValues);
});

MenuGroup.displayName = 'MenuGroup';
