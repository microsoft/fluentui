'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useNavSubItem } from './useNavSubItem';
import { renderNavSubItem } from './renderNavSubItem';
import type { NavSubItemProps } from './NavSubItem.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * NavSubItem component - a sub-item within a navigation structure.
 */
export const NavSubItem: ForwardRefComponent<NavSubItemProps> = /*#__PURE__*/ composeComponent(
  'NavSubItem',
  useNavSubItem,
  renderNavSubItem,
);
