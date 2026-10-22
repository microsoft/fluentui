'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { useNavDrawer } from './useNavDrawer';
import { renderNavDrawer } from './renderNavDrawer';
import { useNavContextValues } from '../useNavContextValues';
import type { NavDrawerProps } from './NavDrawer.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * NavDrawer component — a navigation drawer combining Nav behavior with Drawer layout.
 */
export const NavDrawer: ForwardRefComponent<NavDrawerProps> = /*#__PURE__*/ composeComponent(
  'NavDrawer',
  useNavDrawer,
  renderNavDrawer,
  useNavContextValues,
);
