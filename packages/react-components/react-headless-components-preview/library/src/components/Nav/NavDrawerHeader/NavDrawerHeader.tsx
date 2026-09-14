'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { useNavDrawerHeader } from './useNavDrawerHeader';
import { renderNavDrawerHeader } from './renderNavDrawerHeader';
import type { NavDrawerHeaderProps } from './NavDrawerHeader.types';

/**
 * NavDrawerHeader component — the header area of a NavDrawer.
 */
export const NavDrawerHeader: ForwardRefComponent<NavDrawerHeaderProps> = React.forwardRef((props, ref) => {
  const state = useNavDrawerHeader(props, ref);

  return renderNavDrawerHeader(state);
});

NavDrawerHeader.displayName = 'NavDrawerHeader';
