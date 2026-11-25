'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMenuItem } from './useMenuItem';
import { renderMenuItem } from './renderMenuItem';
import type { MenuItemProps } from './MenuItem.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * Headless MenuItem component.
 *
 * Renders a `role="menuitem"` element with ARIA-button semantics, character
 * search wiring, and click-to-dismiss handling. Submenu indicator is opt-in
 * via the `submenuIndicator` slot — no default icon is injected.
 */
export const MenuItem: ForwardRefComponent<MenuItemProps> = /*#__PURE__*/ composeComponent(
  'MenuItem',
  useMenuItem,
  renderMenuItem,
);
