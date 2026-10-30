'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMenuGroupHeader } from './useMenuGroupHeader';
import { renderMenuGroupHeader } from './renderMenuGroupHeader';
import type { MenuGroupHeaderProps } from '@fluentui/react-menu';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * Headless MenuGroupHeader component.
 *
 * Renders the labelled header for a `MenuGroup` and stamps the group's
 * `headerId` on its root.
 */
export const MenuGroupHeader: ForwardRefComponent<MenuGroupHeaderProps> = /*#__PURE__*/ composeComponent(
  'MenuGroupHeader',
  useMenuGroupHeader,
  renderMenuGroupHeader,
);
