'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderMenuDivider, useMenuDivider } from '@fluentui/react-headless-components-preview/menu';

import type { MenuDividerProps } from './MenuDivider.types';
import { useMenuDividerStyles } from './useMenuDividerStyles';

/**
 * A MenuDivider separates groups of menu items. Windmod MenuDivider: the headless divider
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const MenuDivider: ForwardRefComponent<MenuDividerProps> = React.forwardRef((props, ref) => {
  const state = useMenuDivider(props, ref);
  const styled = useMenuDividerStyles(state);

  return renderMenuDivider(styled);
});

MenuDivider.displayName = 'MenuDivider';
