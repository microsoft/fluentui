'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useNavSectionHeader } from './useNavSectionHeader';
import { renderNavSectionHeader } from './renderNavSectionHeader';
import type { NavSectionHeaderProps } from './NavSectionHeader.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * NavSectionHeader component - a heading for a section within navigation.
 */
export const NavSectionHeader: ForwardRefComponent<NavSectionHeaderProps> = /*#__PURE__*/ composeComponent(
  'NavSectionHeader',
  useNavSectionHeader,
  renderNavSectionHeader,
);
