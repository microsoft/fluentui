'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderMenuPopover, useMenuPopover } from '@fluentui/react-headless-components-preview/menu';

import type { MenuPopoverProps } from './MenuPopover.types';
import { useMenuPopoverStyles } from './useMenuPopoverStyles';

/**
 * A MenuPopover is the menu's surface — a div the browser promotes into the top layer.
 * Windmod MenuPopover: the headless surface decorated with the Fluent visual contract
 * (Tailwind v4 + CSS Modules).
 */
export const MenuPopover: ForwardRefComponent<MenuPopoverProps> = React.forwardRef(
  (props: MenuPopoverProps, ref: React.Ref<HTMLElement>) =>
    renderMenuPopover(useMenuPopoverStyles(useMenuPopover(props, ref))),
  // Casting is required due to lack of distributive union to support union on @types/react
) as ForwardRefComponent<MenuPopoverProps>;

MenuPopover.displayName = 'MenuPopover';
