'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { useNavDrawerBody } from './useNavDrawerBody';
import { renderNavDrawerBody } from './renderNavDrawerBody';
import type { NavDrawerBodyProps } from './NavDrawerBody.types';

/**
 * NavDrawerBody component — the main scrollable content area of a NavDrawer.
 */
export const NavDrawerBody: ForwardRefComponent<NavDrawerBodyProps> = React.forwardRef((props, ref) => {
  const state = useNavDrawerBody(props, ref);

  return renderNavDrawerBody(state);
});

NavDrawerBody.displayName = 'NavDrawerBody';
