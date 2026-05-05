'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ARIAButtonElement } from '@fluentui/react-aria';
import { useMenuItem } from './useMenuItem';
import { renderMenuItem } from './renderMenuItem';
import type { MenuItemProps } from './MenuItem.types';

/**
 * Headless MenuItem component.
 *
 * Renders a `role="menuitem"` element with ARIA-button semantics, character
 * search wiring, and click-to-dismiss handling. Submenu indicator is opt-in
 * via the `submenuIndicator` slot — no default icon is injected.
 */
export const MenuItem: ForwardRefComponent<MenuItemProps> = React.forwardRef<ARIAButtonElement<'div'>, MenuItemProps>(
  (props, ref) => {
    const state = useMenuItem(props, ref);
    return renderMenuItem(state);
  },
) as ForwardRefComponent<MenuItemProps>;

MenuItem.displayName = 'MenuItem';
