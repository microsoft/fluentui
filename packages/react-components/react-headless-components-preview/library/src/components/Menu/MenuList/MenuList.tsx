'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMenuList } from './useMenuList';
import { useMenuListContextValues } from './useMenuListContextValues';
import { renderMenuList } from './renderMenuList';
import type { MenuListProps } from './MenuList.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * Headless MenuList component.
 */
export const MenuList: ForwardRefComponent<MenuListProps> = /*#__PURE__*/ composeComponent(
  'MenuList',
  useMenuList,
  renderMenuList,
  useMenuListContextValues,
);
