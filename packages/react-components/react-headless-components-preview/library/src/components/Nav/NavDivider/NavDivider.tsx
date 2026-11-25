'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useNavDivider } from './useNavDivider';
import { renderNavDivider } from './renderNavDivider';
import type { NavDividerProps } from './NavDivider.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * NavDivider component - a separator used within navigation to divide items.
 */
export const NavDivider: ForwardRefComponent<NavDividerProps> = /*#__PURE__*/ composeComponent(
  'NavDivider',
  useNavDivider,
  renderNavDivider,
);
