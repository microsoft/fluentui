'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { useNavDrawerHeader } from './useNavDrawerHeader';
import { renderNavDrawerHeader } from './renderNavDrawerHeader';
import type { NavDrawerHeaderProps } from './NavDrawerHeader.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * NavDrawerHeader component — the header area of a NavDrawer.
 */
export const NavDrawerHeader: ForwardRefComponent<NavDrawerHeaderProps> = /*#__PURE__*/ composeComponent(
  'NavDrawerHeader',
  useNavDrawerHeader,
  renderNavDrawerHeader,
);
