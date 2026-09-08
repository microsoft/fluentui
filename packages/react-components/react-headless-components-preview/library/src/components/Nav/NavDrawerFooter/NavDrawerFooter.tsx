'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { useNavDrawerFooter } from './useNavDrawerFooter';
import { renderNavDrawerFooter } from './renderNavDrawerFooter';
import type { NavDrawerFooterProps } from './NavDrawerFooter.types';

/**
 * NavDrawerFooter component — the footer area of a NavDrawer.
 */
export const NavDrawerFooter: ForwardRefComponent<NavDrawerFooterProps> = React.forwardRef((props, ref) => {
  const state = useNavDrawerFooter(props, ref);

  return renderNavDrawerFooter(state);
});

NavDrawerFooter.displayName = 'NavDrawerFooter';
