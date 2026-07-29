'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useNavDivider } from './useNavDivider';
import { renderNavDivider } from './renderNavDivider';
import type { NavDividerProps } from './NavDivider.types';

/**
 * NavDivider component - a separator used within navigation to divide items.
 */
export const NavDivider: ForwardRefComponent<NavDividerProps> = React.forwardRef((props, ref) => {
  const state = useNavDivider(props, ref);
  return renderNavDivider(state);
});

NavDivider.displayName = 'NavDivider';
