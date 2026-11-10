'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { useNavDrawerBody } from './useNavDrawerBody';
import { renderNavDrawerBody } from './renderNavDrawerBody';
import type { NavDrawerBodyProps } from './NavDrawerBody.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * NavDrawerBody component — the main scrollable content area of a NavDrawer.
 */
export const NavDrawerBody: ForwardRefComponent<NavDrawerBodyProps> = /*#__PURE__*/ composeComponent(
  'NavDrawerBody',
  useNavDrawerBody,
  renderNavDrawerBody,
);
