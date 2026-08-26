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
export const MenuDivider: ForwardRefComponent<MenuDividerProps> = React.forwardRef(
  (props: MenuDividerProps, ref: React.Ref<HTMLElement>) =>
    renderMenuDivider(useMenuDividerStyles(useMenuDivider(props, ref))),
  // Casting is required due to lack of distributive union to support union on @types/react
) as ForwardRefComponent<MenuDividerProps>;

MenuDivider.displayName = 'MenuDivider';
