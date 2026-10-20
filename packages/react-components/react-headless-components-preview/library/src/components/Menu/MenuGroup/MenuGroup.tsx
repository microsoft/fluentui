'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMenuGroup } from './useMenuGroup';
import { useMenuGroupContextValues } from './useMenuGroupContextValues';
import { renderMenuGroup } from './renderMenuGroup';
import type { MenuGroupProps } from '@fluentui/react-menu';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * Headless MenuGroup component.
 *
 * Wraps a logical group of menu items, exposing a `headerId` through context
 * so that an optional `MenuGroupHeader` child can wire `aria-labelledby`.
 */
export const MenuGroup: ForwardRefComponent<MenuGroupProps> = /*#__PURE__*/ composeComponent(
  'MenuGroup',
  useMenuGroup,
  renderMenuGroup,
  useMenuGroupContextValues,
);
