'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useNavSubItemGroup } from './useNavSubItemGroup';
import { renderNavSubItemGroup } from './renderNavSubItemGroup';
import type { NavSubItemGroupProps } from './NavSubItemGroup.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * NavSubItemGroup component - a group of sub-items within a navigation structure.
 */
export const NavSubItemGroup: ForwardRefComponent<NavSubItemGroupProps> = /*#__PURE__*/ composeComponent(
  'NavSubItemGroup',
  useNavSubItemGroup,
  renderNavSubItemGroup,
);
